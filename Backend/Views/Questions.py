from flask import jsonify, request, Blueprint
from models import db, Question, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from .authorization import admin_required

Questions_bp = Blueprint("Questions_bp", __name__)

# Create a new question
@Questions_bp.route('/quizzes/<int:quiz_id>/questions', methods=['POST'])
@admin_required
@jwt_required()  
def add_question(quiz_id):
    data = request.get_json()

    question_text = data.get('question_text')
    correct_answer = data.get('correct_answer')

    if not question_text or not correct_answer:
        return jsonify({"error": "Missing question_text or correct_answer"}), 400

    new_question = Question(quiz_id=quiz_id, question_text=question_text, correct_answer=correct_answer)
    db.session.add(new_question)
    db.session.commit()

    return jsonify({'message': 'Question added successfully!'}), 201

# Read all questions for a specific quiz
@Questions_bp.route('/quizzes/<int:quiz_id>/questions', methods=['GET'])
@jwt_required()
def get_questions(quiz_id):
    questions = Question.query.filter_by(quiz_id=quiz_id).all()
    results = [{'question_id': q.question_id, 'question_text': q.question_text, 'correct_answer': q.correct_answer} for q in questions]
    return jsonify(results), 200

# Read a specific question
@Questions_bp.route('/questions/<int:question_id>', methods=['GET'])
@jwt_required()
def get_question(question_id):
    question = Question.query.get(question_id)
    if question is None:
        return jsonify({"error": "Question not found"}), 404

    result = {
        'question_id': question.question_id,
        'quiz_id': question.quiz_id,
        'question_text': question.question_text,
        'correct_answer': question.correct_answer
    }
    return jsonify(result), 200

# Update a specific question
@Questions_bp.route('/questions/<int:question_id>', methods=['PUT'])
@admin_required
@jwt_required()
def update_question(question_id):
    data = request.get_json()
    question = Question.query.get(question_id)

    if question is None:
        return jsonify({"error": "Question not found"}), 404

    question_text = data.get('question_text')
    correct_answer = data.get('correct_answer')

    if question_text:
        question.question_text = question_text
    if correct_answer:
        question.correct_answer = correct_answer

    db.session.commit()
    return jsonify({'message': 'Question updated successfully!'}), 200

# Delete a specific question
@Questions_bp.route('/questions/<int:question_id>', methods=['DELETE'])
@admin_required
@jwt_required()
def delete_question(question_id):
    question = Question.query.get(question_id)

    if question is None:
        return jsonify({"error": "Question not found"}), 404

    db.session.delete(question)
    db.session.commit()
    return jsonify({'message': 'Question deleted successfully!'}), 200


