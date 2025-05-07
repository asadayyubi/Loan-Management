import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import api from "../services/api";
import { FormInput } from "../components/FormInput";
import type { UserData } from "../services/types";
import { createUser } from "../services/api";
import { useSnackbar } from "../context/SnackbarContext";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  dob: Yup.date()
    .required("Required")
    .test("age", "Must be at least 18 years", (dob) => {
      if (!dob) return false;
      const today = new Date();
      return today.getFullYear() - dob.getFullYear() >= 18;
    }),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
    .required("Required"),
  aadhar: Yup.string()
    .matches(/^\d{12}$/, "Must be 12 digits")
    .required("Required"),
  gstin: Yup.string().matches(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    "Invalid GSTIN"
  ),
  udyam: Yup.string().matches(/^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/, "Invalid UDYAM"),
});

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values: UserData) => {
    console.log("Form values:", values);

    try {
      const response = await createUser(values);
      showSnackbar("User created successfully!");
      console.log("User created:", response);

      navigate("/loan", { state: { userId: response.user_id } });
    } catch (error) {
      showSnackbar("Failed to create user. Please try again.");
      console.error("Submission failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Onboarding</h1>
      <Formik
        initialValues={{
          name: "",
          dob: "",
          pan: "",
          aadhar: "",
          gstin: "",
          udyam: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormInput name="name" label="Full Name" />
            <FormInput name="dob" label="Date of Birth" type="date" />
            <FormInput name="pan" label="PAN Number" placeholder="AAAAA1234A" />
            <FormInput
              name="aadhar"
              label="Aadhar Number"
              placeholder="123456789012"
            />
            <FormInput
              name="gstin"
              label="GSTIN"
              placeholder="22AAAAA0000A1Z5"
            />
            <FormInput
              name="udyam"
              label="UDYAM"
              placeholder="UDYAM-XX-00-0000000"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              Continue to Loan Application
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
