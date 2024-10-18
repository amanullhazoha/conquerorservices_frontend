import { useState } from "react";
import SuccessModal from "../components/modals/SucessModal";
import PublicLayout from "../components/layouts/PublicLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import EmailVerifyModal from "../components/modals/EmailVerifyModal";
import ChangeEmailModal from "../components/modals/ChangeEmailModal";
import IdentityVerificationModal from "../components/modals/IdentityVerificationModal";
import {
  useOtpVerificationMutation,
  useCheckApplicantTokenQuery,
  useSendVerificationOtpMutation,
  useChangeApplicantEmailMutation,
  useSendVerificationOtpUsingPassportMutation,
} from "../slice/jobPlacePage.slice";

const PassportIdentification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState("identity-verification");
  const { data, isLoading, isError, error } = useCheckApplicantTokenQuery(
    searchParams.get("token")
  );
  const [
    resendOtpCode,
    { isLoading: isResendLoading, isError: isResendError, error: resendError },
  ] = useSendVerificationOtpMutation();
  const [
    checkPassport,
    {
      isLoading: isPassportLoading,
      isError: isPassportError,
      error: passportError,
    },
  ] = useSendVerificationOtpUsingPassportMutation();
  const [
    otpVerification,
    { isLoading: isOtpLoading, isError: isOtpError, error: otpError },
  ] = useOtpVerificationMutation();
  const [changeApplicantEmail, { error: changeEmailError }] =
    useChangeApplicantEmailMutation();

  const handleResendOtp = async ({ email }) => {
    try {
      const data = await resendOtpCode({ email });

      if (data?.data) {
        if (data?.data?.data?.token) {
          navigate(
            `/applicant-identify-by-passport?token=${data?.data?.data?.token}`
          );

          setOpenModal("email-verify");
        }
      }

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  const handleChangeEmail = async ({ email }) => {
    try {
      const data = await changeApplicantEmail({
        email,
        token: searchParams.get("token"),
      });

      if (data?.data) {
        if (data?.data?.data?.token) {
          navigate(
            `/applicant-identify-by-passport?token=${data?.data?.data?.token}`
          );

          setOpenModal("email-verify");
        }
      }

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  const handleCheckPassport = async ({ passportno, date_of_expiry }) => {
    try {
      const data = await checkPassport({ passportno, date_of_expiry });

      if (data?.data) {
        if (data?.data?.data?.token) {
          navigate(
            `/applicant-identify-by-passport?token=${data?.data?.data?.token}`
          );

          setOpenModal("email-verify");
        }
      }

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  const handleOtpVerification = async ({ otp_code }) => {
    try {
      const data = await otpVerification({
        otp_code,
        token: searchParams.get("token"),
      });

      if (data?.data) {
        navigate(`/applicant-verified?success=${searchParams.get("token")}`);
      }

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  return (
    <PublicLayout>
      <div className="flex gap-3 flex-col justify-center items-center min-h-[84vh]">
        {openModal === "identity-verification" && (
          <IdentityVerificationModal
            error={passportError?.data}
            handleModal={setOpenModal}
            handlePassport={handleCheckPassport}
          />
        )}
        {openModal === "email-verify" && searchParams.get("token") && (
          <EmailVerifyModal
            data={data?.data}
            error={error?.data || otpError?.data}
            handleResendOtp={handleResendOtp}
            handleOtpSubmit={handleOtpVerification}
            handleModal={(value) => {
              setOpenModal(value);
              // navigate(`/applicant-identify-by-passport`);
            }}
          />
        )}

        {openModal === "change-email" && (
          <ChangeEmailModal
            handleModal={setOpenModal}
            error={changeEmailError?.data}
            handleChangeEmail={handleChangeEmail}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default PassportIdentification;
