import { downloadLedgerCSV } from "../services/api";

interface HeaderProps {
  loanId: number;
  userName: string;
}

export const Header = ({ loanId, userName }: HeaderProps) => {
  const handleDownload = async () => {
    try {
      const response = await downloadLedgerCSV(loanId);
      if (!response) {
        console.log("No response from the backend");
        return;
      }

      console.log("CSV response data: ", response);

      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `loan_${loanId}_ledger_${userName}.csv`;

      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Loan #{loanId} Dashboard
      </h1>
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download Statement
      </button>
    </div>
  );
};
