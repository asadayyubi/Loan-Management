import type { LoanDetailsType } from "../services/types";

export const PaymentSummary = ({
  loanDetails,
}: {
  loanDetails: LoanDetailsType;
}) => {
  const progress = (
    (loanDetails.total_paid_amount / loanDetails.amount) *
    100
  ).toFixed(1);
  console.log("Payment Summary:", loanDetails);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Payment Summary
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              Repayment Progress
            </span>
            <span className="text-sm font-medium text-blue-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="text-xl font-semibold">
              ₹{loanDetails.total_paid_amount.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-xl font-semibold">
              ₹{loanDetails.total_remaining_amount.toFixed(2)}
            </p>
          </div>
          {/* <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Payments Made</p>
            <p className="text-xl font-semibold">
              {loanDetails.payment_summary.total_payments}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Payments Left</p>
            <p className="text-xl font-semibold">
              {loanDetails.payment_summary.payments_remaining}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
