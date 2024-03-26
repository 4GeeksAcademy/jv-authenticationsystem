"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

#jwt=JWTManager(api)
# Allow CORS requests to this API
CORS(api)

@api.route('/register' , methods=['POST'])
def create_user(): 
    body = request.json 
    email = body.get("email", None)
    password = body.get("password", None)
    userName = body.get("userName" , None)
    
    
    if email is None or password is None or userName is None:
     return jsonify({'error': 'email and password are required'}), 400
    hashed_password = generate_password_hash(password)
    new_user= User(email= email , password= hashed_password , is_active=True, userName=userName)

    

    # try:
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'User created'}), 200
    # except Exception as error:
    #     db.session.rollback()
    #     return jsonify({'error': 'Failed to create user'}), 500

    

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def user_login():
   body=request.json
   email= body.get ("email", None),
   password = body.get("password", None)

   if email is None or password is None: 
      return jsonify ({"error": "email and password are required"}), 400
   
   user= User.query.filter_by(email=email).first()
   if user is None: 
      return jsonify({"msg": "user not found"}), 404
   
   password_match = check_password_hash(user.password, password)
   if not password_match:
      return jsonify({"error": "user or password incorrect"}), 401
   
   token=create_access_token({"id": user.id , "email":user.email})
   return jsonify({"token":token})


@api.route("/private", methods=["GET"])
@jwt_required()
def get_user_data():
    email = get_jwt_identity()
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"msg":"user not found"}), 404
    return jsonify({"user": user.serialize()}), 200