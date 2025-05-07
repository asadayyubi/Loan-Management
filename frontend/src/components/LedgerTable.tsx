import type { EMIRecord } from "../services/types";

export const LedgerTable = ({
  ledger,
  nextEmiId,
}: {
  ledger: EMIRecord[];
  nextEmiId?: number;
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Payment Schedule
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount (₹)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Principal (₹)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest (₹)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ledger.map((emi) => {
              const isNext = emi.id === nextEmiId;
              const isOverdue =
                emi.status === "pending" && new Date(emi.due_date) < new Date();

              return (
                <tr key={emi.id} className={isNext ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {new Date(emi.due_date).toLocaleDateString()}
                      {isNext && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Next
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emi.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : isOverdue
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {emi.status === "paid"
                        ? "Paid"
                        : isOverdue
                        ? "Overdue"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{emi.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{emi.principal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{emi.interest.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
