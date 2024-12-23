import { Form, Formik, Field, ErrorMessage } from "formik";
import ModalDateField from "../inputs/ModalDateInputField";
import { applicantIdentityByPassportSchema } from "../../schema/jobPlaceSchema";

const IdentityVerificationModal = ({ handleModal, error, handlePassport }) => {
  const handleSubmit = async (values) => {
    const response = await handlePassport(values);

    if (response?.data?.data) {
      handleModal("email-verify");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-[85%] md:w-[500px]">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="57"
              viewBox="0 0 56 57"
              fill="none"
            >
              <path
                d="M27.75 26.8734C31.3399 26.8734 34.25 23.9633 34.25 20.3734C34.25 16.7836 31.3399 13.8734 27.75 13.8734C24.1602 13.8734 21.25 16.7836 21.25 20.3734C21.25 23.9633 24.1602 26.8734 27.75 26.8734ZM27.75 43.1234C35.875 43.1234 39.125 39.0453 39.125 34.9984C39.125 32.306 36.9424 30.1234 34.25 30.1234H21.25C18.5576 30.1234 16.375 32.306 16.375 34.9984C16.375 39.0606 19.625 43.1235 27.75 43.1234ZM28.6514 2.77292C28.1056 2.40903 27.3944 2.40903 26.8486 2.77292C20.5495 6.97233 13.7371 9.59249 6.39519 10.6413C5.59464 10.7557 5 11.4413 5 12.25V26.875C5 39.5218 12.4977 48.7498 27.1667 54.3917C27.5421 54.5361 27.9579 54.5361 28.3333 54.3917C43.0023 48.7498 50.5 39.5218 50.5 26.875V12.25C50.5 11.4413 49.9054 10.7557 49.1048 10.6413C41.7629 9.59249 34.9505 6.97233 28.6514 2.77292ZM8.25 13.6406C14.7026 12.5443 20.7714 10.2872 26.4472 6.87393L27.75 6.06573L29.0528 6.87393C34.7286 10.2872 40.7974 12.5443 47.25 13.6406V26.875C47.25 37.8992 40.8542 45.931 27.75 51.1304C14.6458 45.931 8.25 37.8992 8.25 26.875V13.6406Z"
                fill="#233876"
              />
            </svg>
          </div>

          <h2 className="text-center text-2xl font-bold mb-3 text-gray-900">
            Identity Verification
          </h2>

          <p className="text-center text-gray-700 mb-4 text-sm px-4">
            Applicant, verify your identity using your Passport Number and Date
            of Birth.
          </p>

          {error && (
            <div
              className="bg-[#FDF2F2] border border-gray-200 text-center py-2.5 rounded-lg 
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
                    d="M10 2.5C14.4183 2.5 18 6.08172 18 10.5C18 14.9183 14.4183 18.5 10 18.5C5.58172 18.5 2 14.9183 2 10.5C2 6.08172 5.58172 2.5 10 2.5ZM10 13C9.58579 13 9.25 13.3358 9.25 13.75C9.25 14.1642 9.58579 14.5 10 14.5C10.4142 14.5 10.75 14.1642 10.75 13.75C10.75 13.3358 10.4142 13 10 13ZM10 6.5C9.75454 6.5 9.55039 6.67688 9.50806 6.91012L9.5 7V11.5L9.50806 11.5899C9.55039 11.8231 9.75454 12 10 12C10.2455 12 10.4496 11.8231 10.4919 11.5899L10.5 11.5V7L10.4919 6.91012C10.4496 6.67688 10.2455 6.5 10 6.5Z"
                    fill="#F05252"
                  />
                </svg>
              </div>

              <p className="text-left text-[#C81E1E] text-sm font-normal">
                {error?.message}
              </p>
            </div>
          )}

          <Formik
            onSubmit={handleSubmit}
            validationSchema={applicantIdentityByPassportSchema}
            initialValues={{ passportno: "", date_of_birth: "" }}
          >
            {({ handleSubmit, values, errors, setFieldValue, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="passportno"
                    className="text-gray-900 text-sm font-medium"
                  >
                    Passport Number
                  </label>

                  <Field
                    type="text"
                    name="passportno"
                    placeholder="5454-123"
                    className={`w-full mt-1.5 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-[#1B345E] bg-[#F9FAFB] ${
                      touched["passportno"] && errors["passportno"]
                        ? "border-red-500"
                        : ""
                    }`}
                  />

                  <ErrorMessage
                    component="div"
                    name="passportno"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="mb-5">
                  <ModalDateField
                    startYear={18}
                    errors={errors}
                    required={false}
                    touched={touched}
                    name="date_of_birth"
                    label="Date of Birth "
                    value={values?.date_of_birth}
                    handleSelect={(value) =>
                      setFieldValue("date_of_birth", value)
                    }
                  />
                </div>

                <button
                  className="w-full bg-[#1B345E] text-white py-2 rounded-full hover:bg-[#1B345E] transition duration-200 flex justify-center items-center gap-1.5"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    className="mt-0.5"
                  >
                    <g clip-path="url(#clip0_96_11069)">
                      <path
                        d="M10.8351 1.0652L10.9115 1.21776L11.4879 2.75075C11.5332 2.87147 11.6285 2.96672 11.7492 3.01202L13.2293 3.56729C13.8788 3.81096 14.2278 4.505 14.0547 5.16165L14.0131 5.29234L13.3245 6.81517C13.2712 6.93256 13.2712 7.06727 13.3245 7.18466L13.9785 8.62387C14.2654 9.25544 14.0215 9.99299 13.4347 10.3349L13.2822 10.4114L11.7492 10.9878C11.6285 11.0331 11.5332 11.1284 11.4879 11.2491L10.9327 12.7292C10.689 13.3787 9.99495 13.7277 9.33829 13.5546L9.20761 13.513L7.68478 12.8244C7.56739 12.7711 7.43268 12.7711 7.31529 12.8244L5.87608 13.4783C5.24451 13.7653 4.50696 13.5213 4.16501 12.9346L4.08859 12.7821L3.51214 11.2491C3.46685 11.1284 3.37159 11.0331 3.25087 10.9878L1.77079 10.4325C1.12129 10.1889 0.772268 9.49483 0.945342 8.83817L0.986984 8.70748L1.67555 7.18466C1.72889 7.06727 1.72889 6.93256 1.67555 6.81517L1.02162 5.37596C0.734653 4.74439 0.978615 4.00683 1.56532 3.66489L1.71789 3.58847L3.25087 3.01202C3.37159 2.96672 3.46685 2.87147 3.51214 2.75075L4.06741 1.27067C4.31108 0.621169 5.00512 0.272146 5.66178 0.44522L5.79246 0.486862L7.31529 1.17543C7.43268 1.22877 7.56739 1.22877 7.68478 1.17543L9.12399 0.521497C9.75556 0.234531 10.4931 0.478492 10.8351 1.0652ZM4.9037 1.58442L4.34843 3.06449C4.21255 3.42666 3.92678 3.71243 3.56462 3.8483L2.08454 4.40358L1.98656 4.45488C1.81252 4.57549 1.74412 4.80686 1.83482 5.00647L2.48875 6.44567C2.64876 6.79784 2.64876 7.20198 2.48875 7.55415L1.82881 9.0072L1.80181 9.09892C1.76403 9.30727 1.87927 9.51924 2.08454 9.59625L3.56462 10.1515C3.92678 10.2874 4.21255 10.5732 4.34843 10.9353L4.9037 12.4154L4.955 12.5134C5.07561 12.6874 5.30698 12.7558 5.50659 12.6651L6.9458 12.0112C7.29796 11.8512 7.7021 11.8512 8.05427 12.0112L9.50732 12.6711L9.59904 12.6981C9.80739 12.7359 10.0194 12.6207 10.0964 12.4154L10.6516 10.9353C10.7875 10.5732 11.0733 10.2874 11.4355 10.1515L12.9155 9.59625L13.0135 9.54494C13.1875 9.42433 13.2559 9.19297 13.1653 8.99336L12.5113 7.55415C12.3513 7.20198 12.3513 6.79784 12.5113 6.44567L13.1713 4.99263L13.1983 4.90091C13.236 4.69256 13.1208 4.48059 12.9155 4.40358L11.4355 3.8483C11.0733 3.71243 10.7875 3.42666 10.6516 3.06449L10.0964 1.58442L10.0451 1.48644C9.92446 1.3124 9.69309 1.244 9.49348 1.33469L8.05427 1.98863C7.7021 2.14864 7.29796 2.14864 6.9458 1.98863L5.50659 1.33469L5.47872 1.32315C5.24778 1.23651 4.99034 1.35348 4.9037 1.58442ZM6.47828 8.34657L9.66393 4.70582C9.82635 4.5202 10.1085 4.50139 10.2941 4.66381C10.4565 4.80593 10.4913 5.03971 10.3886 5.22029L10.3361 5.294L6.83614 9.294C6.68728 9.46412 6.43968 9.49301 6.25772 9.3752L6.18424 9.31571L4.68424 7.81571C4.50983 7.6413 4.50983 7.35853 4.68424 7.18412C4.83685 7.03151 5.07242 7.01243 5.24577 7.12689L5.31583 7.18412L6.47828 8.34657L9.66393 4.70582L6.47828 8.34657Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_96_11069">
                        <rect
                          width="14"
                          height="14"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Identify
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationModal;
