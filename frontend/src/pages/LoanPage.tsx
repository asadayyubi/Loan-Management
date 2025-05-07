import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
// import api from "../services/api";
import { FormInput } from "../components/FormInput";
import { useState } from "react";
import type { LoanData } from "../services/types";
import { createLoan } from "../services/api";

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(10000, "Minimum ₹10,000").required("Required"),
  interest_rate: Yup.number()
    .min(1, "Minimum 1%")
    .max(30, "Maximum 30%")
    .required("Required"),
  tenure_months: Yup.number()
    .min(6, "Minimum 6 months")
    .max(360, "Maximum 30 years")
    .required("Required"),
  disbursement_date: Yup.date()
    .required("Required")
    .min(new Date(), "Cannot be in past"),
});

export const LoanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emi, setEmi] = useState<number | null>(null);

  const calculateEMI = (values: Partial<LoanData>) => {
    if (!values.amount || !values.interest_rate || !values.tenure_months)
      return;

    const monthlyRate = values.interest_rate / (12 * 100);
    const emi =
      (values.amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, values.tenure_months)) /
      (Math.pow(1 + monthlyRate, values.tenure_months) - 1);
    setEmi(Number(emi.toFixed(2)));
  };

  const handleSubmit = async (values: LoanData) => {
    console.log("Form values:", values);
    try {
      const response = await createLoan({
        ...values,
        user_id: location.state?.userId,
      });
      console.log("Loan created:", response);

      navigate(`/ledger/${response.loan_id}`);
    } catch (error) {
      console.error("Loan creation failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Loan Application</h1>
      <Formik
        initialValues={{
          amount: 0,
          interest_rate: 0,
          tenure_months: 0,
          disbursement_date: new Date().toISOString().split("T")[0],
          user_id: location.state?.userId || 0, // Default user_id
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          calculateEMI(values);
          return (
            <Form className="space-y-4">
              <FormInput name="amount" label="Loan Amount (₹)" type="number" />
              <FormInput
                name="interest_rate"
                label="Interest Rate (%)"
                type="number"
                step="0.01"
              />
              <FormInput
                name="tenure_months"
                label="Tenure (months)"
                type="number"
              />
              <FormInput
                name="disbursement_date"
                label="Disbursement Date"
                type="date"
              />

              {emi && (
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="font-semibold">
                    Estimated EMI: ₹{emi.toLocaleString()}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Submit Application
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
