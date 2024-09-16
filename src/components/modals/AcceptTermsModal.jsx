import logo from "../../assets/images/conqueror_logo.png";
import { useState, useEffect, useRef } from "react";

const AcceptTermsModal = ({ isOpen, onClose, handleAccept }) => {
  const scrollElement = useRef(null);
  const [language, setLanguage] = useState("en");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleScroll = () => {
    const element = scrollElement.current;
    if (!element) return;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    if(scrollPercentage >= 30) {
        setIsButtonEnabled(true);
    }

  };

  useEffect(() => {
    if (scrollElement.current) {
      scrollElement.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement.current) {
        scrollElement.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-4 md:p-8 w-full lg:max-w-[700px] mx-4">
        <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="logo" className="w-[150px] h-auto" />

            <div className="flex gap-0.5 items-center bg-slate-100 p-1 rounded-[30px]">
                <button 
                    type="button" 
                    className={`${language === "en" ? "bg-[#1B345E] text-white" : "text-[#111928]"} px-3 py-2 rounded-[30px]`} 
                    onClick={() => setLanguage("en")}
                >
                        English
                </button>

                <button 
                    type="button" 
                    className={`${language === "ab" ? "bg-[#1B345E] text-white" : "text-[#111928]"} px-3 py-2 rounded-[30px]`}
                    onClick={() => setLanguage("ab")}
                >
                    عربي
                </button>
            </div>
        </div>

        <div className="h-[200px] overflow-y-auto" ref={scrollElement}>
            <p className="mb-4 text-[#111928] font-semibold text-sm md:text-base">Our Commitment to the Community</p>
            <h4 className="mb-6 text-[#111928] font-semibold text-lg md:text-2xl">At Conqueror Services, we strive to create a welcoming environment</h4>
            <p className="text-[#4B5563] font-normal text-base mb-6">To help us maintain this, we kindly ask you to commit to the following:</p>

            <p 
                className="text-[#4B5563] font-normal text-base mb-6"
            >
                These Terms Of Service Constitute An Agreement (This “Agreement”) By And 
                Between Conqueror Services LLC , Whose Principal Place Of Business Is City 
                Pharmacy Building, M02, Port Saeed, Dubai, U.A.E (“Conqueror”) And The Corporation, 
                Llc, Partnership, Sole Proprietorship, Or Any Other Business Entity Executing This 
                Agreement Or Any Order (“Customer”). This Agreement Is Effective As Of The Date 
                Customer Starts Using The System (The “Effective Date”). 
            </p>
        </div>

        <div className="flex flex-col gap-2 mt-6">
            <button 
                type="button" 
                onClick={() => handleAccept()}
                className={`w-full px-1.5 py-2.5 bg-[#9CA3AF] text-white rounded-full text-sm font-medium border border-[#E5E7EB] ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                disabled={!isButtonEnabled}
            >
                Agree and continue
            </button>

            <button 
                type="button"
                onClick={onClose}
                className="w-full px-1.5 py-2.5 bg-white text-[#1F2A37] rounded-full text-sm font-medium border border-[#E5E7EB]"
            >
                Decline
            </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTermsModal;
