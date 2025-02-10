from flask import Flask,jsonify
from utils import video_details

api=Flask(__name__)

@api.route('/')
def home():
    return jsonify('Hello world'),200

@api.route('/vid_info/<id>')
def get_data(id):
    return jsonify(video_details(id)),200

api.run(debug=True)
