from flask import Flask,jsonify

api=Flask(__name__)

@api.route('/')
def home():
    return jsonify('Hello world'),200

api.run(debug=True)
