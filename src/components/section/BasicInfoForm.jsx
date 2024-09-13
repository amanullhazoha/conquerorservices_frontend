import { Form, Formik } from "formik";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { jobApplyBasicSchema } from "../../schema/jobPlaceSchema";
import JobPlaceSelectInputField from "../inputs/JobPlaceSelectInputField";

const initialValues = {
  first_name: "",
  last_name: "",
  mother_name: "",
  gender: "",
  date_of_birth: "",
  nationality: "",
  email: "",
  phone_number: "",
  whatsapp_number: "",
  job_position: "",
  applicant_photo: null
};

const BasicInfoForm = ({ handleNext }) => {
    return (
        <div className="flex-1 bg-white rounded-lg px-6 py-6">
          <div className="pb-5 border-b border-[#EAECF0]">
            <h3 className="text-lg font-semibold text-[#27303F]">Basic Information</h3>
            <p className="text-sm text-[#718096] max-md:hidden">Please provide your basic information below to help us serve you better</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={jobApplyBasicSchema}
            // onSubmit={(values) => console.log(values)}
            onSubmit={(values) => handleNext()}
          >
            {({ handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Name</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        errors={errors} 
                        name="first_name" 
                        touched={touched} 
                        label="First name" 
                        placeholder="Muhammad" 
                      />

                      <JobPlaceInputField errors={errors} touched={touched} label="Last name" placeholder="Abdullah" name="last_name" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Mother Name</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField errors={errors} touched={touched} label="Full name" placeholder="Saima" name="mother_name" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Gender</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
                      <JobPlaceRadioInput 
                        name="gender" 
                        label="Gender" 
                        items={[
                          {id: "1", name: "male", value: "male", label: "Male"},
                          {id: "2", name: "female", value: "female", label: "Female"},
                          {id: "3", name: "other", value: "other", label: "Other"}
                        ]} 
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Date of Birth</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField errors={errors} touched={touched} label="Date of birth" placeholder="Date of birth" name="date_of_birth" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Country</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceSelectInputField label="Nationality" placeholder="Select Nationality" name="nationality" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Contact Info *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField errors={errors} touched={touched} label="Email" placeholder="Email" name="email" />

                      <div></div>

                      <JobPlaceInputField errors={errors} touched={touched} label="Phone number" placeholder="+1 (555) 000-0000" name="phone_number" />
                      <JobPlaceInputField errors={errors} touched={touched} label="WhatsApp number (optional)" placeholder="+1 (555) 000-0000" name="whatsapp_number" required={false} />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Application *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField errors={errors} touched={touched} label="Job position" placeholder="Saima" name="job_position" />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Applicant’s Photo *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop label="Add photo" name="applicant_photo" />
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <JobPlaceBtn previous={false} handleNext={handleNext} />
                </div>
              </Form>
            )}
          </Formik>
        </div>
    );
}
 
export default BasicInfoForm;