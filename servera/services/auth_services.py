from flask_jwt_extended import get_jwt_identity
from flask import jsonify

def admin_required():
    identity = get_jwt_identity()

    if identity["role"] != "admin":
        return False

    return True