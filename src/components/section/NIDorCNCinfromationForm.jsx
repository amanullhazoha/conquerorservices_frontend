import { Form, Formik } from "formik";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { religion } from "../../assets/staticData/countryInfo";
import JobPlaceSelectInputField from "../inputs/JobPlaceSelectInputField";
import { jobApplyNidOrCnicSchema } from "../../schema/jobPlaceSchema";
import { useUpdateApplicantNIDorCNICinfoMutation } from "../../slice/jobPlacePage.slice";
import { getStatesByCountry, getCitiesByState, getPoliceStationsByCity, getPostOfficeByPoliceStations } from "../../lib/addressFind";

const initialValues = {
  zip: "",
  city: "",
  religion: "",
  province: "",
  passportno: "",
  emiratesid: "",
  homeaddrss: "",
  uaeresident: "",
  father_name: "",
  policeStation: "",
  maritalstatus: "",
  date_of_expiry: "",
  nidofcnicnumber: "",
  emirates_expiry: "",
  applicant_resume: "",
  reference: "",
  applicant_passport: "",
  nid_cnic_back: "",
  nid_cnic_front: "",
};

const NIDorCNCinfromationForm = ({ id, handleNext, handlePrevious }) => {
    const [updateApplicantNIDorCnicInfo, { isLoading, isError }] = useUpdateApplicantNIDorCNICinfoMutation(id)

    const handleSubmit = async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        if (values.nid_cnic_front && values.nid_cnic_back && values.applicant_passport) {
          formData.append('nid_cnic_front', values.nid_cnic_front[0]);
          formData.append('nid_cnic_back', values.nid_cnic_back[0]);
          formData.append('applicant_passport', values.applicant_passport[0]);
        }

        if(values.applicant_resume) {
          formData.append('applicant_resume', values.applicant_resume[0]);
        }

        Object.entries(values).forEach(([key, value]) => {
          if (key !== "nid_cnic_front" && key !== "nid_cnic_back" && key !== "applicant_passport" && key !== "applicant_resume") {
            formData.append(key, value);
          }
        });

        const data = await updateApplicantNIDorCnicInfo(formData);

        if(data?.data) {
          resetForm();
          handleNext(data?.data?.id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">NID / CNIC Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Provide your National ID or Computerized National Identity Card details</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={jobApplyNidOrCnicSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, values, touched, errors, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Passport & Expiry Date</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors} 
                        touched={touched}  
                        name="passportno" 
                        label="Passport number" 
                        placeholder="e.g 789-908-999" 
                      />

                      <JobPlaceDateField  
                        errors={errors} 
                        pervDate={false}
                        touched={touched}  
                        label="Expiry date" 
                        name="date_of_expiry" 
                        handleSelect={(date) => setFieldValue("date_of_expiry", date)}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Father Name</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors} 
                        touched={touched}
                        label="Full name" 
                        name="father_name" 
                        placeholder="Abdul Rehman" 
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Identity Number</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors} 
                        touched={touched}
                        label="NID / CNIC" 
                        name="nidofcnicnumber" 
                        placeholder="e.g 789-908-999" 
                      />
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
                        value={values.maritalstatus}
                        handleSelect={(value) => setFieldValue("maritalstatus", value)}
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
                        value={values.uaeresidient}
                        handleSelect={(value) => setFieldValue("uaeresidient", value)}
                        items={[
                          {id: "1", name: "yes", value: "yes", label: "Yes"},
                          {id: "2", name: "no", value: "no", label: "No"}
                        ]} 
                      />

                      <div></div>

                      {values.uaeresidient === "yes" && (
                        <>
                          <JobPlaceInputField 
                            errors={errors}
                            touched={touched}
                            name="emiratesid" 
                            label="Emirates ID" 
                            placeholder="e.g 789-908-999" 
                          />
                        
                          <JobPlaceDateField 
                            errors={errors}
                            pervDate={false}
                            touched={touched}
                            label="Expiry date" 
                            name="emirates_expiry" 
                            handleSelect={(date) => setFieldValue("emirates_expiry", date)}
                          />
                        </>
                      )}

                  </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Religion</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
                      <JobPlaceSelectInputField 
                        errors={errors}
                        name="religion" 
                        keyValue="name"
                        touched={touched}
                        value={values.religion}
                        placeholder="Select" 
                        label="Religion"
                        items={religion}
                        handleSelect={(item) => setFieldValue("religion", item.name)}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Home Country Address</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="col-span-1 md:col-span-2">
                        <JobPlaceInputField 
                          errors={errors}
                          touched={touched}
                          name="homeaddrss" 
                          label="Permanent address" 
                          placeholder="Enter address" 
                        />
                      </div>

                      <JobPlaceSelectInputField 
                        errors={errors}
                        name="province" 
                        keyValue="name"
                        touched={touched}
                        value={values.province}
                        placeholder="Select" 
                        label="State / Province" 
                        items={getStatesByCountry("bangladesh")}
                        handleSelect={(item) => setFieldValue("province", item.name)}
                      />

                      <JobPlaceSelectInputField 
                        errors={errors}
                        name="city" 
                        keyValue="name"
                        touched={touched}
                        value={values.city}
                        placeholder="Select" 
                        label="City / District"
                        items={getCitiesByState(values.province)}
                        handleSelect={(item) => setFieldValue("city", item.name)}
                      />

                      <JobPlaceSelectInputField 
                        errors={errors}
                        keyValue="name"
                        touched={touched}
                        name="policeStation" 
                        placeholder="Select" 
                        label="Police station" 
                        value={values.policeStation}
                        items={getPoliceStationsByCity(values.city)}
                        handleSelect={(item) => setFieldValue("policeStation", item.name)}
                      />

                      <JobPlaceSelectInputField 
                        errors={errors}
                        keyValue="name"
                        touched={touched}
                        name="zip" 
                        placeholder="Select" 
                        label="Post office"
                        value={values.zip}
                        handleSelect={(item) => setFieldValue("zip", item.name)}
                        items={getPostOfficeByPoliceStations(values.policeStation)}
                      />

                      <div className="col-span-1 md:col-span-2">
                        <JobPlaceInputField 
                          errors={errors}
                          touched={touched}
                          required={false} 
                          name="reference" 
                          placeholder="Reference" 
                          label="Reference number (optional)" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Passport Images</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop 
                        errors={errors} 
                        touched={touched} 
                        label="Front page" 
                        name="applicant_passport" 
                        handleSelectFile={(file) => setFieldValue("applicant_passport", file)} 
                      />

                      <DragAndDrop 
                        errors={errors} 
                        required={false} 
                        touched={touched} 
                        name="applicant_resume" 
                        label="Signature page (optional)" 
                        handleSelectFile={(file) => setFieldValue("applicant_resume", file)} 
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">NID / CNIC Images</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop 
                        errors={errors} 
                        touched={touched}  
                        name="nid_cnic_front" 
                        label="NID / CNIC front" 
                        handleSelectFile={(file) => setFieldValue("nid_cnic_front", file)} 
                      />

                      <DragAndDrop 
                        errors={errors} 
                        touched={touched} 
                        name="nid_cnic_back" 
                        label="NID / CNIC Back" 
                        handleSelectFile={(file) => setFieldValue("nid_cnic_back", file)} 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <JobPlaceBtn handlePrevious={handlePrevious} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
    );
}
 
export default NIDorCNCinfromationForm;