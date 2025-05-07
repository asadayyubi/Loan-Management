from app import db
from datetime import datetime


class Loan(db.Model):
    __tablename__ = "loans"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    interest_rate = db.Column(db.Float, nullable=False)
    tenure_months = db.Column(db.Integer, nullable=False)
    disbursement_date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), default="active")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    emi_schedules = db.relationship(
        "EMISchedule", backref="loan", lazy=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Loan {self.id} (Amount: ₹{self.amount:,.2f})>"


class EMISchedule(db.Model):
    __tablename__ = "emi_schedules"

    id = db.Column(db.Integer, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey("loans.id"), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    outstanding_amount = db.Column(db.Float, default=0.0)
    amount = db.Column(db.Float, nullable=False)
    principal = db.Column(db.Float)
    interest = db.Column(db.Float)
    status = db.Column(db.String(20), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self):
        return f"<EMI {self.id} (Due: {self.due_date}, ₹{self.amount:,.2f})>"
