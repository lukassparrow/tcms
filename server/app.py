#!/usr/bin/env python3

from flask.ext.oidc import OpenIDConnect

from functools import wraps
from flask import Flask, current_app, request, jsonify, redirect
import json

results = {
    'kittenkilld': {
        'kparal': 'FAILED',
        'pschindl': 'PASSED',
        'fzatlouk': 'FAILED'
    },
    'troll-kamil': {
        'kparal': 'FAILED',
        'pschindl': 'FAILED'
    }
}

metadata = {
    'kittenkilld': {
        'name': 'Install kittenkilld',
        'description': 'Ugly kitten killing testcase. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam rhoncus aliquam metus.',
        'steps': ['obtain a kitten', 'kill the kitten', '?', 'profit'],
        'expected': ['you have a kitten', 'the kitten is no more', '?', 'dem shekels'],
    },
    'troll-kamil': {
        'name': 'Skladanka-level Trolling',
        'description': 'Just everyday joy. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nulla quis diam. Integer tempor. Curabitur sagittis hendrerit ante. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Integer lacinia. In dapibus augue non sapien.',
        'steps': ['troll kamil', '?', 'lol'],
        'expected': ['kamil is angry', '?', 'rofl'],
    },
    'lipsum': {
        'name': 'Lorem Ipsum Testcase',
        'description': 'Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nulla quis diam. Integer tempor. Curabitur sagittis hendrerit ante. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Integer lacinia. In dapibus augue non sapien.',
        'steps': ['step one', 'step two'],
        'expected': ['yeah', 'blah blah'],
    }
}

testcases = {
    'testcases' : list(metadata.keys())
}

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

@app.route('/oidc_login')
@oidc.require_login
def oidc_login():
    #info = oidc.user_getinfo(['email'])
    return redirect('http://localhost:3000')

@app.route('/oidc_logout')
@oidc.require_login
def oidc_logout():
    oidc.logout()
    return 'logged out'

@app.route('/user')
@oidc.require_login
def get_user():
    info = oidc.user_getinfo(['email'])
    return jsonify(info)

@app.route('/results/<string:tcid>', methods=['GET'])
@jsonp
def get_results(tcid):
    result = results.get(tcid, {})
    return jsonify(result)


@app.route('/results/<tcid>/delete', methods=['GET'])
@oidc.require_login
@jsonp
def del_results(tcid):
    try:
        user = oidc.user_getinfo(['email']).get('email')
        results[tcid].pop(user)
    except KeyError:
        pass
    return jsonify(results)


@app.route('/results/<tcid>/add/<outcome>', methods=['GET'])
@oidc.require_login
@jsonp
def set_results(tcid, outcome):
    user = oidc.user_getinfo(['email']).get('email')

    if not tcid in results:
        results[tcid] = {}
    results[tcid][user] = outcome
    return jsonify(results)


@app.route('/testcases')
@jsonp
def get_testcases():
    return jsonify(testcases)

@app.route('/metadata/<tcid>')
@jsonp
def get_metadata(tcid):
    result = metadata.get(tcid, {})
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
