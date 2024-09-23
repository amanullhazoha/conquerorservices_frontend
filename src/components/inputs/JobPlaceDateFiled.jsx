import { ErrorMessage } from "formik";
import { useState, useRef, useEffect } from 'react';
import DropdownArrow from "../../assets/icons/DropdownArrow";

const JobPlaceDateField = ({
    name,
    label,
    value,
    errors,
    touched,
    handleSelect,
    required = true,
    pervDate = true,
}) => {
    const selectRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isOpenMM, setIsOpenMM] = useState(false);
    const [isOpenYY, setIsOpenYY] = useState(false);
    const [isOpenDay, setIsOpenDay] = useState(false);
    const [position, setPosition] = useState('bottom');
    const [date, setDate] = useState({ dd: "", mm: "", yyyy: "" });

    // Define month names and numbers
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthNumbers = monthNames.map((_, i) => (i + 1).toString().padStart(2, '0'));

    const days = [];
    const years = [];

    for (let i = 1; i <= 31; i++) {
        days.push(i.toString().padStart(2, '0'));
    }

    if (pervDate) {
        for (let i = 0; i <= 100; i++) {
            years.push(new Date().getFullYear() - i);
        }
    } else {
        for (let i = 0; i <= 50; i++) {
            years.push(new Date().getFullYear() + i);
        }
    }

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
    }, [isOpenDay, isOpenMM, isOpenYY]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDay(false);
                setIsOpenMM(false);
                setIsOpenYY(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            const [yyyy, mm, dd] = value.split("-");
            setDate({ dd, mm, yyyy });
        }
    }, [value]);

    useEffect(() => {
        if (date.dd && date.mm && date.yyyy) {
            handleSelect(`${date.yyyy}-${date.mm}-${date.dd}`);
        }
    }, [date]);

    return (
        <div>
            <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
                {label} {required && <span className="text-[#F04438]">*</span>}
            </label>

            <div className="flex gap-2 items-center" ref={selectRef}>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpenDay(!isOpenDay);
                            setIsOpenMM(false);
                            setIsOpenYY(false);
                        }}
                        className={`border border-[#D0D5DD] rounded-lg w-fit px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.dd ? "text-[#27303F]" : "text-[#718096]"}>{date.dd ? date.dd : "DD"}</span>
                        </span>

                        <DropdownArrow />
                    </button>

                    {isOpenDay && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-[250px] px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'} grid grid-cols-6 gap-2`}
                        >
                            <p className="col-span-6 text-[#D0D5DD]">Day</p>

                            {days.map((day) => (
                                <button
                                    type="button"
                                    key={day}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded"
                                    onClick={() => {
                                        const state = { ...date, dd: day };

                                        setDate(state);
                                        setIsOpenDay(false);
                                        setIsOpenMM(true);
                                    }}
                                >
                                    {day}
                                </button>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpenMM(!isOpenMM);
                            setIsOpenDay(false);
                            setIsOpenYY(false);
                        }}
                        className={`border border-[#D0D5DD] rounded-lg w-fit px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.mm ? "text-[#27303F]" : "text-[#718096]"}>{date.mm ? monthNames[monthNumbers.indexOf(date.mm)] : "MM"}</span>
                        </span>

                        <DropdownArrow />
                    </button>

                    {isOpenMM && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
                        >
                            <p className="col-span-6 text-[#D0D5DD]">Month</p>

                            {monthNames.map((month, index) => (
                                <button
                                    type="button"
                                    key={month}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded w-full"
                                    onClick={() => {
                                        const state = { ...date, mm: monthNumbers[index] };

                                        setDate(state);
                                        setIsOpenMM(false);
                                        setIsOpenYY(true);
                                    }}
                                >
                                    {month}
                                </button>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative w-full">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpenYY(!isOpenYY);
                            setIsOpenDay(false);
                            setIsOpenMM(false);
                        }}
                        className={`border border-[#D0D5DD] rounded-lg w-full px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.yyyy ? "text-[#27303F]" : "text-[#718096]"}>{date.yyyy ? date.yyyy : "YYYY"}</span>
                        </span>

                        <DropdownArrow />
                    </button>

                    {isOpenYY && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full max-h-[250px] overflow-y-auto px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
                        >
                            <p className="col-span-6 text-[#D0D5DD]">Year</p>

                            {years.map((year) => (
                                <button
                                    type="button"
                                    key={year}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded w-full text-left"
                                    onClick={() => {
                                        const state = { ...date, yyyy: year };

                                        setDate(state);
                                        setIsOpenYY(false);
                                    }}
                                >
                                    {year}
                                </button>
                            ))}
                        </ul>   
                    )}
                </div>
            </div>

            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    );
};

export default JobPlaceDateField;
