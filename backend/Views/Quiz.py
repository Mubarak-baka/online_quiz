from flask import jsonify, request, Blueprint
from models import db, Quiz, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from .authorization import admin_required

quiz_bp = Blueprint("quiz_bp", __name__)

# Create a new quiz
@quiz_bp.route('/quizzes', methods=['POST'])
@jwt_required()
@admin_required
def create_quiz():
    data = request.get_json()
    
    title = data['title']
    total_time = data['total_time'] 
    total_questions = data['total_questions'] 

    current_user_id = get_jwt_identity()

    if not current_user_id:
        return jsonify({"error": "User  not found"}), 401 

    new_quiz = Quiz(title=title, total_time=total_time, total_questions=total_questions)
    db.session.add(new_quiz)
    db.session.commit()
    
    return jsonify({'message': 'Quiz created successfully!'}), 201

# Read all quizzes
@quiz_bp.route('/quizzes', methods=['GET'])
@jwt_required()
def get_quizzes():
    quizzes = Quiz.query.all()
    results = [{'id': quiz.id, 'title': quiz.title, 'total_time': quiz.total_time, 'total_questions': quiz.total_questions} for quiz in quizzes]
    return jsonify(results), 200

# Read a specific quiz
@quiz_bp.route('/quizzes/<int:quiz_id>', methods=['GET'])
@jwt_required()
def get_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if quiz is None:
        return jsonify({"error": "Quiz not found"}), 404

    result = {
        'id': quiz.id,
        'title': quiz.title,
        'total_time': quiz.total_time,
        'total_questions': quiz.total_questions
    }
    return jsonify(result), 200

# Update a specific quiz
@quiz_bp.route('/quizzes/<int:quiz_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_quiz(quiz_id):
    data = request.get_json()
    quiz = Quiz.query.get(quiz_id)

    if quiz is None:
        return jsonify({"error": "Quiz not found"}), 404

    # Update quiz details
    quiz.title = data.get('title', quiz.title)  # Keep existing title if not provided
    quiz.total_time = data.get('total_time', quiz.total_time)  # Keep existing total_time if not provided
    quiz.total_questions = data.get('total_questions', quiz.total_questions)  # Keep existing total_questions if not provided

    db.session.commit()
    return jsonify({'message': 'Quiz updated successfully!'}), 200

# Delete a specific quiz
@quiz_bp.route('/quizzes/<int:quiz_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)

    if quiz is None:
        return jsonify({"error": "Quiz not found"}), 404

    db.session.delete(quiz)
    db.session.commit()
    return jsonify({'message': 'Quiz deleted successfully!'}), 200