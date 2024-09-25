import { useState } from "react";
import { Field, ErrorMessage } from "formik";

const JobPlaceInputNID = ({
    name,
    label,
    value,
    errors,
    touched,
    country,
    handleChange,
    placeholder,
    type="text",
    required=true,
}) => {
    const [inputError, setInputError] = useState("");

    const handleInput = (event) => {
        const value = event.target.value;


        if (country === "Pakistan") {
            const validValue = value.replace(/[^0-9-]/g, "");

            if (validValue !== value) {
                event.target.value = validValue;
                setInputError("Only input number");
            } else {
                setInputError("");
            }

            if(value?.length > 15) {
                setInputError("NID or CNIC number max 15")
            }
        } else {
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

            <input 
                id={name} 
                type={type} 
                name={name}
                value={value}
                onInput={handleInput}
                onChange={handleChange}
                placeholder={placeholder} 
                className={
                    `border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                    ${touched[name] && errors[name] ? "border-red-500" : ""}`
                } 
            />

            {inputError && <div className="text-red-500 text-xs mt-1">{inputError}</div>}

            {!inputError && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
        </div>
    );
}
 
export default JobPlaceInputNID;