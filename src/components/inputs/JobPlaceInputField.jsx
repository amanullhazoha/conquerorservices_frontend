import { Field, ErrorMessage } from "formik";

const JobPlaceInputField = ({
    name,
    label,
    value,
    errors,
    touched,
    placeholder,
    type="text",
    required=true,
}) => {
    return (
        <div>
            <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
                {label} {required && <span className="text-[#F04438]">*</span>}
            </label>

            <Field 
                id={name} 
                type={type} 
                name={name}
                placeholder={placeholder} 
                error={touched[name] && errors[name]}
                className={
                    `border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                    ${touched[name] && errors[name] ? "border-red-500" : ""}`
                } 
            />

            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
}
 
export default JobPlaceInputField;