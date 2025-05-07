from flask import Blueprint, request, jsonify
from app.models import Loan, EMISchedule
from app.services.emi_calculator import calculate_emi_schedule
from app import db
from datetime import datetime
from datetime import date
from sqlalchemy.orm import joinedload

loan_bp = Blueprint("loan", __name__)


@loan_bp.route("/api/loans", methods=["POST"])
def create_loan():
    data = request.get_json()

    new_loan = Loan(
        user_id=data["user_id"],
        amount=data["amount"],
        interest_rate=data["interest_rate"],
        tenure_months=data["tenure_months"],
        disbursement_date=datetime.strptime(
            data["disbursement_date"], "%Y-%m-%d"
        ).date(),
    )

    db.session.add(new_loan)
    db.session.commit()

    # Generate EMI schedule
    emi_schedule = calculate_emi_schedule(
        loan_amount=new_loan.amount,
        annual_interest_rate=new_loan.interest_rate,
        tenure_months=new_loan.tenure_months,
        disbursement_date=new_loan.disbursement_date,
    )

    for emi in emi_schedule:
        db.session.add(
            EMISchedule(
                loan_id=new_loan.id,
                due_date=emi["due_date"],
                amount=emi["amount"],
                principal=emi["principal"],
                interest=emi["interest"],
                status="pending",
            )
        )

    db.session.commit()

    return (
        jsonify(
            {
                "message": "Loan created successfully",
                "loan_id": new_loan.id,
                "emi_amount": emi_schedule[0]["amount"] if emi_schedule else 0,
            }
        ),
        201,
    )


@loan_bp.route("/api/loans/<int:loan_id>/ledger", methods=["GET"])
def get_loan_ledger(loan_id):
    # Fetch loan with user details in a single query using joinedload
    loan = (
        Loan.query.options(joinedload(Loan.user)).filter_by(id=loan_id).first_or_404()
    )

    # Get all EMIs ordered by due date
    emis = (
        EMISchedule.query.filter_by(loan_id=loan_id)
        .order_by(EMISchedule.due_date)
        .all()
    )

    # Calculate amounts
    today = date.today()
    paid_emis = [emi for emi in emis if emi.status == "paid"]
    pending_emis = [emi for emi in emis if emi.status == "pending"]

    total_remaining = sum(emi.amount for emi in pending_emis)
    total_paid = sum(emi.amount for emi in paid_emis)

    # Find next EMI (first pending EMI after today)
    next_emi = next((emi for emi in pending_emis if emi.due_date >= today), None)

    # Build response
    response_data = {
        "user_details": {
            "name": loan.user.name,
            "pan": loan.user.pan,
            "aadhar": loan.user.aadhar,
            "gstin": loan.user.gstin,
            "udyam": loan.user.udyam,
        },
        "loan_details": {
            "loan_id": loan.id,
            "amount": loan.amount,
            "interest_rate": loan.interest_rate,
            "tenure_months": loan.tenure_months,
            "disbursement_date": loan.disbursement_date.isoformat(),
            "status": loan.status,
            "total_remaining_amount": total_remaining,
            "total_paid_amount": total_paid,
            "principal_paid": sum(emi.principal for emi in paid_emis),
            "interest_paid": sum(emi.interest for emi in paid_emis),
        },
        "next_emi": (
            {
                "due_date": next_emi.due_date.isoformat() if next_emi else None,
                "amount": next_emi.amount if next_emi else None,
                "principal": next_emi.principal if next_emi else None,
                "interest": next_emi.interest if next_emi else None,
                "is_overdue": next_emi.due_date < today if next_emi else False,
            }
            if next_emi
            else None
        ),
        "payment_summary": {
            "total_payments": len(paid_emis),
            "last_payment_date": (
                max(emi.due_date for emi in paid_emis).isoformat()
                if paid_emis
                else None
            ),
            "next_payment_date": next_emi.due_date.isoformat() if next_emi else None,
            "payments_remaining": len(pending_emis),
        },
        "ledger": [
            {
                "emi_id": emi.id,
                "due_date": emi.due_date.isoformat(),
                "amount": emi.amount,
                "principal": emi.principal,
                "interest": emi.interest,
                "status": emi.status,
                "is_next": emi == next_emi,
                "is_overdue": emi.status == "pending" and emi.due_date < today,
            }
            for emi in emis
        ],
    }

    return jsonify(response_data)


@loan_bp.route("/api/loans/<int:loan_id>/csv", methods=["GET"])
def download_ledger_csv(loan_id):
    import csv
    from io import StringIO
    from flask import Response

    emis = (
        EMISchedule.query.filter_by(loan_id=loan_id)
        .order_by(EMISchedule.due_date)
        .all()
    )

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Due Date", "Amount", "Principal", "Interest", "Status"])

    for emi in emis:
        writer.writerow(
            [
                emi.due_date.strftime("%Y-%m-%d"),
                f"{emi.amount:.2f}",
                f"{emi.principal:.2f}",
                f"{emi.interest:.2f}",
                emi.status,
            ]
        )

    output.seek(0)

    return Response(
        output,
        mimetype="text/csv",
        headers={
            "Content-disposition": f"attachment; filename=loan_{loan_id}_ledger.csv"
        },
    )
