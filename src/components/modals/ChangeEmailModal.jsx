import { useState, useEffect } from "react";

const ChangeEmailModal = ({ handleChangeEmail, handleModal }) => {
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async () => {
    const response = await handleChangeEmail({ email: newEmail });

    if (response?.data?.data) {
      handleModal("email-verify");
    }

    console.log(response);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-[85%] md:w-[500px]">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
            >
              <path
                d="M46.6667 8C50.5327 8 53.6667 11.134 53.6667 15V41C53.6667 44.866 50.5327 48 46.6667 48H10C6.13401 48 3 44.866 3 41V15C3 11.134 6.13401 8 10 8H46.6667ZM50.3333 20.468L29.1365 32.127C28.692 32.3715 28.1637 32.3987 27.7005 32.2085L27.5301 32.127L6.33333 20.468V41C6.33333 43.025 7.97496 44.6667 10 44.6667H46.6667C48.6917 44.6667 50.3333 43.025 50.3333 41V20.468ZM46.6667 11.3333H10C7.97496 11.3333 6.33333 12.975 6.33333 15V16.6653L28.3333 28.7645L50.3333 16.664V15C50.3333 12.975 48.6917 11.3333 46.6667 11.3333Z"
                fill="#233876"
              />
            </svg>
          </div>

          <h2 className="text-center text-2xl font-bold mb-3 text-gray-900">
            Change Your Email
          </h2>

          <p className="text-center text-gray-700 mb-4 text-sm">
            Enter your valid email
          </p>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-gray-900 text-sm font-medium"
            >
              Email
            </label>

            <input
              type="email"
              value={newEmail}
              placeholder="name@example.com"
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-[#1B345E] bg-[#F9FAFB]"
            />
          </div>

          <button
            className="w-full bg-[#1B345E] text-white py-2 rounded-full hover:bg-[#1B345E] transition duration-200 mb-4 flex justify-center items-center gap-1.5"
            onClick={handleSubmit}
          >
            Change email
          </button>

          <div className="flex items-center justify-between mb-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-400">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <a
            href={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/public/google-oauth`}
          >
            <button
              className="w-full flex items-center justify-center 
            border border-[#D0D5DD] py-2 rounded-[100px]
             hover:bg-gray-100 transition duration-200 shadow-sm 
             text-base font-semibold text-[#344054]"
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          </a>

          <p className="text-xs text-gray-500 text-center mt-4">
            Please verify your email to download the application PDF and track
            the status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailModal;
