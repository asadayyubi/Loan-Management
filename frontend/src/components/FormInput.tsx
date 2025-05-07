import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  step?: string;
}

export const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
}: FormInputProps) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);
