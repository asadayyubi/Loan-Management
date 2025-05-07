from datetime import datetime
from dateutil.relativedelta import relativedelta


def calculate_emi_schedule(
    loan_amount, annual_interest_rate, tenure_months, disbursement_date
):
    monthly_rate = annual_interest_rate / (12 * 100)
    emi = (
        loan_amount
        * monthly_rate
        * (1 + monthly_rate) ** tenure_months
        / ((1 + monthly_rate) ** tenure_months - 1)
    )

    schedule = []
    outstanding = loan_amount

    for month in range(1, tenure_months + 1):
        interest = outstanding * monthly_rate
        principal = emi - interest
        outstanding -= principal

        due_date = disbursement_date + relativedelta(months=month)

        schedule.append(
            {
                "due_date": due_date,
                "amount": round(emi, 2),
                "principal": round(principal, 2),
                "interest": round(interest, 2),
                "outstanding": round(outstanding, 2),
            }
        )

    return schedule
