import { useState } from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import BasicInfoForm from "../components/section/BasicInfoForm";
import LicenseInfoForm from "../components/section/LicenseInfoForm";
import NIDorCNCinfromationForm from "../components/section/NIDorCNCinfromationForm";

const JobPlacePage = () => {
  const [step, setStep] = useState(1);

  return (
    <PublicLayout>
      <main className="container max-sm:px-2.5 flex flex-col md:flex-row gap-6 pt-8">
        <div className="w-full md:w-[410px] bg-white rounded-lg max-md:h-10">
          <div>
            <button type="button">step 1</button>
            <button type="button">step 2</button>
            <button type="button">step 3</button>
          </div>
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
      </main>
    </PublicLayout>
  )
}

export default JobPlacePage;