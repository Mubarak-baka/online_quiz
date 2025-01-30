from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist,QuizAttempt,Question
from werkzeug.security import check_password_hash
from datetime import datetime, timezone
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from functools import wraps
auth_bp = Blueprint("auth_bp", __name__)

# Admin Required Decorator
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user.role != 'admin':
            return jsonify({"msg": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper

# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Either email/password is incorrect"}), 401  # Use 401 for unauthorized access

# Current User
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()  # Get the current user's ID
    user = User.query.get(current_user_id)
    
    
    if user is None:
        return jsonify({"error": "User  not found"}), 404  # Handle case where user is not found

    # Fetch quiz attempts for the current user
    attempts = QuizAttempt.query.filter_by(user_id=current_user_id).all()
    results = []

    for attempt in attempts:
        # Fetch questions associated with the quiz
        questions = Question.query.filter_by(quiz_id=attempt.quiz_id).all()
        question_data = [{'question_id': q.question_id, 'question_text': q.question_text} for q in questions]
        
        # Append the quiz attempt details along with questions
        results.append({
            'quiz_id': attempt.quiz_id,
            'score': attempt.score,
            'questions': question_data,
           
        })

    # Prepare the final response including user details and their quiz results
    response = {
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'username': user.username,
        'quiz_attempts': results  
    }

    return jsonify(response), 200

# Logout
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"success": "Logged out successfully"}), 200