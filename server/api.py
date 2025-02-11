from flask import Flask,jsonify,request
from flask_cors import CORS
from utils import *
api=Flask(__name__)
CORS(api)

@api.route('/')
def home():
    return jsonify('Hello world'),200

@api.route('/vid_info/<id>')
def get_data(id):
    #return id
    return jsonify(get_with_id(id)),200

@api.route('/get_kosu')
def get_json():
    with open('db.json','r') as file:
        data=file.read()
    return jsonify(eval(data)),200

@api.route('/create_kosu')
def create_kosu_endpoint():
    #id,start,daily_commitments,day_preferences
    id = request.args.get('id')    
    daily_commitments= request.args.get('dc')
    day_preference = request.args.get('df')
    create_kosu(id=id,daily_commitments=daily_commitments,day_preferences=day_preference)
    return jsonify('ok'),200
api.run(debug=True)
