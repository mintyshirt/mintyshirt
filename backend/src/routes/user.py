from flask import Blueprint, jsonify

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def list_users():
    """Placeholder route returning a simple message."""
    return jsonify({'message': 'List of users coming soon'})
