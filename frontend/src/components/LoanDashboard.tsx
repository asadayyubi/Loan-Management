import type { LoanDetailsType, EMIRecord } from "../services/types";
import { Header } from "./Header";
import { LedgerTable } from "./LedgerTable";
import { NextPaymentCard } from "./NextPaymentCard";
import { PaymentSummary } from "./PaymentSummary";
import { UserDetailsCard } from "./UserDetailsCard";

export const LoanDashboard = ({
  loanDetails,
  nextEmi,
  ledger,
  userDetails,
}: {
  loanDetails: LoanDetailsType;
  nextEmi: EMIRecord | null;
  ledger: EMIRecord[];
  userDetails: {
    name: string;
    pan: string;
    aadhar: string;
    gstin?: string;
    udyam?: string;
  };
}) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header loanId={loanDetails.loan_id} userName={userDetails.name} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <NextPaymentCard emi={nextEmi} />
            <PaymentSummary loanDetails={loanDetails} />
          </div>
          <div className="lg:col-span-1">
            <UserDetailsCard userDetails={userDetails} />
          </div>
        </div>
        <LedgerTable ledger={ledger} nextEmiId={nextEmi?.id} />
      </div>
    </div>
  );
};
