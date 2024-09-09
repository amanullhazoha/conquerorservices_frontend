const JobPlaceRadioInput = ({
    name,
    label,
    items,
    required=true,
}) => {
    return (
        <div>
            <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
                {label} {required && <span className="text-[#F04438]">*</span>}
            </label>

            <div className="flex gap-4">
                {items.map(item => (
                    <div className="flex gap-1 w-fit" key={item.id}>
                        <input 
                            name={name}
                            type="radio" 
                            id={item.name} 
                            value={item.value}
                            className="px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5" 
                        />

                        <label htmlFor={item.name} className="text-sm text-[#27303F]">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default JobPlaceRadioInput;