import { Field, ErrorMessage } from "formik";

const JobSubmissionID = ({
    name,
    value,
    errors,
    touched,
    placeholder,
}) => {
    return (
        <div>
            <input
                id={name} 
                name={name}
                value={value}
                type="string" 
                disabled={true}
                placeholder={placeholder} 
                className={
                    `border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5 bg-[#F9FAFB]
                    ${touched[name] && errors[name] ? "border-red-500" : ""}`
                } 
            />

            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
}
 
export default JobSubmissionID;