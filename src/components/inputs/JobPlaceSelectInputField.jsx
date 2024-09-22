import { ErrorMessage } from "formik";
import { useState, useRef, useEffect } from 'react';
import DropdownArrow from "../../assets/icons/DropdownArrow";

const JobPlaceSelectInputField = ({
    name,
    label,
    items,
    value,
    errors,
    touched,
    keyValue,
    placeholder,
    handleSelect,
    required=true,
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

            <div className="relative">
                <button 
                    type="button" 
                    ref={selectRef}
                    onClick={toggleDropdown}
                    className={`border border-[#D0D5DD] rounded-lg w-full px-2 
                    py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex
                    justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                >
                    <span>
                        <span className={value ? "text-[#27303F]" : "text-[#718096]"}>{value ? value : placeholder}</span>
                    </span>

                    <DropdownArrow />
                </button>

                <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />

                {isOpen && (
                    <ul
                        ref={dropdownRef}
                        className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform z-50 max-h-[250px] overflow-y-auto
                        duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
                        ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                    >
                        {items.map((item, index) => (
                            <button
                                type="button" 
                                key={index}
                                className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded w-full text-left" 
                                onClick={() => {
                                    handleSelect(item);
                                    setIsOpen(false);
                                }}
                            >
                                {item[keyValue]}
                            </button>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default JobPlaceSelectInputField;
