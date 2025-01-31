from flask import jsonify, request, Blueprint
from models import db, User, QuizAttempt, Question
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from .authorization  import admin_required

user_bp = Blueprint("user_bp", __name__)

# Create a new user
@user_bp.route("/users", methods=["POST"])
def add_users():
    from app import mail
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    role = data.get("role")
    password = data.get("password")

    # Check for existing username or email
    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()
    if check_username or check_email:
        return jsonify({"error": "Username or Email already exists"}), 400

    # Add new user to the database
    new_user = User(
        username=username,
        email=email,
        role=role,
        password=generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()

    # Send Welcome Email
    try:
        msg = Message(
            subject="Welcome to Muthokinju",
            recipients=[email],
            body="Confirm if you got the email by sending the word penzi to 224055",
        )
        mail.send(msg)
        return jsonify({"success": "User  created and email sent successfully"}), 201
    except Exception as e:
        return jsonify({"error": f"Failed to send email: {str(e)}"}), 500

# Read all users
@user_bp.route("/users", methods=["GET"])
@jwt_required()
@admin_required
def get_users():
    users = User.query.all()
    results = [{'id': user.id, 'username': user.username, 'email': user.email, 'role': user.role} for user in users]
    return jsonify(results), 200



# Update a specific user
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()

def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "User  not found"}), 404

    # Update user details
    user.username = data.get('username', user.username)  # Keep existing username if not provided
    user.email = data.get('email', user.email)  # Keep existing email if not provided
    user.role = data.get('role', user.role)  # Keep existing role if not provided

    # Update password if provided
    if 'password' in data:
        user.password = generate_password_hash(data['password'])

    db.session.commit()
    return jsonify({'message': 'User  updated successfully!'}), 200

# Delete a specific user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
@admin_required
def delete_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "User  not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User  deleted successfully!'}), 200


