import type { RouteObject } from "react-router-dom";
import { OnboardingPage } from "./pages/OnboardingPage";
import { LoanPage } from "./pages/LoanPage";
import { LedgerPage } from "./pages/LedgerPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <OnboardingPage />,
  },
  {
    path: "/loan",
    element: <LoanPage />,
  },
  {
    path: "/ledger/:loanId",
    element: <LedgerPage />,
  },
];
