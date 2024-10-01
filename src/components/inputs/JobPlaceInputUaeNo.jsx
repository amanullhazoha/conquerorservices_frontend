import { useState } from "react";
import { ErrorMessage } from "formik";

const JobPlaceInputUaeNo = ({
    name,
    label,
    value,
    errors,
    touched,
    handleChange,
    placeholder,
    required=true,
}) => {
    const [inputError, setInputError] = useState("");

    const handleInput = (event) => {
        let inputValue = event.target.value;

        const cleanedValue = inputValue.replace(/[^0-9-]/g, "");

        if (cleanedValue !== inputValue) {
            event.target.value = cleanedValue;
            setInputError("Only input number");
        } else {
            setInputError("");
        }

        if (!cleanedValue.startsWith("794-")) {
            inputValue = "794-";

        } else {
            let remainingValue = cleanedValue.slice(4);
            
            if (remainingValue.length > 11) {
                remainingValue = remainingValue.slice(0, 11) + "-" + remainingValue.slice(12, 13);
            }

            inputValue = "794-" + remainingValue;
        }

        if (inputValue.length > 17) {
            setInputError("UAE residency no max 17");
        } else {
            event.target.value = inputValue;
        }
    };

    return (
        <div>
            <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
                {label} {required && <span className="text-[#F04438]">*</span>}
            </label>

            <input 
                id={name} 
                type="text" 
                name={name}
                value={value}
                onInput={handleInput}
                onChange={handleChange}
                placeholder={placeholder} 
                className={`
                    border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                    ${touched[name] && errors[name] ? "border-red-500" : ""}`
                } 
            />

            {inputError && <div className="text-red-500 text-xs mt-1">{inputError}</div>}

            {!inputError && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
        </div>
    );
}
 
export default JobPlaceInputUaeNo;
