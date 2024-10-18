import { useState } from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import EmailVerifyModal from "../components/modals/EmailVerifyModal";
import ChangeEmailModal from "../components/modals/ChangeEmailModal";
import {
  useOtpVerificationMutation,
  useCheckApplicantTokenQuery,
  useSendVerificationOtpMutation,
  useChangeApplicantEmailMutation,
} from "../slice/jobPlacePage.slice";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState("email-verify");
  const { data, isLoading, isError, error } = useCheckApplicantTokenQuery(
    searchParams.get("token")
  );
  const [
    resendOtpCode,
    { isLoading: isResendLoading, isError: isResendError },
  ] = useSendVerificationOtpMutation();
  const [
    otpVerification,
    { isLoading: isOtpLoading, isError: isOtpError, error: otpError },
  ] = useOtpVerificationMutation();
  const [changeApplicantEmail, { error: changeEmailError }] =
    useChangeApplicantEmailMutation();

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

  const handleResendOtp = async ({ email }) => {
    try {
      const data = await resendOtpCode({ email });

      if (data?.data) {
        if (data?.data?.data?.token) {
          navigate(
            `/applicant-email-verification?token=${data?.data?.data?.token}`
          );
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
        {openModal === "change-email" && (
          <ChangeEmailModal
            handleModal={setOpenModal}
            error={changeEmailError?.data}
            handleChangeEmail={handleResendOtp}
          />
        )}
        {openModal === "email-verify" && (
          <EmailVerifyModal
            data={data?.data}
            error={error?.data}
            handleOtpSubmit={handleOtpVerification}
            handleResendOtp={handleResendOtp}
            handleModal={(value) => {
              setOpenModal(value);
              // navigate(`/applicant-email-verification`);
            }}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default EmailVerification;
