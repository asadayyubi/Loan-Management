from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
from datetime import datetime
import re

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()

    if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", data.get("pan", "")):
        return jsonify({"error": "Invalid PAN format"}), 400

    if not re.match(r"^\d{12}$", data.get("aadhar", "")):
        return jsonify({"error": "Invalid Aadhar number"}), 400

    dob = datetime.strptime(data["dob"], "%Y-%m-%d").date()
    age = (datetime.now().date() - dob).days // 365
    if age < 18:
        return jsonify({"error": "User must be at least 18 years old"}), 400

    new_user = User(
        name=data["name"],
        dob=dob,
        pan=data["pan"],
        aadhar=data["aadhar"],
        gstin=data.get("gstin"),
        udyam=data.get("udyam"),
    )

    db.session.add(new_user)
    db.session.commit()

    return (
        jsonify({"message": "User created successfully", "user_id": new_user.id}),
        201,
    )
