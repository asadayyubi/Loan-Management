export interface UserData {
  name: string;
  dob: string;
  pan: string;
  aadhar: string;
  gstin?: string;
  udyam?: string;
}

export interface LoanData {
  amount: number;
  interest_rate: number;
  tenure_months: number;
  disbursement_date: string;
  user_id: number;
}

// export interface EMIRecord {
//   due_date: string;
//   amount: number;
//   principal: number;
//   interest: number;
//   status: string;
// }
export interface UserDetailsType {
  name: string;
  pan: string;
  aadhar: string;
  gstin?: string;
  udyam?: string;
}

export interface LoanDetailsType {
  loan_id: number;
  amount: number;
  interest_rate: number;
  tenure_months: number;
  disbursement_date: string;
  status: string;
  total_remaining_amount: number;
  total_paid_amount: number;
  principal_paid: number;
  interest_paid: number;
  payment_summary: {
    total_payments: number;
    payments_remaining: number;
    last_payment_date?: string;
    next_payment_date?: string;
  };
  user_details: UserDetailsType;
}

export interface EMIRecord {
  id: number;
  due_date: string;
  outstanding: number;
  amount: number;
  principal: number;
  interest: number;
  status: "paid" | "pending" | "overdue";
}
