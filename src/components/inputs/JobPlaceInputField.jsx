import { useState } from "react";
import { Field, ErrorMessage } from "formik";

const JobPlaceInputField = ({
  name,
  label,
  errors,
  touched,
  placeholder,
  type = "text",
  required = true,
  onlyLetter = false,
}) => {
  const [inputError, setInputError] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;

    if (onlyLetter) {
      const validValue = value.replace(/[^a-zA-Z\s]/g, "");

      if (validValue !== value) {
        event.target.value = validValue;
        setInputError("Only input letters and space");
      } else {
        setInputError("");
      }
    } else if (type == "number") {
      const validValue = value.replace(/[^0-9]/g, "");

      if (validValue !== value) {
        event.target.value = validValue;
        setInputError("Only input number");
      } else {
        setInputError("");
      }
    }
  };

  return (
    <div>
      <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
        {label} {required && <span className="text-[#F04438]">*</span>}
      </label>

      <Field
        id={name}
        type={type === "number" ? "text" : type}
        name={name}
        onInput={handleInput}
        placeholder={placeholder}
        error={touched[name] && errors[name]}
        className={`border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                ${touched[name] && errors[name] ? "border-red-500" : ""}`}
      />

      {inputError && (
        <div className="text-red-500 text-xs mt-1">{inputError}</div>
      )}

      {!inputError && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      )}
    </div>
  );
};

export default JobPlaceInputField;
