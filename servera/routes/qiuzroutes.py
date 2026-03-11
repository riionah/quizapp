from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from servera.extensions import db
from servera.models.quiz import Quiz, Question, Option, Result, Leaderboard
import random

quiz_bp = Blueprint("quiz", __name__)

# ------------------------------
# Quiz List Pagination
# ------------------------------
@quiz_bp.route("/", methods=["GET"])
def get_quizzes():

    page = request.args.get("page", 1, type=int)
    per_page = 10

    quizzes = Quiz.query.paginate(page=page, per_page=per_page)

    return jsonify({
        "quizzes": [{"id": q.id, "title": q.title} for q in quizzes.items],
        "total": quizzes.total
    })


# ------------------------------
# Get Quiz Details
# ------------------------------
@quiz_bp.route("/<int:quiz_id>", methods=["GET"])
def get_quiz(quiz_id):

    quiz = Quiz.query.get_or_404(quiz_id)

    return jsonify({
        "id": quiz.id,
        "title": quiz.title,
        "questions": [
            {
                "id": q.id,
                "text": q.text,
                "options": [
                    {"id": o.id, "text": o.text}
                    for o in q.options
                ]
            }
            for q in quiz.questions
        ]
    })


# ------------------------------
# Random Quiz Generator
# ------------------------------
@quiz_bp.route("/random/<int:quiz_id>", methods=["GET"])
def random_quiz(quiz_id):

    quiz = Quiz.query.get_or_404(quiz_id)

    questions = list(quiz.questions)
    random.shuffle(questions)

    return jsonify([
        {
            "id": q.id,
            "text": q.text,
            "options": [
                {"id": o.id, "text": o.text}
                for o in q.options
            ]
        }
        for q in questions
    ])


# ------------------------------
# Submit Quiz Answer
# ------------------------------
@quiz_bp.route("/submit/<int:quiz_id>", methods=["POST"])
@jwt_required()
def submit_quiz(quiz_id):

    identity = get_jwt_identity()
    data = request.json

    score = 0

    for ans in data.get("answers", []):
        option = Option.query.get(ans["option_id"])

        if option and option.is_correct:
            score += 1

    result = Result(
        score=score,
        user_id=identity["id"],
        quiz_id=quiz_id
    )

    db.session.add(result)
    db.session.commit()

    return jsonify({"score": score})


# ------------------------------
# Leaderboard System
# ------------------------------
@quiz_bp.route("/leaderboard", methods=["GET"])
def leaderboard():

    data = Leaderboard.query.order_by(
        Leaderboard.score.desc()
    ).limit(10).all()

    return jsonify([
        {
            "user_id": d.user_id,
            "score": d.score
        }
        for d in data
    ])