import { useState } from "react";
import { Form, Formik } from "formik";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { jobApplyBasicSchema } from "../../schema/jobPlaceSchema";
import JobPlaceNumberInputField from "../inputs/JobPlaceNumberInputField";
import JobPlaceSelectInputField from "../inputs/JobPlaceSelectInputField";
import { countries, countryCode } from "../../assets/staticData/countryInfo";

const initialValues = {
  first_name: "",
  last_name: "",
  mother_name: "",
  gender: "",
  date_of_birth: "",
  nationality: "",
  email: "",
  contact_number: "",
  whatsapp_number: "",
  position_id: "",
  applicant_image: ""
};

const BasicInfoForm = ({ handleNext }) => {
  const [wp_code, setWpCode] = useState("BD");

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
            {({ handleSubmit, values, touched, errors, setFieldValue }) => (
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
                        value={values.gender}
                        handleSelect={(value) => setFieldValue("gender", value)}
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
                      <JobPlaceDateField 
                        errors={errors} 
                        touched={touched} 
                        name="date_of_birth" 
                        label="Date of birth" 
                        handleSelect={(date) => setFieldValue("date_of_birth", date)}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Country</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceSelectInputField 
                        errors={errors} 
                        touched={touched}
                        keyValue="name"
                        items={countries} 
                        name="nationality" 
                        label="Nationality" 
                        value={values.nationality}
                        placeholder="Select Nationality" 
                        handleSelect={(item) => setFieldValue("nationality", item.name)}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Contact Info *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <JobPlaceInputField 
                        name="email" 
                        label="Email" 
                        errors={errors} 
                        touched={touched} 
                        placeholder="Email" 
                      />

                      <div></div>

                      <JobPlaceNumberInputField 
                        errors={errors} 
                        keyValue="shortName"
                        touched={touched} 
                        name="contact_number" 
                        label="Phone number" 
                        changeDisable={true}
                        placeholder="+1 (555) 000-0000" 
                        items={countryCode}
                        selectCountryCode={countryCode?.find(item => item?.name === values?.nationality)?.shortName}
                      />

                      <JobPlaceNumberInputField 
                        errors={errors} 
                        required={false} 
                        keyValue="name"
                        touched={touched} 
                        items={countryCode}
                        name="whatsapp_number" 
                        placeholder="+1 (555) 000-0000" 
                        label="WhatsApp number (optional)" 
                        handleSelect={(item) => setWpCode(item.shortName)}
                        selectCountryCode={countryCode?.find(item => item?.shortName === wp_code)?.shortName}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Application *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">

                      <JobPlaceSelectInputField 
                        errors={errors} 
                        touched={touched}
                        keyValue="name"
                        name="position_id" 
                        label="Job position" 
                        placeholder="Select position" 
                        handleSelect={(item) => setFieldValue("position_id", item.id)}
                        items={[{id: "1", name: "Rider"}, {id: "3", name: "Freelancer"}]} 
                        value={[{id: "1", name: "Rider"}, {id: "3", name: "Freelancer"}].find(item => item.id === values.position_id)?.name}
                      />
                    </div>
                  </div>
                </div>

                <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                  <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">Applicant’s Photo *</h4>

                  <div className="col-span-2">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <DragAndDrop 
                        errors={errors} 
                        touched={touched}
                        label="Add photo" 
                        name="applicant_image" 
                      />
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