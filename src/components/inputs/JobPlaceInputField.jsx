const JobPlaceInputField = ({
    name,
    label,
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
                placeholder={placeholder} 
                className="border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5" 
            />
        </div>
    );
}
 
export default JobPlaceInputField;