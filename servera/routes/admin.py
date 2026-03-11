from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from servera.extensions import db
from servera.models.quiz import Quiz,Question, Option

admin_bp = Blueprint("admin", __name__)

def admin_required():
    identity = get_jwt_identity()
    if identity["role"] != "admin":
        return False
    return True

@admin_bp.route("/quiz", methods=["POST"])
@jwt_required()
def create_quiz():
    if not admin_required():
        return jsonify(message="Admin only"), 403

    data = request.json
    quiz = Quiz(title=data["title"])
    db.session.add(quiz)
    db.session.commit()

    return jsonify(message="Quiz created", quiz_id=quiz.id)

@admin_bp.route("/question", methods=["POST"])
@jwt_required()
def add_question():
    if not admin_required():
        return jsonify(message="Admin only"), 403

    data = request.json

    question = Question(text=data["text"], quiz_id=data["quiz_id"])
    db.session.add(question)
    db.session.commit()

    for opt in data["options"]:
        option = Option(
            text=opt["text"],
            is_correct=opt["is_correct"],
            question_id=question.id
        )
        db.session.add(option)

    db.session.commit()

    return jsonify(message="Question added")