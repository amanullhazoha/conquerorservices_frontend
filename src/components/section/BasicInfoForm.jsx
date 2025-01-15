import { Form, Formik } from "formik";
import DragAndDrop from "../inputs/DragAndDrop";
import JobPlaceBtn from "../buttons/JobPlaceBtn";
import { useCallback, useEffect, useState } from "react";
import JobPlaceDateField from "../inputs/JobPlaceDateFiled";
import JobPlaceInputField from "../inputs/JobPlaceInputField";
import JobPlaceRadioInput from "../inputs/JobPlaceRadioInput";
import { jobApplyBasicSchema } from "../../schema/jobPlaceSchema";
import JobPlaceNumberInputField from "../inputs/JobPlaceNumberInputField";
import JobPlaceSelectInputField from "../inputs/JobPlaceSelectInputField";
import {
  countries,
  allCountry,
  countryCode,
  hiringPositions,
  hiringPositionSuggest,
} from "../../assets/staticData/countryInfo";
import {
  useCreateApplicantBasicInfoMutation,
  useUpdateApplicantBasicInfoMutation,
} from "../../slice/jobPlacePage.slice";

const INITIALVALUES = {
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
  applicant_image: "",
  hiring_position: "",
};

const BasicInfoForm = ({ id, data, handleNext, setPosition, position_id }) => {
  let count = 0;
  const [wp_code, setWpCode] = useState(null);
  const [initialValues, setInitialValues] = useState(INITIALVALUES);
  const [updateApplicantBasicInfo, { error: updateError }] =
    useUpdateApplicantBasicInfoMutation();
  const [createApplicantBasicInfo, { isLoading, isError, error: createError }] =
    useCreateApplicantBasicInfoMutation();

  const handleSetLocalStorageValue = useCallback(
    (values) => {
      count = count + 1;

      if (count > 4) {
        sessionStorage.setItem("applicantBasicInfo", JSON.stringify(values));
      }
    },
    [initialValues]
  );

  console.log(position_id);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      if (id) {
        if (
          values.applicant_image &&
          values.applicant_image[0] instanceof File
        ) {
          formData.append("applicant_image", values.applicant_image[0]);
        }

        Object.entries(values).forEach(([key, value]) => {
          if (key !== "applicant_image") {
            if (typeof value === "string" || typeof value === "number") {
              formData.append(key, value);
            }
          }
        });

        const data = await updateApplicantBasicInfo({ data: formData, id });

        if (data?.data) {
          resetForm();
          sessionStorage.removeItem("applicantBasicInfo");
          handleNext(data?.data?.id);
        }
      } else {
        if (
          values.applicant_image &&
          values.applicant_image[0] instanceof File
        ) {
          formData.append("applicant_image", values.applicant_image[0]);
        }

        Object.entries(values).forEach(([key, value]) => {
          if (key !== "applicant_image") {
            formData.append(key, value);
          }
        });

        const data = await createApplicantBasicInfo(formData);

        if (data?.data) {
          resetForm();
          sessionStorage.removeItem("applicantBasicInfo");
          handleNext(data?.data?.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("applicantLicenseInfo");

    if (data?.position_id) {
      setPosition(data?.position_id);
    }

    const storedValues = sessionStorage.getItem("applicantBasicInfo");

    if (storedValues) {
      const parseValues = JSON.parse(storedValues);

      setInitialValues({
        ...parseValues,
        position_id: parseValues?.position_id
          ? parseValues.position_id
          : position_id
          ? position_id
          : "",
        applicant_image: data?.applicant_image ? data?.applicant_image : "",
      });

      if (parseValues?.position_id) {
        setPosition(parseValues?.position_id);
      }
    } else {
      setInitialValues({
        first_name: data?.first_name ? data?.first_name : "",
        last_name: data?.last_name ? data?.last_name : "",
        mother_name: data?.mother_name ? data?.mother_name : "",
        gender: data?.gender ? data?.gender : "",
        date_of_birth: data?.date_of_birth ? data?.date_of_birth : "",
        nationality: data?.nationality ? data?.nationality : "",
        email: data?.email ? data?.email : "",
        contact_number: data?.contact_number ? data?.contact_number : "",
        whatsapp_number: data?.whatsapp_number ? data?.whatsapp_number : "",
        position_id: data?.position_id
          ? data?.position_id
          : position_id
          ? position_id
          : "",
        applicant_image: data?.applicant_image ? data?.applicant_image : "",
        hiring_position: data?.hiring_position ? data?.hiring_position : "",
      });
    }
  }, [data, position_id]);

  return (
    <div className="flex-1 bg-white rounded-lg px-6 py-6">
      <div className="pb-5 border-b border-[#EAECF0]">
        <h3 className="text-lg font-semibold text-[#27303F]">
          Basic Information
        </h3>
        <p className="text-sm text-[#718096] max-md:hidden">
          Please provide your basic information below to help us serve you
          better
        </p>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={jobApplyBasicSchema(id)}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, touched, errors, setFieldValue }) => {
          handleSetLocalStorageValue(values);

          return (
            <Form onSubmit={handleSubmit}>
              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Name
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <JobPlaceInputField
                      errors={errors}
                      name="first_name"
                      onlyLetter={true}
                      touched={touched}
                      label="First name"
                      placeholder="Muhammad"
                    />

                    <JobPlaceInputField
                      errors={errors}
                      name="last_name"
                      onlyLetter={true}
                      touched={touched}
                      label="Last name"
                      placeholder="Abdullah"
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Mother Name
                </h4>

                <div className="col-span-2">
                  <div className="hidden gap-4 grid-cols-1 md:grid-cols-2 md:grid">
                    <JobPlaceInputField
                      errors={errors}
                      touched={touched}
                      onlyLetter={true}
                      label="Full name"
                      placeholder="Saima"
                      name="mother_name"
                    />
                  </div>

                  <div className="hidden gap-4 grid-cols-1 md:grid-cols-2 max-md:grid">
                    <JobPlaceInputField
                      errors={errors}
                      onlyLetter={true}
                      touched={touched}
                      name="mother_name"
                      label="Mother Name"
                      placeholder="Saima"
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Gender
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
                    <JobPlaceRadioInput
                      name="gender"
                      label="Gender"
                      value={values.gender}
                      handleSelect={(value) => setFieldValue("gender", value)}
                      items={[
                        { id: "1", name: "male", value: "male", label: "Male" },
                        {
                          id: "2",
                          name: "female",
                          value: "female",
                          label: "Female",
                        },
                        {
                          id: "3",
                          name: "other",
                          value: "other",
                          label: "Other",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Date of Birth
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <JobPlaceDateField
                      startYear={18}
                      errors={errors}
                      touched={touched}
                      name="date_of_birth"
                      label="Date of birth"
                      value={values?.date_of_birth}
                      handleSelect={(date) =>
                        setFieldValue("date_of_birth", date)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Country
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <JobPlaceSelectInputField
                      errors={errors}
                      touched={touched}
                      keyValue="name"
                      items={allCountry}
                      // items={countries}
                      name="nationality"
                      searchField={true}
                      label="Nationality"
                      value={values.nationality}
                      suggestedItems={countries}
                      suggestionPlaceholder="Search for a nationality"
                      placeholder="Select Nationality"
                      handleSelect={(item) =>
                        setFieldValue("nationality", item.name)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Contact Info *
                </h4>

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
                      type="number"
                      errors={errors}
                      keyValue="name"
                      touched={touched}
                      name="contact_number"
                      label="Phone number"
                      items={countryCode}
                      changeDisable={true}
                      placeholder="000000000"
                      value={values?.contact_number}
                      setFieldValue={setFieldValue}
                      selectCountryCode={
                        values?.nationality
                          ? countryCode?.find(
                              (item) => item?.name === values?.nationality
                            )?.shortName
                          : countryCode?.find(
                              (item) => item?.name === "Pakistan"
                            )?.shortName
                      }
                    />

                    <JobPlaceNumberInputField
                      type="number"
                      errors={errors}
                      required={false}
                      keyValue="name"
                      touched={touched}
                      items={countryCode}
                      name="whatsapp_number"
                      placeholder="000000000"
                      label="WhatsApp number"
                      value={values?.whatsapp_number}
                      setFieldValue={setFieldValue}
                      handleSelect={(item) => setWpCode(item.shortName)}
                      selectCountryCode={
                        wp_code
                          ? countryCode?.find(
                              (item) => item?.shortName === wp_code
                            )?.shortName
                          : countryCode?.find(
                              (item) => item?.name === "Pakistan"
                            )?.shortName
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Application *
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <JobPlaceSelectInputField
                      errors={errors}
                      touched={touched}
                      keyValue="name"
                      name="position_id"
                      label="Job position"
                      placeholder="Select position"
                      handleSelect={(item) =>
                        setFieldValue("position_id", item.id)
                      }
                      items={[
                        // { id: 50, name: "Rider" },
                        { id: 52, name: "Freelancer" },
                      ]}
                      value={
                        [
                          // { id: 50, name: "Rider" },
                          { id: 52, name: "Freelancer" },
                        ].find((item) => item.id == values.position_id)?.name
                      }
                    />

                    {values?.position_id === 52 && (
                      <JobPlaceSelectInputField
                        errors={errors}
                        touched={touched}
                        keyValue="name"
                        searchField={true}
                        name="hiring_position"
                        label="Hiring position"
                        placeholder="Select position"
                        items={hiringPositions}
                        suggestedItems={hiringPositionSuggest}
                        suggestionPlaceholder="Search more positions"
                        handleSelect={(item) =>
                          setFieldValue("hiring_position", item.name)
                        }
                        value={
                          hiringPositions.find(
                            (item) => item.name === values.hiring_position
                          )?.name
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-[#EAECF0] grid gap-6 grid-cols-1 md:grid-cols-3">
                <h4 className="text-sm font-semibold text-[#27303F] col-span-1 max-md:hidden">
                  Applicant’s Photo *
                </h4>

                <div className="col-span-2">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <DragAndDrop
                      errors={errors}
                      touched={touched}
                      label="Add photo"
                      name="applicant_image"
                      value={values.applicant_image}
                      handleSelectFile={(file) =>
                        setFieldValue("applicant_image", file)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5">
                {(updateError || createError) && (
                  <div className="text-red-500 mt-1 mb-3 text-right text-base">
                    {updateError
                      ? updateError?.data?.message
                      : createError?.data?.message}
                  </div>
                )}

                <JobPlaceBtn previous={false} handleNext={handleNext} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BasicInfoForm;
