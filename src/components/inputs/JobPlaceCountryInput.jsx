import { ErrorMessage, Field } from "formik";
import { useState, useRef, useEffect } from "react";
import DropdownArrow from "../../assets/icons/DropdownArrow";
import { allCountry } from "../../assets/staticData/countryInfo";

const JobPlaceCountryInput = ({
  name,
  label,
  value,
  errors,
  touched,
  placeholder,
  handleSelect,
  required = true,
}) => {
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("bottom");

  useEffect(() => {
    if (selectRef.current) {
      const { top, bottom } = selectRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (bottom > viewportHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log(event);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <label htmlFor={name} className="text-sm text-[#27303F] font-medium">
        {label} {required && <span className="text-[#F04438]">*</span>}
      </label>

      <div className="relative">
        <Field
          id={name}
          name={name}
          type="text"
          onFocus={toggleDropdown}
          placeholder={placeholder}
          error={touched[name] && errors[name]}
          className={`border border-[#D0D5DD] rounded-lg w-full px-2 py-1.5 text-sm text-[#27303F] outline-none mt-0.5
                ${touched[name] && errors[name] ? "border-red-500" : ""}`}
        />

        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-xs mt-1"
        />

        {isOpen && (
          <ul
            ref={dropdownRef}
            className={`absolute bg-white border border-[#D0D5DD] rounded-lg w-full px-2 
                        py-1.5 text-sm text-[#27303F] outline-none mt-0.5 transition-transform z-50 max-h-[250px] overflow-y-auto
                        duration-300 ease-in-out ${
                          position === "top" ? "bottom-full" : "top-full"
                        } 
                        ${
                          position === "top"
                            ? "transform -translate-y-full"
                            : "transform translate-y-0"
                        }`}
          >
            {allCountry
              ?.filter((country) =>
                country?.name
                  ?.toLowerCase()
                  ?.includes(value ? value?.toLowerCase() : "")
              )
              ?.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className="px-0.5 py-0.5 hover:bg-[#D0D5DD] cursor-pointer rounded w-full text-left"
                  onClick={() => {
                    handleSelect(name, item.name);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobPlaceCountryInput;
