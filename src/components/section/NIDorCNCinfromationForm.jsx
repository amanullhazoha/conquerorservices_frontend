import JobPlaceBtn from "../buttons/JobPlaceBtn";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";

const NIDorCNCinfromationForm = ({ handleNext, handlePrevious }) => {
    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">NID / CNIC Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Provide your National ID or Computerized National Identity Card details</p>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Passport & Expiry Date</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="Passport number" placeholder="e.g 789-908-999" name="passportno" />
                <JobPlaceInputField label="Expiry date" placeholder="Abdullah" name="date_of_expiry" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Father Name</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="Full name" placeholder="Abdul Rehman" name="father_name" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Identity Number</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceInputField label="NID / CNIC" placeholder="e.g 789-908-999" name="nidofcnicnumber" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Marital Status</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceRadioInput 
                  name="maritalstatus" 
                  label="Marital status" 
                  items={[
                    {id: "1", name: "single", value: "single", label: "Single"},
                    {id: "2", name: "married", value: "married", label: "Married"},
                    {id: "3", name: "divorced", value: "divorced", label: "Divorced"}
                  ]} 
                />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Residency</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <JobPlaceRadioInput 
                  name="uaeresidient" 
                  label="UAE resident" 
                  items={[
                    {id: "1", name: "yes", value: "yes", label: "Yes"},
                    {id: "2", name: "no", value: "no", label: "No"}
                  ]} 
                />
                <div></div>

                <JobPlaceInputField label="Emirates ID" placeholder="e.g 789-908-999" name="email" />
                <JobPlaceInputField label="Expiry date" placeholder="Email" name="email" />
            </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Religion</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
                <JobPlaceInputField label="Job position" placeholder="Select" name="mother_name" />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Home Country Address</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="col-span-1 md:col-span-2">
                  <JobPlaceInputField label="Permanent address" placeholder="Enter address" name="mother_name" />
                </div>
                <JobPlaceInputField label="State / Province" placeholder="Select" name="mother_name" />
                <JobPlaceInputField label="City / District" placeholder="Select" name="mother_name" />
                <JobPlaceInputField label="Police station" placeholder="Select" name="mother_name" />
                <JobPlaceInputField label="Post office" placeholder="Select" name="mother_name" />

                <div className="col-span-1 md:col-span-2">
                  <JobPlaceInputField label="Reference number (optional)" placeholder="Select" name="mother_name" required={false} />
                </div>
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Passport Images</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <DragAndDrop label="Front page" name="mother_name" />
                <DragAndDrop label="Signature page (optional)" name="mother_name" required={false} />
              </div>
            </div>
          </div>

          <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
            <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">NID / CNIC Images</h4>

            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <DragAndDrop label="NID / CNIC front" name="mother_name" />
                <DragAndDrop label="NID / CNIC Back" name="mother_name" />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <JobPlaceBtn handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        </div>
    );
}
 
export default NIDorCNCinfromationForm;