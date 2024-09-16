import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PublicLayout from "../components/layouts/PublicLayout";
import BasicInfoForm from "../components/section/BasicInfoForm";
import LicenseInfoForm from "../components/section/LicenseInfoForm";
import NIDorCNCinfromationForm from "../components/section/NIDorCNCinfromationForm";
import JobPlaceStep from "../components/section/JobPlaceStep";
import JobTypeModal from "../components/modals/JobTypeModal";
import { useGetApplicationByIDQuery } from "../slice/jobPlacePage.slice";

const JobPlacePage = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useGetApplicationByIDQuery(searchParams.get("id"))

  return (
    <PublicLayout>
      <main className="container max-sm:px-2.5 flex flex-col md:flex-row gap-6 pt-8">
        <div className="p-1.5 w-full md:w-[410px] bg-white rounded-lg">
          <div 
            className="rounded-lg" 
            style={{ "backgroundImage": "linear-gradient(rgba(221, 228, 247, 1), rgba(221, 228, 247, 0))"}}
          >
            <JobPlaceStep step={step} />
          </div>
        </div>

        {step === 1 && (
          <BasicInfoForm 
              data={data}
              position_id={position}
              setPosition={setPosition}
              id={searchParams.get("id")}
              handleNext={(id ) => {
                setStep(2);
                setSearchParams({ id });
              }} 
          />
        )}
        {step === 2 && (
            <NIDorCNCinfromationForm 
                data={data}
                id={searchParams.get("id")}
                handleNext={() => setStep(3)}
                handlePrevious={() => setStep(1)} 
            />
        )}
        {step === 3 && (
            <LicenseInfoForm 
                data={data}
                id={searchParams.get("id")}
                handleNext={() => setStep(1)}
                handlePrevious={() => setStep(2)}
            />
        )}

        <JobTypeModal 
          isOpen={isOpen && !position} 
          onClose={() => setIsOpen(false)} 
          handlePosition={(id) => setPosition(id)} 
        />
      </main>
    </PublicLayout>
  )
}

export default JobPlacePage;