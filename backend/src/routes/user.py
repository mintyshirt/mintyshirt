from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest, Unauthorized
from src.models.user import db, User

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def list_users():
    """Placeholder route returning a simple message."""
    return jsonify({'message': 'List of users coming soon'})


@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        raise BadRequest('Missing required fields')
    if User.query.filter_by(username=username).first() is not None:
        raise BadRequest('Username already exists')
    if User.query.filter_by(email=email).first() is not None:
        raise BadRequest('Email already exists')
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        raise BadRequest('Missing credentials')
    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        raise Unauthorized('Invalid credentials')
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
