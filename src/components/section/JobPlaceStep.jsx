import StepComplete from "../../assets/icons/StepComplete";
import StepIncomplete from "../../assets/icons/StepIncomplete";
import StepProcessing from "../../assets/icons/StepProcessing";

const JobPlaceStep = ({ step, data }) => {
  return (
    <ul className="px-4 py-4 max-md:grid max-md:grid-cols-3 max-md:gap-2">
      <li className="relative md:h-[144px]">
        <div className="flex gap-3 max-md:items-center justify-start max-md:flex-col">
          <div className="md:order-2">
            <h4 className="text-sm font-semibold text-[#1278BC] max-md:w-20 max-md:text-center">
              Basic Information
            </h4>
            <p className="text-sm font-normal text-[#A0AEC0] max-md:hidden">
              Fill out your personal details accurately
            </p>
          </div>

          {step > 1 ? <StepComplete /> : <StepProcessing />}
        </div>

        <div className="h-[5px] md:h-28 w-full md:w-[5px] bg-[#CBD5E0] absolute left-[50%] md:left-[10px] top-[61px] md:top-[28px] rounded"></div>
      </li>

      <li className="relative md:h-[144px]">
        <div className="flex gap-3 max-md:items-center md:justify-start max-md:flex-col z-10">
          <div className="md:order-2">
            <h4 className="text-sm font-normal text-[#1278BC] max-md:w-20 max-md:text-center">
              NID / CNIC Information
            </h4>
            <p className="text-sm font-normal text-[#1278BC] max-md:hidden">
              Provide your national identification details
            </p>
          </div>

          {step === 2 ? (
            <StepProcessing />
          ) : step > 2 ? (
            <StepComplete />
          ) : (
            <StepIncomplete />
          )}
        </div>

        <div className="h-[5px] md:h-28 w-full md:w-[5px] bg-[#CBD5E0] absolute left-[50%] md:left-[10px] top-[61px] md:top-[28px] rounded"></div>
      </li>

      <li className="relative">
        <div className="flex gap-3 max-md:items-center justify-start max-md:flex-col">
          <div className="md:order-2">
            <h4 className="text-sm font-semibold text-[#27303F] max-md:w-20 max-md:text-center">
              {data?.position_id === "52" || data?.position_id === 52
                ? "Other Information"
                : "License Information"}
            </h4>
            <p className="text-sm font-normal text-[#A0AEC0] max-md:hidden">
              {data?.position_id === "52" || data?.position_id === 52
                ? "Provide details of your 2 Reference"
                : "Provide details of your license and residency permit"}
            </p>
          </div>

          {step === 3 ? (
            <StepProcessing />
          ) : step > 3 ? (
            <StepComplete />
          ) : (
            <StepIncomplete />
          )}
        </div>
      </li>
    </ul>
  );
};

export default JobPlaceStep;
