import { useState } from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import BasicInfoForm from "../components/section/BasicInfoForm";
import LicenseInfoForm from "../components/section/LicenseInfoForm";
import NIDorCNCinfromationForm from "../components/section/NIDorCNCinfromationForm";
import JobPlaceStep from "../components/section/JobPlaceStep";
import JobTypeModal from "../components/modals/JobTypeModal";

const JobPlacePage = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true)

  return (
    <PublicLayout>
      <main className="container max-sm:px-2.5 flex flex-col md:flex-row gap-6 pt-8">
        <div className="w-full md:w-[410px] bg-white rounded-lg">
          <JobPlaceStep />
        </div>

        {step === 1 && <BasicInfoForm handleNext={() => setStep(2)} />}
        {step === 2 && (
            <NIDorCNCinfromationForm 
                handleNext={() => setStep(3)}
                handlePrevious={() => setStep(1)} 
            />
        )}
        {step === 3 && (
            <LicenseInfoForm 
                handleNext={() => setStep(1)}
                handlePrevious={() => setStep(2)}
            />
        )}

        <JobTypeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </main>
    </PublicLayout>
  )
}

export default JobPlacePage;