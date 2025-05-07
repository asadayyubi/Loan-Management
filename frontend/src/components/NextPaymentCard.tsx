import type { EMIRecord } from "../services/types";

export const NextPaymentCard = ({ emi }: { emi: EMIRecord | null }) => {
  if (!emi)
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
        <h3 className="text-lg font-semibold text-gray-700">
          No Upcoming Payments
        </h3>
        <p className="text-gray-500">All payments are completed</p>
      </div>
    );

  const isOverdue = new Date(emi.due_date) < new Date();

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border-l-8 ${
        isOverdue ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            {isOverdue ? "Overdue Payment" : "Next Payment"}
          </h3>
          <p className="text-gray-500">
            Due {new Date(emi.due_date).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOverdue
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {isOverdue ? "Overdue" : "Upcoming"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-xl font-semibold">₹{emi.amount.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Principal</p>
          <p className="text-xl font-semibold">₹{emi.principal.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Interest</p>
          <p className="text-xl font-semibold">₹{emi.interest.toFixed(2)}</p>
        </div>
      </div>

      {/* <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        {"Pay Now"}
      </button> */}
    </div>
  );
};
