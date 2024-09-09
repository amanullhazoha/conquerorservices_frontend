import { Link } from "react-router-dom";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import JobPlaceBtn from "../buttons/JobPlaceBtn";

const LicenseInfoForm = ({ handleNext, handlePrevious }) => {
    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">License Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Provide details of your license and residency permit</p>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Submission ID</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="Submission ID" placeholder="890-8764" name="submissionid" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Driving license (home country)</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="License number" placeholder="e.g 789-908-999" name="appli_dir_number" />
                <JobPlaceInputField label="Expiry date" placeholder="DD-MM-YYYY" name="appli_dir_expiry" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Do you have UAE license</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceRadioInput 
                    label="UAE license" 
                    name="have_uae_licence" 
                    items={[
                        {id: "1", name: "yes", value: "yes", label: "Yes"},
                        {id: "2", name: "no", value: "no", label: "No"}
                    ]}
                />
                <JobPlaceInputField label="UAE license number" placeholder="E.g. 670-9876" name="uae_license_No" />
                <JobPlaceInputField label="UAE resident visa number" placeholder="Select" name="UAE_Resident_visa_No" />
                <JobPlaceInputField label="Sim number (optional)" placeholder="Select" name="SIM_No" required={false} />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Driving license images</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="Driving license front" placeholder="Drop image here or" name="appli_dri_lisence_frontpart" />
                <JobPlaceInputField label="Driving license back" placeholder="Drop image here or" name="appli_dri_lisence_backpart" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">UAE DL (optional)</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="UAE DL front" placeholder="Drop image here or" name="UAE_DL_front" />
                <JobPlaceInputField label="UAE DL Back" placeholder="Drop image here or" name="UAE_DL_Back" />

                <div className="col-span-1 md:col-span-2 text-end">
                    <input type="checkbox" className="accent-[#1278BC]" name="is_agree" />

                    <label className="ml-2 text-base text-[#667085]">I Accept the <a href="/" className="text-[#1278BC]">Terms and Condition</a> of the Company</label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <JobPlaceBtn submit={true} handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        </div>
    );
}
 
export default LicenseInfoForm;