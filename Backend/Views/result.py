from flask import jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import QuizAttempt, User, Quiz  # Import User and Quiz models

result_bp = Blueprint("result_bp", __name__)

@result_bp.route('/results', methods=['GET'])
@jwt_required()
def view_results():
    current_user_id = get_jwt_identity()  
    user = User.query.get(current_user_id)  

    if user.role == 'admin':
        # Admin: Get all quiz attempts, including usernames and quiz names
        attempts = (
            QuizAttempt.query
            .join(Quiz, QuizAttempt.quiz_id == Quiz.id)
            .join(User, QuizAttempt.user_id == User.id)
            .all()
        )
        results = [{'username': attempt.user.username, 'quiz_name': attempt.quiz.title, 'score': attempt.score} for attempt in attempts]
    
    else:
        # Regular User: Get only their quiz attempts
        attempts = (
            QuizAttempt.query
            .join(Quiz, QuizAttempt.quiz_id == Quiz.id)
            .filter(QuizAttempt.user_id == current_user_id)
            .all()
        )
        results = [{'quiz_name': attempt.quiz.title, 'score': attempt.score} for attempt in attempts]

    return jsonify(results), 200
