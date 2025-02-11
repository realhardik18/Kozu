from flask import Flask,jsonify
from utils import video_details
from flask_cors import CORS
api=Flask(__name__)
CORS(api)

@api.route('/')
def home():
    return jsonify('Hello world'),200

@api.route('/vid_info/<id>')
def get_data(id):
    return jsonify(video_details(id)),200

@api.route('/get_kosu')
def get_json():
    with open('db.json','r') as file:
        data=file.read()
    return jsonify(eval(data)),200

api.run(debug=True)
