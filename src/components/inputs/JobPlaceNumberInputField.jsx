import { ErrorMessage } from "formik";
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
    value,
    setFieldValue,
    searchField =true,
    selectCountryCode,
}) => {
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputError, setInputError] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [position, setPosition] = useState('bottom');
    const [filterCountry, setFilterCountry] = useState(items);

    const handleFilter = (event) => {
        const value = event.target.value;

        setInputValue(value);

        const filtered = items.filter((item) => item[keyValue].toLowerCase().startsWith(value.toLowerCase()));

        setFilterCountry(filtered);
    }

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);

        setFieldValue(name, `${items.find((item) => item?.shortName?.toLowerCase().startsWith(selectCountryCode.toLowerCase()))?.code}${event.target.value}`)
    }

    const handleInput = (event) => {
        const value = event.target.value;
        
        if (type === "text") {
            const validValue = value.replace(/[^a-zA-Z\s]/g, "");
            
            if (validValue !== value) {
                event.target.value = validValue;
                setInputError("Only input letters and space");
            } else {
                setInputError("");
            }
        } else if (type == "number") {
            const validValue = value.replace(/[^0-9]/g, "");
            console.log(validValue !== value)
            
            if (validValue !== value) {
                event.target.value = validValue;
                setInputError("Only input number");
            } else {
                setInputError("");
            }
        }
    };

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

    useEffect(() => {
        if(changeDisable) {
            const matched = items.find((item) => item?.shortName?.toLowerCase().startsWith(selectCountryCode.toLowerCase()));
    
            if(matched) {
                setFieldValue(name, `${matched.code}${value.slice(items.find((item) => item?.shortName?.toLowerCase().startsWith(selectCountryCode.toLowerCase()))?.code?.length, value.length)}`)
                setPhoneNumber(`${value.slice(items.find((item) => item?.shortName?.toLowerCase().startsWith(selectCountryCode.toLowerCase()))?.code?.length, value.length)}`)
            }
        } {
            if(value) {
                const matched = items.find((item) => value?.startsWith(item?.code));

                handleSelect && handleSelect(matched);
                
                if(matched) {
                    setFieldValue(name, `${matched.code}${value.slice(matched?.code?.length, value.length)}`)
                    setPhoneNumber(`${value.slice(items.find((item) => item?.shortName?.toLowerCase().startsWith(selectCountryCode.toLowerCase()))?.code?.length, value.length)}`)
                }
            }
        }
    }, [selectCountryCode, value])

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
                <input 
                    id={name} 
                    type="text"
                    name={name}
                    value={phoneNumber}
                    placeholder={placeholder} 
                    onChange={handlePhoneNumber}
                    onInput={handleInput}
                    className={
                        `border border-[#D0D5DD] rounded-lg w-full pl-12 pr-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                        ${touched[name] && errors[name] ? "border-red-500" : ""}`
                    } 
                />

                <button type="button" 
                    onClick={toggleDropdown}
                    className="flex gap-0.5 items-center absolute top-0 left-0 px-1.5 py-1.5 w-fit mt-0.5 cursor-pointer"
                >
                    <span>
                        <span className="text-[#101828]">{selectCountryCode}</span>
                    </span>

                    <DropdownArrow className="w-4 h-4 mt-0.5" />
                </button>

                {isOpen && !changeDisable && (
                    <ul
                        ref={dropdownRef}
                        className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-fit px-2 
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform z-50 max-h-[250px] overflow-y-auto
                        duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
                        ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                    >
                        {searchField && (
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={handleFilter}
                                placeholder="Search country"
                                className="border border-[#D0D5DD] rounded-lg w-full px-1.5 py-1.5 text-sm text-[#27303F] outline-none mt-0.5 mb-0.5" 
                            />
                        )}

                        {filterCountry.map((item, index) => (
                            <button type="button" 
                                key={index}
                                className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded w-full text-left" 
                                onClick={() => {
                                    handleSelect(item);
                                    setIsOpen(false);
                                    setInputValue("");
                                    setFilterCountry(items);
                                    setFieldValue(name, item?.code);
                                }}
                            >
                                {item[keyValue]}
                            </button>
                        ))}
                    </ul>
                )}
            </div>

            {inputError && <div className="text-red-500 text-xs mt-1">{inputError}</div>}

            {!inputError && <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />}
        </div>
    );
}
 
export default JobPlaceNumberInputField;

