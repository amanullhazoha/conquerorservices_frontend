import DragAndDrop from "../inputs/DragAndDrop";
import { useNavigate } from "react-router-dom";
import { generateSubmissionId } from "../../lib";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import { ErrorMessage, Form, Formik } from "formik";
import JobSubmissionID from "../inputs/JobSubmissonID";
import { useState, useEffect, useCallback } from "react";
import AcceptTermsModal from "../modals/AcceptTermsModal";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import JobPlaceInputUaeNo from "../inputs/JobPlaceInputUaeNo";
import { countryCode } from "../../assets/staticData/countryInfo";
import { jobApplyLicenseSchema } from "../../schema/jobPlaceSchema";
import JobPlaceNumberInputField from "../inputs/JobPlaceNumberInputField";
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
  position_id: "",
  appli_dri_lisence_frontpart: "",
  appli_dri_lisence_backpart: "",
  ref1_name: "",
  ref1_email: "",
  ref1_phone: "",
  ref1_country: "",
  ref1_address: "",
  ref2_name: "",
  ref2_email: "",
  ref2_phone: "",
  ref2_country: "",
  ref2_address: "",
};

const LicenseInfoForm = ({ id, data, handleNext, handlePrevious }) => {
  let count = 0;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ref1Code, setRef1Code] = useState(null);
  const [ref2Code, setRef2Code] = useState(null);
  const [initialValues, setInitialValues] = useState(INITIALVALUES);

  const [updateApplicantLicenseInfo, { isLoading, isError }] =
    useUpdateApplicantLicenseInfoMutation();

  const handleSetLocalStorageValue = useCallback(
    (values) => {
      count = count + 1;

      if (count > 2) {
        localStorage.setItem("applicantLicenseInfo", JSON.stringify(values));
      }
    },
    [initialValues]
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      if (values.UAE_DL_Front && values.UAE_DL_Front[0] instanceof File) {
        formData.append("UAE_DL_Front", values.UAE_DL_Front[0]);
      } else {
        formData.append("UAE_DL_Front", values.UAE_DL_Front);
      }

      if (values.UAE_DL_Back && values.UAE_DL_Back[0] instanceof File) {
        formData.append("UAE_DL_Back", values.UAE_DL_Back[0]);
      } else {
        formData.append("UAE_DL_Back", values.UAE_DL_Back);
      }

      if (
        values.appli_dri_lisence_frontpart &&
        values.appli_dri_lisence_frontpart[0] instanceof File
      ) {
        formData.append(
          "appli_dri_lisence_frontpart",
          values.appli_dri_lisence_frontpart[0]
        );
      } else {
        formData.append(
          "appli_dri_lisence_frontpart",
          values.appli_dri_lisence_frontpart
        );
      }

      if (
        values.appli_dri_lisence_backpart &&
        values.appli_dri_lisence_backpart[0] instanceof File
      ) {
        formData.append(
          "appli_dri_lisence_backpart",
          values.appli_dri_lisence_backpart[0]
        );
      } else {
        formData.append(
          "appli_dri_lisence_backpart",
          values.appli_dri_lisence_backpart
        );
      }

      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "UAE_DL_Front" &&
          key !== "UAE_DL_Back" &&
          key !== "appli_dri_lisence_frontpart" &&
          key !== "appli_dri_lisence_backpart"
        ) {
          if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
          ) {
            formData.append(key, value);
          }
        }
      });

      const data = await updateApplicantLicenseInfo({ data: formData, id });

      if (data?.data) {
        resetForm();
        handleNext();
        navigate("/career");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("applicantNidCnicInfo");

    const storedValues = localStorage.getItem("applicantLicenseInfo");

    if (storedValues) {
      const parseValues = JSON.parse(storedValues);

      setInitialValues({
        ...parseValues,
        UAE_DL_Back: data?.UAE_DL_Back ? data?.UAE_DL_Back : "",
        UAE_DL_Front: data?.UAE_DL_Front ? data?.UAE_DL_Front : "",
        appli_dri_lisence_frontpart: data?.appli_dri_lisence_frontpart
          ? data?.appli_dri_lisence_frontpart
          : "",
        appli_dri_lisence_backpart: data?.appli_dri_lisence_backpart
          ? data?.appli_dri_lisence_backpart
          : "",
      });
    } else {
      setInitialValues({
        position_id: data?.position_id ? data?.position_id : "",
        is_agree: data?.is_agree ? data?.is_agree : false,
        submissionid: data?.submissionid
          ? data?.submissionid
          : generateSubmissionId(data?.date_of_birth),
        UAE_DL_Front: data?.UAE_DL_Front ? data?.UAE_DL_Front : "",
        UAE_DL_Back: data?.UAE_DL_Back ? data?.UAE_DL_Back : "",
        appli_dri_number: data?.appli_dri_number ? data?.appli_dri_number : "",
        appli_dri_expiry: data?.appli_dri_expiry ? data?.appli_dri_expiry : "",
        have_uae_licence: data?.have_uae_licence ? data?.have_uae_licence : "",
        UAE_Resident_Visa_No: data?.UAE_Resident_Visa_No
          ? data?.UAE_Resident_Visa_No
          : "",
        UAE_License_No: data?.UAE_License_No ? data?.UAE_License_No : "",
        SIM_No: data?.SIM_No ? data?.SIM_No : "",
        appli_dri_lisence_frontpart: data?.appli_dri_lisence_frontpart
          ? data?.appli_dri_lisence_frontpart
          : "",
        appli_dri_lisence_backpart: data?.appli_dri_lisence_backpart
          ? data?.appli_dri_lisence_backpart
          : "",
        ref1_name: data?.ref1_name ? data?.ref1_name : "",
        ref1_email: data?.ref1_email ? data?.ref1_email : "",
        ref1_phone: data?.ref1_phone ? data?.ref1_phone : "",
        ref1_country: data?.ref1_country ? data?.ref1_country : "",
        ref1_address: data?.ref1_address ? data?.ref1_address : "",
        ref2_name: data?.ref2_name ? data?.ref2_name : "",
        ref2_email: data?.ref2_email ? data?.ref2_email : "",
        ref2_phone: data?.ref2_phone ? data?.ref2_phone : "",
        ref2_country: data?.ref2_country ? data?.ref2_country : "",
        ref2_address: data?.ref2_address ? data?.ref2_address : "",
      });
    }
  }, [data]);

  return (
    <div className="flex-1 bg-white rounded-lg px-6 py-6">
      <div className="pb-5 border-b border-[#EAECF0]">
        <h3 className="text-lg font-semibold text-[#27303F]">
          {/* License Information */}
          {data?.position_id === "52" || data?.position_id === 52
            ? "Other Information"
            : "License Information"}
        </h3>
        <p className="text-sm text-[#718096] max-md:hidden">
          {/* Provide details of your license and residency permit */}
          {data?.position_id === "52" || data?.position_id === 52
            ? "Provide details of your 2 Reference"
            : "Provide details of your license and residency permit"}
        </p>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={jobApplyLicenseSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, errors, touched, setFieldValue }) => {
          handleSetLocalStorageValue(values);

          return (
            <Form onSubmit={handleSubmit}>
              <div
                className={`py-5 ${
                  data?.position_id !== 50
                    ? "border-none pb-0"
                    : "border-b border-[#EAECF0]"
                } grid gap-6 max-md:gap-0.5 grid-cols-1 md:grid-cols-3`}
              >
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1">
                  Submission ID
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <JobSubmissionID
                      errors={errors}
                      touched={touched}
                      name="submissionid"
                      label="Submission ID"
                      placeholder="890-8764"
                      value={values?.submissionid}
                    />
                  </div>
                </div>
              </div>

              {data?.position_id === 50 && (
                <>
                  <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                      Driving license (home country)
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                        <JobPlaceInputField
                          type="number"
                          errors={errors}
                          required={false}
                          touched={touched}
                          label="License number"
                          name="appli_dri_number"
                          placeholder="e.g 789-908-999"
                        />

                        <JobPlaceDateField
                          errors={errors}
                          required={false}
                          pervDate={false}
                          touched={touched}
                          label="Expiry date"
                          name="appli_dri_expiry"
                          value={values?.appli_dri_expiry}
                          handleSelect={(date) =>
                            setFieldValue("appli_dri_expiry", date)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                      Do you have UAE license
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                        <JobPlaceRadioInput
                          required={false}
                          label="UAE license"
                          name="have_uae_licence"
                          value={values.have_uae_licence}
                          handleSelect={(value) =>
                            setFieldValue("have_uae_licence", value)
                          }
                          items={[
                            {
                              id: "1",
                              name: "yes",
                              value: "yes",
                              label: "Yes",
                            },
                            { id: "2", name: "no", value: "no", label: "No" },
                          ]}
                        />

                        {values.have_uae_licence === "yes" && (
                          <>
                            <JobPlaceInputUaeNo
                              errors={errors}
                              touched={touched}
                              name="UAE_License_No"
                              label="UAE license number"
                              placeholder="E.g. 670-9876"
                              value={values?.UAE_License_No}
                              handleChange={(e) => {
                                let value = e.target.value;

                                setFieldValue("UAE_License_No", value);
                              }}
                            />

                            <JobPlaceInputField
                              type="number"
                              errors={errors}
                              touched={touched}
                              placeholder="Select"
                              name="UAE_Resident_Visa_No"
                              label="UAE resident visa number"
                            />

                            <JobPlaceInputField
                              type="number"
                              errors={errors}
                              touched={touched}
                              name="SIM_No"
                              required={false}
                              placeholder="Select"
                              label="Sim number (optional)"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                      Driving license images
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <DragAndDrop
                          errors={errors}
                          required={false}
                          touched={touched}
                          label="Driving license front"
                          name="appli_dri_lisence_frontpart"
                          value={values.appli_dri_lisence_frontpart}
                          handleSelectFile={(file) =>
                            setFieldValue("appli_dri_lisence_frontpart", file)
                          }
                        />

                        <DragAndDrop
                          errors={errors}
                          required={false}
                          touched={touched}
                          label="Driving license back"
                          name="appli_dri_lisence_backpart"
                          value={values.appli_dri_lisence_backpart}
                          handleSelectFile={(file) =>
                            setFieldValue("appli_dri_lisence_backpart", file)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                      UAE DL (optional)
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <DragAndDrop
                          errors={errors}
                          required={false}
                          touched={touched}
                          name="UAE_DL_Front"
                          label="UAE DL front"
                          value={values.UAE_DL_Front}
                          handleSelectFile={(file) =>
                            setFieldValue("UAE_DL_Front", file)
                          }
                        />

                        <DragAndDrop
                          errors={errors}
                          required={false}
                          touched={touched}
                          label="UAE DL Back"
                          name="UAE_DL_Back"
                          value={values.UAE_DL_Back}
                          handleSelectFile={(file) =>
                            setFieldValue("UAE_DL_Back", file)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {data?.position_id === 52 && (
                <>
                  <div className="py-5 border-y mt-5 border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1">
                      From the relatives
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          name="ref1_name"
                          label="Name"
                          required={false}
                          placeholder="Enter name"
                        />

                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          type="email"
                          name="ref1_email"
                          label="Email"
                          required={false}
                          placeholder="Enter email"
                        />

                        <JobPlaceNumberInputField
                          type="number"
                          errors={errors}
                          required={false}
                          keyValue="name"
                          touched={touched}
                          items={countryCode}
                          name="ref1_phone"
                          placeholder="000000000"
                          label="Phone number"
                          value={values?.ref1_phone}
                          setFieldValue={setFieldValue}
                          handleSelect={(item) => setRef1Code(item.shortName)}
                          selectCountryCode={
                            ref1Code
                              ? countryCode?.find(
                                  (item) => item?.shortName === ref1Code
                                )?.shortName
                              : countryCode?.find(
                                  (item) => item?.name === "Pakistan"
                                )?.shortName
                          }
                        />

                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          name="ref1_country"
                          label="Country"
                          required={false}
                          placeholder="Enter country"
                        />

                        <div className="col-span-1 md:col-span-2">
                          <JobPlaceInputField
                            errors={errors}
                            touched={touched}
                            required={false}
                            name="ref1_address"
                            placeholder="Enter address"
                            label="Address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                    <h4 className="text-sm font-semibold text-[#27303F] col-span-1">
                      Outside the Family
                    </h4>

                    <div className="col-span-2">
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          name="ref2_name"
                          label="Name"
                          required={false}
                          placeholder="Enter name"
                        />

                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          type="email"
                          name="ref2_email"
                          label="Email"
                          required={false}
                          placeholder="Enter email"
                        />

                        <JobPlaceNumberInputField
                          type="number"
                          errors={errors}
                          required={false}
                          keyValue="name"
                          touched={touched}
                          items={countryCode}
                          name="ref2_phone"
                          placeholder="000000000"
                          label="Phone number"
                          value={values?.ref2_phone}
                          setFieldValue={setFieldValue}
                          handleSelect={(item) => setRef2Code(item.shortName)}
                          selectCountryCode={
                            ref2Code
                              ? countryCode?.find(
                                  (item) => item?.shortName === ref2Code
                                )?.shortName
                              : countryCode?.find(
                                  (item) => item?.name === "Pakistan"
                                )?.shortName
                          }
                        />

                        <JobPlaceInputField
                          errors={errors}
                          touched={touched}
                          name="ref2_country"
                          label="Country"
                          required={false}
                          placeholder="Enter country"
                        />

                        <div className="col-span-1 md:col-span-2">
                          <JobPlaceInputField
                            errors={errors}
                            touched={touched}
                            required={false}
                            name="ref2_address"
                            placeholder="Enter address"
                            label="Address"
                          />
                        </div>
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

                      <label className="ml-2 text-base text-[#667085]">
                        I Accept the{" "}
                        <a href="/" className="text-[#1278BC]">
                          Terms and Condition
                        </a>{" "}
                        of the Company
                      </label>
                    </div>

                    <ErrorMessage
                      name="is_agree"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              <AcceptTermsModal
                isOpen={isOpen}
                position={data?.position_id}
                onClose={() => {
                  setIsOpen(false);
                  setFieldValue("is_agree", false);
                }}
                handleAccept={() => {
                  setFieldValue("is_agree", true);
                  setIsOpen(false);
                }}
              />

              <div className="pt-5">
                <JobPlaceBtn submit={true} handlePrevious={handlePrevious} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LicenseInfoForm;
