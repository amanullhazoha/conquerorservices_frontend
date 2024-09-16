const { string, object } = require("yup");

export const jobApplyBasicSchema = object().shape({
    first_name: string()
        .required("This field must not be empty."),
    last_name: string()
        .required("This field must not be empty."),
    mother_name: string()
        .required("This field must not be empty."),
    date_of_birth: string()
        .required("This  field must not be empty."),
    gender: string()
        .required("This  field must not be empty."),
    nationality: string()
        .required("This  field must not be empty."),
    email: string()
        .required("This  field must not be empty."),
    contact_number: string()
        .required("This  field must not be empty."),
    whatsapp_number: string(),
    position_id: string()
        .required("This  field must not be empty."),
    applicant_image: string()
        .required("This  field must not be empty.")
});

export const jobApplyNidOrCnicSchema = object().shape({
    zip: string()
        .required("This field must not be empty."),
    city: string()
        .required("This field must not be empty."),
    religion: string()
        .required("This field must not be empty."),
    province: string()
        .required("This  field must not be empty."),
    passportno: string()
        .required("This  field must not be empty."),
    emiratesid: string()
        .required("This  field must not be empty."),
    homeaddrss: string()
        .required("This  field must not be empty."),
    uaeresident: string()
        .required("This  field must not be empty."),
    father_name: string()
        .required("This  field must not be empty."),
    policeStation: string()
        .required("This  field must not be empty."),
    martialstatus: string()
        .required("This  field must not be empty."),
    date_of_expiry: string()
        .required("This  field must not be empty."),
    nidorcnicnumber: string()
        .required("This  field must not be empty."),
    emirates_expiry: string()
        .required("This  field must not be empty."),
    applicant_resume: string(),
    reference: string(),
    applicant_passport: string()
        .required("This  field must not be empty."),
    nid_cnic_back: string()
        .required("This  field must not be empty."),
    nid_cnic_front: string()
        .required("This  field must not be empty."),
});

export const jobApplyLicenseSchema = object().shape({
    submissionid: string()
        .required("This field must not be empty."),
    UAE_DL_Front: string()
        .required("This field must not be empty."),
    UAE_DL_Back: string()
        .required("This field must not be empty."),
    appli_dri_number: string()
        .required("This  field must not be empty."),
    appli_dri_expiry: string()
        .required("This  field must not be empty."),
    have_uae_licence: string()
        .required("This  field must not be empty."),
    appli_dri_lisence_frontpart: string()
        .required("This  field must not be empty."),
    appli_dri_lisence_backpart: string()
        .required("This  field must not be empty."),
    UAE_Resident_Visa_No: string()
        .required("This  field must not be empty."),
    UAE_License_No: string()
        .required("This  field must not be empty."),
    SIM_No: string(),
    // is_agree: string()
    //     .required("This  field must not be empty."),
});
