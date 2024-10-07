import { useState } from "react";
import SuccessModal from "../components/modals/SucessModal";
import PublicLayout from "../components/layouts/PublicLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import EmailVerifyModal from "../components/modals/EmailVerifyModal";
import ChangeEmailModal from "../components/modals/ChangeEmailModal";
import {
  useOtpVerificationMutation,
  useCheckApplicantTokenQuery,
  useSendVerificationOtpMutation,
} from "../slice/jobPlacePage.slice";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState("email-verify");
  const [searchParams, setSearchParams] = useSearchParams();
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
        if (data?.data?.data?.token) {
          navigate(`/`);
        }
      }

      return data;
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  console.log(data, isError, error);

  return (
    <PublicLayout>
      <div className="flex gap-3 flex-col justify-center items-center min-h-[81.5vh]">
        {openModal === "success" && <SuccessModal />}
        {openModal === "change-email" && (
          <ChangeEmailModal
            handleModal={setOpenModal}
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
              navigate(`/applicant-email-verification`);
            }}
          />
        )}

        {/* <IdentityVerificationModal /> */}
      </div>
    </PublicLayout>
  );
};

export default EmailVerification;
