import logo from "../../assets/images/logo.png"

const JobTypeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-4 md:p-8 w-full max-w-lg mx-4">
        <div className="relative">
          <h2 className="text-2xl font-semibold text-[#111928]">Application type</h2>

          <button
            onClick={onClose}
            className="text-[#6B7280] absolute -right-1.5 -top-3 text-xl"
          >
            &#10005;
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div 
            onClick={onClose}
            className="w-full flex flex-col items-center gap-1 p-1.5 rounded-2xl border border-[#E5E7EB]"
          >
                <img src={logo} alt="image" className="w-full h-auto" />

                <p className="text-2xl font-bold text-[#01913B]">Freelancer</p>
          </div>

          <div 
            onClick={onClose}
            className="w-full flex flex-col items-center gap-1 p-1.5 rounded-2xl border border-[#1B345D] bg-[#1B345D0D]"
        >
                <img src={logo} alt="image" className="w-full h-auto" />

                <p className="text-2xl font-bold text-[#1B345D]">Rider</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTypeModal;
