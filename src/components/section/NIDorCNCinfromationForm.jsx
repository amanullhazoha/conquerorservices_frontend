import { Form, Formik } from "formik";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import { useState, useEffect, useCallback } from "react";
import JobPlaceInputNID from "../inputs/JobPlaceInputNID";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { religion } from "../../assets/staticData/countryInfo";
import { jobApplyNidOrCnicSchema } from "../../schema/jobPlaceSchema";
import JobPlaceSelectInputField from "../inputs/JobPlaceSelectInputField";
import { useUpdateApplicantNIDorCNICinfoMutation } from "../../slice/jobPlacePage.slice";
import {
  getCitiesByState,
  getStatesByCountry,
  getPoliceStationsByCity,
  getPostOfficeByPoliceStations,
} from "../../lib/addressFind";

const INITIALVALUES = {
  zip: "",
  city: "",
  religion: "",
  province: "",
  reference: "",
  passportno: "",
  emiratesid: "",
  homeaddrss: "",
  uaeresident: "",
  nationality: "",
  father_name: "",
  policeStation: "",
  nid_cnic_back: "",
  martialstatus: "",
  date_of_expiry: "",
  nid_cnic_front: "",
  nidorcnicnumber: "",
  emirates_expiry: "",
  applicant_resume: "",
  applicant_passport: "",
};

const NIDorCNCinfromationForm = ({ id, data, handleNext, handlePrevious }) => {
  let count = 0;
  const [initialValues, setInitialValues] = useState(INITIALVALUES);

  const [updateApplicantNIDorCnicInfo, { isLoading, isError }] =
    useUpdateApplicantNIDorCNICinfoMutation();

  const handleSetLocalStorageValue = useCallback(
    (values) => {
      count = count + 1;

      if (count > 3) {
        localStorage.setItem("applicantNidCnicInfo", JSON.stringify(values));
      }
    },
    [initialValues]
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      if (values.nid_cnic_front && values.nid_cnic_front[0] instanceof File) {
        formData.append("nid_cnic_front", values.nid_cnic_front[0]);
      }

      if (values.nid_cnic_back && values.nid_cnic_back[0] instanceof File) {
        formData.append("nid_cnic_back", values.nid_cnic_back[0]);
      }

      if (
        values.applicant_passport &&
        values.applicant_passport[0] instanceof File
      ) {
        formData.append("applicant_passport", values.applicant_passport[0]);
      }

      if (
        values.applicant_resume &&
        values.applicant_resume[0] instanceof File
      ) {
        formData.append("applicant_resume", values.applicant_resume[0]);
      } else {
        formData.append("applicant_resume", values.applicant_resume);
      }

      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "nid_cnic_front" &&
          key !== "nid_cnic_back" &&
          key !== "applicant_passport" &&
          key !== "applicant_resume"
        ) {
          if (typeof value === "string" || typeof value === "number") {
            formData.append(key, value);
          }
        }
      });

      const data = await updateApplicantNIDorCnicInfo({ data: formData, id });

      if (data?.data) {
        resetForm();
        handleNext(data?.data?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("applicantBasicInfo");

    const storedValues = localStorage.getItem("applicantNidCnicInfo");

    if (storedValues) {
      const parseValues = JSON.parse(storedValues);

      setInitialValues({
        ...parseValues,
        nid_cnic_back: data?.nid_cnic_back ? data?.nid_cnic_back : "",
        nid_cnic_front: data?.nid_cnic_front ? data?.nid_cnic_front : "",
        applicant_resume: data?.applicant_resume ? data?.applicant_resume : "",
        applicant_passport: data?.applicant_passport
          ? data?.applicant_passport
          : "",
      });
    } else {
      setInitialValues({
        zip: data?.zip ? data?.zip : "",
        city: data?.city ? data?.city : "",
        spouse: data?.spouse ? data?.spouse : "",
        religion: data?.religion ? data?.religion : "",
        province: data?.province ? data?.province : "",
        reference: data?.reference ? data?.reference : "",
        passportno: data?.passportno ? data?.passportno : "",
        emiratesid: data?.emiratesid ? data?.emiratesid : "",
        homeaddrss: data?.homeaddrss ? data?.homeaddrss : "",
        uaeresident: data?.uaeresident ? data?.uaeresident : "",
        father_name: data?.father_name ? data?.father_name : "",
        nationality: data?.nationality ? data?.nationality : "",
        nid_cnic_back: data?.nid_cnic_back ? data?.nid_cnic_back : "",
        policeStation: data?.policeStation ? data?.policeStation : "",
        martialstatus: data?.martialstatus ? data?.martialstatus : "",
        date_of_expiry: data?.date_of_expiry ? data?.date_of_expiry : "",
        nid_cnic_front: data?.nid_cnic_front ? data?.nid_cnic_front : "",
        nidorcnicnumber: data?.nidorcnicnumber ? data?.nidorcnicnumber : "",
        emirates_expiry: data?.emirates_expiry ? data?.emirates_expiry : "",
        applicant_resume: data?.applicant_resume ? data?.applicant_resume : "",
        applicant_passport: data?.applicant_passport
          ? data?.applicant_passport
          : "",
      });
    }
  }, [data]);

  return (
    <div className="flex-1 bg-white rounded-lg px-6 py-6">
      <div className="pb-5 border-b border-[#EAECF0]">
        <h3 className="text-lg font-semibold text-[#27303F]">
          NID / CNIC Information
        </h3>
        <p className="text-sm text-[#718096] max-md:hidden">
          Provide your National ID or Computerized National Identity Card
          details
        </p>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={jobApplyNidOrCnicSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, touched, errors, setFieldValue }) => {
          handleSetLocalStorageValue(values);

          return (
            <Form onSubmit={handleSubmit}>
              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Passport & Expiry Date
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                    <JobPlaceInputField
                      errors={errors}
                      touched={touched}
                      name="passportno"
                      label="Passport number"
                      placeholder="e.g 789-908-999"
                    />

                    <JobPlaceDateField
                      startYear={2}
                      errors={errors}
                      pervDate={false}
                      touched={touched}
                      label="Expiry date"
                      name="date_of_expiry"
                      value={values?.date_of_expiry}
                      handleSelect={(date) =>
                        setFieldValue("date_of_expiry", date)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Father Name
                </h4>

                <div className="col-span-2">
                  <div className="hidden gap-4 grid-cols-1 xl:grid-cols-2 md:grid">
                    <JobPlaceInputField
                      errors={errors}
                      onlyLetter={true}
                      touched={touched}
                      label="Full name"
                      name="father_name"
                      placeholder="Abdul Rehman"
                    />
                  </div>

                  <div className="hidden gap-4 grid-cols-1 xl:grid-cols-2 max-md:grid">
                    <JobPlaceInputField
                      errors={errors}
                      onlyLetter={true}
                      touched={touched}
                      label="Father Name"
                      name="father_name"
                      placeholder="Abdul Rehman"
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Identity Number
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                    <JobPlaceInputNID
                      errors={errors}
                      touched={touched}
                      label="NID / CNIC"
                      name="nidorcnicnumber"
                      country={data?.nationality}
                      handleChange={(e) => {
                        let value = e.target.value;

                        if (
                          data?.nationality === "Pakistan" &&
                          value.length > 5 &&
                          value[5] !== "-"
                        ) {
                          value = value.slice(0, 5) + "-" + value.slice(5);
                        }

                        if (
                          data?.nationality === "Pakistan" &&
                          value.length > 13 &&
                          value[14] !== "-"
                        ) {
                          value = value.slice(0, 13) + "-" + value.slice(14);
                        }

                        setFieldValue("nidorcnicnumber", value);
                      }}
                      value={values?.nidorcnicnumber}
                      placeholder="e.g 789-908-999"
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Marital Status
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                    <div className="col-span-2">
                      <JobPlaceRadioInput
                        name="martialstatus"
                        label="Marital status"
                        value={values.martialstatus}
                        handleSelect={(value) =>
                          setFieldValue("martialstatus", value)
                        }
                        items={[
                          {
                            id: "1",
                            name: "single",
                            value: "single",
                            label: "Single",
                          },
                          {
                            id: "2",
                            name: "married",
                            value: "married",
                            label: "Married",
                          },
                          {
                            id: "3",
                            name: "divorced",
                            value: "divorced",
                            label: "Divorced",
                          },
                        ]}
                      />
                    </div>

                    {values.martialstatus === "married" && (
                      <JobPlaceInputField
                        name="spouse"
                        errors={errors}
                        onlyLetter={true}
                        touched={touched}
                        label="Spouse Name"
                        placeholder="Spouse name"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Residency
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                    <JobPlaceRadioInput
                      name="uaeresident"
                      label="UAE resident"
                      value={values.uaeresident}
                      handleSelect={(value) =>
                        setFieldValue("uaeresident", value)
                      }
                      items={[
                        { id: "1", name: "yes", value: "yes", label: "Yes" },
                        { id: "2", name: "no", value: "no", label: "No" },
                      ]}
                    />

                    <div></div>

                    {values.uaeresident === "yes" && (
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
                          value={values?.emirates_expiry}
                          handleSelect={(date) =>
                            setFieldValue("emirates_expiry", date)
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Religion
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 xl:grid-cols-1">
                    <JobPlaceSelectInputField
                      errors={errors}
                      name="religion"
                      keyValue="name"
                      touched={touched}
                      value={values.religion}
                      placeholder="Select"
                      label="Religion"
                      items={religion}
                      handleSelect={(item) =>
                        setFieldValue("religion", item.name)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Home Country Address
                </h4>

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
                      items={getStatesByCountry(data?.nationality)}
                      handleSelect={(item) =>
                        setFieldValue("province", item.name)
                      }
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

                    <JobPlaceInputField
                      errors={errors}
                      touched={touched}
                      name="policeStation"
                      label="Police station"
                      placeholder="Enter police station"
                    />

                    <JobPlaceInputField
                      errors={errors}
                      touched={touched}
                      name="zip"
                      label="Post office"
                      placeholder="Enter post office"
                    />

                    {/* <JobPlaceSelectInputField 
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
                        /> */}

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
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Passport Images
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <DragAndDrop
                      errors={errors}
                      touched={touched}
                      label="Front page"
                      name="applicant_passport"
                      value={values.applicant_passport}
                      handleSelectFile={(file) =>
                        setFieldValue("applicant_passport", file)
                      }
                    />

                    <DragAndDrop
                      errors={errors}
                      required={false}
                      touched={touched}
                      name="applicant_resume"
                      label="Signature page (optional)"
                      value={values.applicant_resume}
                      handleSelectFile={(file) =>
                        setFieldValue("applicant_resume", file)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  NID / CNIC Images
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <DragAndDrop
                      errors={errors}
                      touched={touched}
                      name="nid_cnic_front"
                      label="NID / CNIC front"
                      value={values.nid_cnic_front}
                      handleSelectFile={(file) =>
                        setFieldValue("nid_cnic_front", file)
                      }
                    />

                    <DragAndDrop
                      errors={errors}
                      touched={touched}
                      name="nid_cnic_back"
                      label="NID / CNIC Back"
                      value={values.nid_cnic_back}
                      handleSelectFile={(file) =>
                        setFieldValue("nid_cnic_back", file)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <JobPlaceBtn handlePrevious={handlePrevious} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NIDorCNCinfromationForm;
