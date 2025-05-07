from app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    pan = db.Column(db.String(10), unique=True, nullable=False)  # AAAAP1234A format
    aadhar = db.Column(db.String(12), unique=True, nullable=False)  # 12 digits
    gstin = db.Column(db.String(15), unique=True)  # Optional
    udyam = db.Column(db.String(19), unique=True)  # Optional
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    loans = db.relationship(
        "Loan", backref="user", lazy=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.name} (PAN: {self.pan})>"
