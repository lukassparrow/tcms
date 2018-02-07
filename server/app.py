#!/usr/bin/env python

from functools import wraps
from flask import Flask, current_app, request, jsonify
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


app = Flask(__name__)


def jsonp(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = str(func(*args, **kwargs).data)
            content = str(callback)+'(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function


@app.route('/results/<string:tcid>', methods=['GET'])
@jsonp
def get_results(tcid):
    result = results.get(tcid, {});
    return jsonify(result)

@app.route('/results/<tcid>/delete/<user>/', methods=['GET'])
@jsonp
def del_results(tcid, user):
    try:
        results[tcid].pop(user)
    except KeyError:
        pass
    return jsonify(results)

@app.route('/results/<tcid>/<user>/<outcome>', methods=['GET'])
@jsonp
def set_results(tcid, user, outcome):
    if not tcid in results:
        results[tcid] = {}
    results[tcid][user] = outcome
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
