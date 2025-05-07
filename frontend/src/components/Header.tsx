export const Header = ({ loanId }: { loanId: number }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Loan #{loanId} Dashboard
      </h1>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Download Statement
      </button>
    </div>
  );
};
