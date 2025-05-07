import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLoanLedger } from "../services/api";
import { Loader } from "../components/Loader";
import { LoanDashboard } from "../components/LoanDashboard";

export const LedgerPage = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLoanLedger(Number(loanId));
        console.log("Ledger data:", response);

        setData(response);
      } catch (error) {
        console.error("Failed to fetch ledger", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loanId]);

  if (loading) return <Loader />;
  if (!data) return <div>Error loading data</div>;

  return (
    <LoanDashboard
      loanDetails={data.loan_details}
      nextEmi={data.next_emi}
      ledger={data.ledger}
      userDetails={data.user_details}
    />
  );
};
