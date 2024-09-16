import { Field, ErrorMessage } from "formik";

const JobPlaceInputNID = ({
    name,
    label,
    value,
    errors,
    touched,
    handleChange,
    placeholder,
    type="text",
    required=true,
}) => {
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
                onChange={handleChange}
                placeholder={placeholder} 
                className={
                    `border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                    ${touched[name] && errors[name] ? "border-red-500" : ""}`
                } 
            />

            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
}
 
export default JobPlaceInputNID;