import { useState, useEffect } from "react";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import { ErrorMessage, Form, Formik } from "formik";
import AcceptTermsModal from "../modals/AcceptTermsModal";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { jobApplyLicenseSchema } from "../../schema/jobPlaceSchema";
import { useUpdateApplicantLicenseInfoMutation } from "../../slice/jobPlacePage.slice";

const INITIALVALUES = {
  is_agree: false,
  submissionid: "",
  UAE_DL_front: "",
  UAE_DL_Back: "",
  appli_dri_number: "",
  appli_dri_expiry: "",
  have_uae_licence: "",
  UAE_Resident_Visa_No: "",
  UAE_License_No: "",
  SIM_No: "",
  appli_dri_lisence_frontpart: "",
  appli_dri_lisence_backpart: "",
};

const LicenseInfoForm = ({ id, data, handleNext, handlePrevious }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [initialValues, setInitialValues] = useState(INITIALVALUES);
    
    const [updateApplicantLicenseInfo, { isLoading, isError }] = useUpdateApplicantLicenseInfoMutation();

    const handleSubmit = async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        if (values.UAE_DL_Front && values.UAE_DL_Front[0] instanceof File) {
          formData.append('UAE_DL_Front', values.UAE_DL_Front[0]);
        }
        if (values.UAE_DL_Back && values.UAE_DL_Back[0] instanceof File) {
          formData.append('UAE_DL_Back', values.UAE_DL_Back[0]);
        }
        if (values.appli_dri_lisence_frontpart && values.appli_dri_lisence_frontpart[0] instanceof File) {
          formData.append('appli_dri_lisence_frontpart', values.appli_dri_lisence_frontpart[0]);
        }
        if (values.appli_dri_lisence_backpart && values.appli_dri_lisence_backpart[0] instanceof File) {
          formData.append('appli_dri_lisence_backpart', values.appli_dri_lisence_backpart[0]);
        }
    
        Object.entries(values).forEach(([key, value]) => {
          if (key !== 'UAE_DL_front' && key !== 'UAE_DL_Back' && key !== 'appli_dri_lisence_frontpart' && key !== 'appli_dri_lisence_backpart') {
            if (typeof value === 'string' || typeof value === 'number') {
              formData.append(key, value);
            }
          }
        });

        const data = await updateApplicantLicenseInfo({ data: formData, id });

        if(data?.data) {
          resetForm();
          handleNext();
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      setInitialValues({
        is_agree: data?.is_agree ? data?.is_agree : false,
        submissionid: data?.submissionid ? data?.submissionid : "",
        UAE_DL_Front: data?.UAE_DL_Front ? data?.UAE_DL_Front : "",
        UAE_DL_Back: data?.UAE_DL_Back ? data?.UAE_DL_Back : "",
        appli_dri_number: data?.appli_dri_number ? data?.appli_dri_number : "",
        appli_dri_expiry: data?.appli_dri_expiry ? data?.appli_dri_expiry : "",
        have_uae_licence: data?.have_uae_licence ? data?.have_uae_licence : "",
        UAE_Resident_Visa_No: data?.UAE_Resident_Visa_No ? data?.UAE_Resident_Visa_No : "",
        UAE_License_No: data?.UAE_License_No ? data?.UAE_License_No : "",
        SIM_No: data?.SIM_No ? data?.SIM_No : "",
        appli_dri_lisence_frontpart: data?.appli_dri_lisence_frontpart ? data?.appli_dri_lisence_frontpart : "",
        appli_dri_lisence_backpart: data?.appli_dri_lisence_backpart ? data?.appli_dri_lisence_backpart : ""
      })
    }, [data])

    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">License Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Provide details of your license and residency permit</p>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={jobApplyLicenseSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, values, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className={`py-5 ${data?.position_id !== 50 ? "border-none pb-0" : "border-b border-[#EAECF0]"} grid gap-6 grid-cols-1 md:grid-cols-3`}>
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

                {data?.position_id === 50 && (
                  <>
                    <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                      <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Driving license (home country)</h4>

                      <div className="col-span-2">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                          <JobPlaceInputField 
                            errors={errors}
                            touched={touched}
                            label="License number" 
                            name="appli_dri_number" 
                            placeholder="e.g 789-908-999" 
                          />

                          <JobPlaceDateField 
                            errors={errors}
                            pervDate={false}
                            touched={touched}
                            label="Expiry date" 
                            name="appli_dri_expiry"
                            value={values?.appli_dri_expiry}
                            handleSelect={(date) => setFieldValue("appli_dri_expiry", date)}
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
                              value={values.have_uae_licence}
                              handleSelect={(value) => setFieldValue("have_uae_licence", value)}
                              items={[
                                  {id: "1", name: "yes", value: "yes", label: "Yes"},
                                  {id: "2", name: "no", value: "no", label: "No"}
                              ]}
                          />

                          <JobPlaceInputField 
                            errors={errors}
                            touched={touched}
                            name="UAE_License_No" 
                            label="UAE license number" 
                            placeholder="E.g. 670-9876" 
                          />

                          <JobPlaceInputField 
                            errors={errors}
                            touched={touched}
                            placeholder="Select" 
                            name="UAE_Resident_Visa_No" 
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
                          <DragAndDrop 
                            errors={errors} 
                            touched={touched}  
                            label="Driving license front" 
                            name="appli_dri_lisence_frontpart" 
                            value={values.appli_dri_lisence_frontpart}
                            handleSelectFile={(file) => setFieldValue("appli_dri_lisence_frontpart", file)}
                          />

                          <DragAndDrop 
                            errors={errors} 
                            touched={touched}  
                            label="Driving license back" 
                            name="appli_dri_lisence_backpart" 
                            value={values.appli_dri_lisence_backpart}
                            handleSelectFile={(file) => setFieldValue("appli_dri_lisence_backpart", file)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                      <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">UAE DL (optional)</h4>

                      <div className="col-span-2">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                          <DragAndDrop 
                            errors={errors} 
                            touched={touched}  
                            name="UAE_DL_Front" 
                            label="UAE DL front"
                            value={values.UAE_DL_Front}
                            handleSelectFile={(file) => setFieldValue("UAE_DL_Front", file)} 
                          />

                          <DragAndDrop 
                            errors={errors} 
                            touched={touched} 
                            label="UAE DL Back" 
                            name="UAE_DL_Back" 
                            value={values.UAE_DL_Back}
                            handleSelectFile={(file) => setFieldValue("UAE_DL_Back", file)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">

                  <div className="col-span-3">
                    <div className="col-span-1 md:col-span-2 text-end">
                        <div>
                          <input 
                            type="checkbox" 
                            name="is_agree" 
                            value={values.is_agree} 
                            checked={values.is_agree} 
                            className="accent-[#1278BC]" 
                            onChange={() => setIsOpen(true)} 
                          />

                          <label className="ml-2 text-base text-[#667085]">I Accept the <a href="/" className="text-[#1278BC]">Terms and Condition</a> of the Company</label>
                        </div>

                        <ErrorMessage name="is_agree" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>
                </div>


                <AcceptTermsModal 
                  isOpen={isOpen} 
                  onClose={() => setIsOpen(false)} 
                  handleAccept={() => {
                    setFieldValue("is_agree", true);
                    setIsOpen(false);
                  }}
                />

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