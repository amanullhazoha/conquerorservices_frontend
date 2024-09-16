// import { ErrorMessage } from "formik";
// import { useState, useRef, useEffect } from 'react';
// import DropdownArrow from "../../assets/icons/DropdownArrow";

// const JobPlaceDateField = ({
//     name,
//     label,
//     value,
//     errors,
//     touched,
//     handleSelect,
//     required=true,
//     pervDate=true,
// }) => {
//     const selectRef = useRef(null);
//     const dropdownRef = useRef(null);
//     const [isOpenMM, setIsOpenMM] = useState(false);
//     const [isOpenYY, setIsOpenYY] = useState(false);
//     const [isOpenDay, setIsOpenDay] = useState(false);
//     const [position, setPosition] = useState('bottom');
//     const [date, setDate] = useState({dd: "", mm: "", yyyy: ""});

//     const days = [];
//     const years = [];
//     const months = [];

//     for (let i = 1; i <= 31; i++) {
//         days.push(i.toString().padStart(2, '0'));
//     }

//     for (let i = 1; i <= 12; i++) {
//         months.push(i.toString().padStart(2, '0'));
//     }
    
//     if(pervDate) {
//         for (let i = 0; i <= 100; i++) {
//             years.push(new Date().getFullYear() - i);
//         }
//     } else {
//         for (let i = 0; i <= 50; i++) {
//             years.push(new Date().getFullYear() + i);
//         }
//     }

//     useEffect(() => {
//         if (selectRef.current) {
//             const { top, bottom } = selectRef.current.getBoundingClientRect();
//             const viewportHeight = window.innerHeight;
//             if (bottom > viewportHeight) {
//                 setPosition('top');
//             } else {
//                 setPosition('bottom');
//             }
//         }
//     }, [isOpenDay, isOpenMM, isOpenYY]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (selectRef.current && !selectRef.current.contains(event.target) &&
//                 dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpenDay(false);
//                 setIsOpenMM(false);
//                 setIsOpenYY(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     useEffect(() => {
//         if(date?.dd && date?.mm && date?.yyyy) {
//             handleSelect(`${date.yyyy}-${date.mm}-${date.dd}`);
//         } 
//     }, [date])

//     return (
//         <div>
//             <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
//                 {label} {required && <span className="text-[#F04438]">*</span>}
//             </label>

//             <div className="flex gap-2 items-center" ref={selectRef}>
//                 <div className="relative">
//                     <div 
//                         onClick={() => setIsOpenDay(!isOpenDay)}
//                         className={`border border-[#D0D5DD] rounded-lg w-fit px-2 
//                         py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
//                         justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
//                     >
//                         <span>
//                             <span className={date.dd ? "text-[#27303F]" : "text-[#718096]"}>{date.dd ? date.dd : "DD"}</span>
//                         </span>

//                         <DropdownArrow />
//                     </div>

//                     {isOpenDay && (
//                         <ul
//                             ref={dropdownRef}
//                             className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 z-50
//                             py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
//                             duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
//                             ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
//                         >
//                             {days.map((day) => (
//                                 <li 
//                                     key={day}
//                                     className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded" 
//                                     onClick={() => {
//                                         const state = {...date, dd: day};

//                                         setDate(state);
//                                         setIsOpenDay(false);
//                                     }}
//                                 >
//                                     {day}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>

//                 <div className="relative">
//                     <div 
//                         onClick={() => setIsOpenMM(!isOpenMM)}
//                         className={`border border-[#D0D5DD] rounded-lg w-fit px-2 
//                         py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
//                         justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
//                     >
//                         <span>
//                             <span className={date.mm ? "text-[#27303F]" : "text-[#718096]"}>{date.mm ? date.mm : "MM"}</span>
//                         </span>

//                         <DropdownArrow />
//                     </div>

//                     {isOpenMM && (
//                         <ul
//                             ref={dropdownRef}
//                             className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 z-50
//                             py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
//                             duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
//                             ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
//                         >
//                             {months.map((month) => (
//                                 <li 
//                                     key={month}
//                                     className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded" 
//                                     onClick={() => {
//                                         const state = {...date, mm: month};

//                                         setDate(state);
//                                         setIsOpenMM(false);
//                                     }}
//                                 >
//                                     {month}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>

//                 <div className="relative w-full">
//                     <div 
//                         onClick={() => setIsOpenYY(!isOpenYY)}
//                         className={`border border-[#D0D5DD] rounded-lg w-full px-2 
//                         py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
//                         justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
//                     >
//                         <span>
//                             <span className={date.yyyy ? "text-[#27303F]" : "text-[#718096]"}>{date.yyyy ? date.yyyy : "YYYY"}</span>
//                         </span>

//                         <DropdownArrow />
//                     </div>

//                     {isOpenYY && (
//                         <ul
//                             ref={dropdownRef}
//                             className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full max-h-[250px] overflow-y-auto px-2 z-50
//                             py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform 
//                             duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'} 
//                             ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
//                         >
//                             {years.map((year) => (
//                                 <li 
//                                     key={year}
//                                     className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded" 
//                                     onClick={() => {
//                                         const state = {...date, yyyy: year};

//                                         setDate(state);
//                                         setIsOpenYY(false);
//                                     }}
//                                 >
//                                     {year}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             </div>


//             <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
//         </div>
//     );
// };

// export default JobPlaceDateField;


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

    const days = [];
    const years = [];
    const months = [];

    for (let i = 1; i <= 31; i++) {
        days.push(i.toString().padStart(2, '0'));
    }

    for (let i = 1; i <= 12; i++) {
        months.push(i.toString().padStart(2, '0'));
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
                    <div
                        onClick={() => setIsOpenDay(!isOpenDay)}
                        className={`border border-[#D0D5DD] rounded-lg w-fit px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.dd ? "text-[#27303F]" : "text-[#718096]"}>{date.dd ? date.dd : "DD"}</span>
                        </span>

                        <DropdownArrow />
                    </div>

                    {isOpenDay && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                        >
                            {days.map((day) => (
                                <li
                                    key={day}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded"
                                    onClick={() => {
                                        const state = { ...date, dd: day };

                                        setDate(state);
                                        setIsOpenDay(false);
                                    }}
                                >
                                    {day}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <div
                        onClick={() => setIsOpenMM(!isOpenMM)}
                        className={`border border-[#D0D5DD] rounded-lg w-fit px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.mm ? "text-[#27303F]" : "text-[#718096]"}>{date.mm ? date.mm : "MM"}</span>
                        </span>

                        <DropdownArrow />
                    </div>

                    {isOpenMM && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform max-h-[250px] overflow-y-auto
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                        >
                            {months.map((month) => (
                                <li
                                    key={month}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded"
                                    onClick={() => {
                                        const state = { ...date, mm: month };

                                        setDate(state);
                                        setIsOpenMM(false);
                                    }}
                                >
                                    {month}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="relative w-full">
                    <div
                        onClick={() => setIsOpenYY(!isOpenYY)}
                        className={`border border-[#D0D5DD] rounded-lg w-full px-2
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 flex gap-2
                        justify-between items-center cursor-pointer group ${touched[name] && errors[name] ? "border-red-500" : ""}`}
                    >
                        <span>
                            <span className={date.yyyy ? "text-[#27303F]" : "text-[#718096]"}>{date.yyyy ? date.yyyy : "YYYY"}</span>
                        </span>

                        <DropdownArrow />
                    </div>

                    {isOpenYY && (
                        <ul
                            ref={dropdownRef}
                            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full max-h-[250px] overflow-y-auto px-2 z-50
                            py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform
                            duration-300 ease-in-out ${position === 'top' ? 'bottom-full' : 'top-full'}
                            ${position === 'top' ? 'transform -translate-y-full' : 'transform translate-y-0'}`}
                        >
                            {years.map((year) => (
                                <li
                                    key={year}
                                    className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded"
                                    onClick={() => {
                                        const state = { ...date, yyyy: year };

                                        setDate(state);
                                        setIsOpenYY(false);
                                    }}
                                >
                                    {year}
                                </li>
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
