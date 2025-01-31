from flask import jsonify, request, Blueprint
from models import db, QuizAttempt, User, Question
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

Attempt_bp = Blueprint("Attempt_bp", __name__)

# Create a new quiz attempt
@Attempt_bp.route('/quizzes/<int:quiz_id>/attempt', methods=['POST'])
@jwt_required()
def attempt_quiz(quiz_id):
    current_user_id = get_jwt_identity()  # Get the current user's ID
    data = request.get_json()

    # Fetch questions for the specified quiz
    questions = Question.query.filter_by(quiz_id=quiz_id).all()
    score = 0

    # Calculate the score based on the user's answers
    for question in questions:
        if data.get(str(question.question_id)) == question.correct_answer:
            score += 1

    # Create a new quiz attempt record
    new_attempt = QuizAttempt(
        quiz_id=quiz_id,
        user_id=current_user_id,  # Use the current user's ID
        start_time=datetime.now(),
        end_time=datetime.now(),  # You might want to adjust this later
        score=score
    )
    db.session.add(new_attempt)
    db.session.commit()

    return jsonify({'score': score}), 200

# Read all attempts for the current user
@Attempt_bp.route('/attempts', methods=['GET'])
@jwt_required()
def get_user_attempts():
    current_user_id = get_jwt_identity()  # Get the current user's ID
    attempts = QuizAttempt.query.filter_by(user_id=current_user_id).all()
    
    results = [{
        'attempt_id': attempt.attempt_id,
        'quiz_id': attempt.quiz_id,
        'score': attempt.score,
        'start_time': attempt.start_time,
        'end_time': attempt.end_time
    } for attempt in attempts]

    return jsonify(results), 200

# Read all attempts for all users (admin only)
@Attempt_bp.route('/admin/attempts', methods=['GET'])

@jwt_required()
def get_all_attempts():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user.role != 'admin':
        return jsonify({"msg": "Admin access required"}), 403

    attempts = QuizAttempt.query.all()
    results = [{
        'attempt_id': attempt.attempt_id,
        'user_id': attempt.user_id,
        'quiz_id': attempt.quiz_id,
        'score': attempt.score,
        'start_time': attempt.start_time,
        'end_time': attempt.end_time
    } for attempt in attempts]

    return jsonify(results), 200

# Delete a specific attempt
@Attempt_bp.route('/attempts/<int:attempt_id>', methods=['DELETE'])
@jwt_required()
def delete_attempt(attempt_id):
    current_user_id = get_jwt_identity()
    attempt = QuizAttempt.query.get(attempt_id)

    if attempt is None:
        return jsonify({"error": "Attempt not found"}), 404

    # Check if the user is the owner of the attempt or an admin
    if attempt.user_id != current_user_id:
        user = User.query.get(current_user_id)
        if user.role != 'admin':
            return jsonify({"msg": "You do not have permission to delete this attempt"}), 403

    db.session.delete(attempt)
    db.session.commit()
    return jsonify({'message': 'Attempt deleted successfully!'}), 200
#testing purposes