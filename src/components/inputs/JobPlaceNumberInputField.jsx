import { Field, ErrorMessage } from "formik";
import { useState, useRef, useEffect } from 'react';
import DropdownArrow from "../../assets/icons/DropdownArrow";

const JobPlaceNumberInputField = ({
    name,
    label,
    items,
    errors,
    touched,
    keyValue,
    changeDisable,
    placeholder,
    type="text",
    handleSelect,
    required=true,
    selectCountryCode,
}) => {
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState('bottom');

    useEffect(() => {
        if (selectRef.current) {
            const { top, bottom } = selectRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            if (bottom > viewportHeight) {
                setPosition('top');
            } else {
                setPosition('bottom');
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
                {label} {required && <span className="text-[#F04438]">*</span>}
            </label>

            <div 
                ref={selectRef}
                className="relative" 
            >
                <Field 
                    id={name} 
                    type={type} 
                    name={name}
                    placeholder={placeholder} 
                    error={touched[name] && errors[name]}
                    className={
                        `border border-[#D0D5DD] rounded-lg w-full pl-12 pr-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                        ${touched[name] && errors[name] ? "border-red-500" : ""}`
                    } 
                />

                <div 
                    onClick={toggleDropdown}
                    className="flex gap-0.5 items-center absolute top-0 left-0 px-1.5 py-1.5 w-fit mt-0.5 cursor-pointer"
                >
                    <span>
                        <span className="text-[#101828]">{selectCountryCode ? selectCountryCode : "BD"}</span>
                    </span>

                    <DropdownArrow className="w-4 h-4 mt-0.5" />
                </div>

                {isOpen && !changeDisable && (
                    <ul
                        ref={dropdownRef}
                        className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-fit px-2 
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform z-50 max-h-[250px] overflow-y-auto
                        duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
                        ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                    >
                        {items.map((item, index) => (
                            <li 
                                key={index}
                                className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded" 
                                onClick={() => {
                                    handleSelect(item);
                                    setIsOpen(false);
                                }}
                            >
                                {item[keyValue]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
}
 
export default JobPlaceNumberInputField;