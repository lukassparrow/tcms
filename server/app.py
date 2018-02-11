#!/usr/bin/env python3

from flask.ext.login import LoginManager, UserMixin, login_required, \
    login_user, logout_user, current_user
from flask.ext.oidc import OpenIDConnect

from functools import wraps
from flask import Flask, current_app, request, jsonify, redirect
import json

from pathlib import Path
import sys

results_file = 'data/results.json'
metadata_file = 'data/metadata.json'

app = Flask(__name__)

app.config.update({
    'SECRET_KEY': 'thisissecretkey',
    'TESTING': True,
    'DEBUG': True,
    'OIDC_CLIENT_SECRETS': './client_secrets.json.dev',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_OPENID_REALM': 'http://localhost:5000/oidc_callback',
    'OIDC_SCOPES': ['openid', 'email'],
})

oidc = OpenIDConnect(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, email):
        self.id = email
        self.email = email

@login_manager.user_loader
def load_user(userid):
    return User(userid)


def jsonp(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = func(*args, **kwargs).data
            data = data.decode()
            content = str(callback)+'(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function

def load_testcases_from_metadata():
    return {'testcases' : list(metadata.keys())}

def dump_to_file(file, data):
    with open(file, 'w') as f:
        json.dump(data, f, ensure_ascii=False)

def load_from_file(file):
    with open(file) as json_data:
        return json.load(json_data)

FRONTEND_URL = 'http://localhost:3000'


@app.route('/oidc_login')
@oidc.require_login
def oidc_login():
    email = oidc.user_getfield('email')
    login_user(User(email))
    return redirect(FRONTEND_URL)


@app.route('/oidc_logout')
@oidc.require_login
def oidc_logout():
    oidc.logout()
    logout_user()
    return redirect(FRONTEND_URL)


@app.route('/user')
@jsonp
def get_user():
    if current_user.is_authenticated:
        return jsonify({'email': current_user.email})
    else:
        return jsonify({'email': ''})


@app.route('/results/<string:tcid>', methods=['GET'])
@jsonp
def get_results(tcid):
    result = results.get(tcid, {})
    return jsonify(result)


@app.route('/results/<tcid>/delete', methods=['GET'])
@login_required
@jsonp
def del_results(tcid):
    try:
        user = current_user.email
        results[tcid].pop(user)
    except KeyError:
        pass
    dump_to_file(results_file, results)
    return jsonify(results)


@app.route('/results/<tcid>/add/<outcome>', methods=['GET'])
@login_required
@jsonp
def set_results(tcid, outcome):
    user = current_user.email

    if not tcid in results:
        results[tcid] = {}
    results[tcid][user] = outcome
    dump_to_file(results_file, results)
    return jsonify(results)


@app.route('/testcases')
@jsonp
def get_testcases():
    return jsonify(testcases)

@app.route('/metadata')
@jsonp
def get_all_metadata():
    return jsonify(metadata)

@app.route('/metadata/<tcid>')
@jsonp
def get_metadata(tcid):
    result = metadata.get(tcid, {})
    return jsonify(result)


if __name__ == '__main__':
    try:
        results = load_from_file(results_file)
    except (json.decoder.JSONDecodeError, FileNotFoundError):
        results = {}
        open(results_file, 'a').close()
        dump_to_file(results_file, results)
    if Path(metadata_file).is_file():
        metadata = load_from_file(metadata_file)
        testcases = load_testcases_from_metadata()
    else:
        print('Requested data files are missing!')
        sys.exit(-1)
    for key in metadata:
        if key not in results:
            results[key] = {}
    app.run(debug=True)
