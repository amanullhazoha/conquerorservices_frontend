import { Form, Formik } from "formik";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";

const initialValues = {
  passportno: "",
  date_of_expiry: "",
  father_name: "",
  nidofcnicnumber: "",
  maritalstatus: "",
  uaeresidient: "",
  email: "",
  phone_number: "",
  whatsapp_number: "",
  job_position: "",
  applicant_photo: null
};

const LicenseInfoForm = ({ handleNext, handlePrevious }) => {
    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">License Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Provide details of your license and residency permit</p>
          </div>

          <Formik
            initialValues={initialValues}
            // validationSchema={jobApplyBasicSchema}
            // onSubmit={(values) => console.log(values)}
            onSubmit={(values) => handleNext()}
          >
            {({ handleSubmit, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Submission ID</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors}
                        touched={touched}
                        name="submissionid" 
                        label="Submission ID" 
                        placeholder="890-8764" 
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Driving license (home country)</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors}
                        touched={touched}
                        label="License number" 
                        name="appli_dir_number" 
                        placeholder="e.g 789-908-999" 
                      />

                      <JobPlaceDateField 
                        errors={errors}
                        pervDate={false}
                        touched={touched}
                        label="Expiry date" 
                        name="appli_dir_expiry"
                        handleSelect={(date) => setFieldValue("appli_dir_expiry", date)}
                      />
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

                      <JobPlaceInputField 
                        errors={errors}
                        touched={touched}
                        name="uae_license_No" 
                        label="UAE license number" 
                        placeholder="E.g. 670-9876" 
                      />

                      <JobPlaceInputField 
                        errors={errors}
                        touched={touched}
                        placeholder="Select" 
                        name="UAE_Resident_visa_No" 
                        label="UAE resident visa number" 
                      />

                      <JobPlaceInputField 
                        errors={errors}
                        touched={touched}
                        name="SIM_No" 
                        required={false} 
                        placeholder="Select" 
                        label="Sim number (optional)" 
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Driving license images</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop label="Driving license front" name="appli_dri_lisence_frontpart" />
                      <DragAndDrop label="Driving license back" name="appli_dri_lisence_backpart" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">UAE DL (optional)</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop label="UAE DL front" name="UAE_DL_front" />
                      <DragAndDrop label="UAE DL Back" name="UAE_DL_Back" />

                      <div className="col-span-1 md:col-span-2 text-end">
                          <input type="checkbox" className="accent-[#1278BC]" name="is_agree" />

                          <label className="ml-2 text-base text-[#667085]">I Accept the <a href="/" className="text-[#1278BC]">Terms and Condition</a> of the Company</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <JobPlaceBtn submit={true} handlePrevious={handlePrevious} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
    );
}
 
export default LicenseInfoForm;