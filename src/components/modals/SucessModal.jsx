import { useEffect } from "react";
import success from "../../assets/images/successfully.png";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useApplicantVerifySuccessfullyQuery } from "../../slice/jobPlacePage.slice";

const SuccessModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error } =
    useApplicantVerifySuccessfullyQuery(searchParams.get("success"));

  useEffect(() => {
    let interval;

    if (!isError) {
      interval = setInterval(() => {
        navigate("/");
      }, 30000);
    } else {
      navigate("/applicant-identify-by-passport");
    }

    return () => clearInterval(interval);
  }, [isError]);

  if (isError) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-[85%] md:w-[500px]">
          <div className="flex justify-center mb-4">
            <img src={success} alt="success" className="w-[200px] h-[200px]" />
          </div>

          <h2 className="text-center text-2xl font-bold mb-2 text-gray-900">
            Application submitted successfully!
          </h2>

          <div
            className="bg-[#F3FAF7] border border-gray-200 text-center py-2.5 rounded-lg 
            text-sm mb-8 flex gap-3 items-start px-4"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M0 10.5C0 4.97715 4.47715 0.5 10 0.5C15.5228 0.5 20 4.97715 20 10.5C20 16.0228 15.5228 20.5 10 20.5C4.47715 20.5 0 16.0228 0 10.5Z"
                  fill="#0E9F6E"
                />
                <path
                  d="M6.25 10.5L8.75 13L13.75 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div className="text-left text-[#046C4E] text-sm font-normal">
              <p>
                Name: <span className="font-medium">{data?.data?.name}</span>
              </p>
              <p>
                Submission ID:{" "}
                <span className="font-medium">{data?.data?.submissionid}</span>{" "}
                | Passport Number:{" "}
                <span className="font-medium">{data?.data?.passportno}</span>
                .Please check your email to download the PDF and track your
                status.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="w-full bg-[#1B345E] text-white py-2 rounded-full hover:bg-[#1B345E] transition duration-200 mb-4 flex justify-center items-center gap-1.5"
          >
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
