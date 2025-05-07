import axios from "axios";
import { showGlobalSnackbar } from "../context/SnackbarContext";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const API_URL = "http://127.0.0.1:5000/api";
/* ==================== USER APIs ==================== */
export const createUser = async (userData: {
  name: string;
  dob: string;
  pan: string;
  aadhar: string;
  gstin?: string;
  udyam?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    showGlobalSnackbar("User created successfully!");
    return response.data;
  } catch (error) {
    showGlobalSnackbar("Failed to create user. Please try again.");
    throw error;
  }
};

export const getUserLoans = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/loans`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ==================== LOAN APIs ==================== */
export const createLoan = async (loanData: {
  user_id: number;
  amount: number;
  interest_rate: number;
  tenure_months: number;
  disbursement_date: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/loans`, loanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoanDetails = async (loanId: number) => {
  try {
    const response = await axios.get(`${API_URL}/loans/${loanId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ==================== LEDGER APIs ==================== */
export const getLoanLedger = async (loanId: number) => {
  try {
    const response = await axios.get(`${API_URL}/loans/${loanId}/ledger`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadLedgerCSV = async (loanId: number) => {
  try {
    const response = await axios.get(`/loans/${loanId}/csv`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* ==================== AUTH APIs (For Future) ==================== */
export const login = async (credentials: { pan: string; password: string }) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};

// export default api;
