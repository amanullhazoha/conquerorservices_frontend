import { useState } from "react";
import SuccessModal from "../components/modals/SucessModal";
import PublicLayout from "../components/layouts/PublicLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import EmailVerifyModal from "../components/modals/EmailVerifyModal";
import ChangeEmailModal from "../components/modals/ChangeEmailModal";
import IdentityVerificationModal from "../components/modals/IdentityVerificationModal";
import {
  useCheckApplicantTokenQuery,
  useSendVerificationOtpMutation,
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
    { isLoading: isResendLoading, isError: isResendError },
  ] = useSendVerificationOtpMutation();
  const [
    checkPassport,
    { isLoading: isPassportLoading, isError: isPassportError },
  ] = useSendVerificationOtpUsingPassportMutation();

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

  const handleCheckPassport = async ({ passportno, date_of_expiry }) => {
    try {
      const data = await checkPassport({ passportno, date_of_expiry });

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

  return (
    <PublicLayout>
      <div className="flex gap-3 flex-col justify-center items-center min-h-[81.5vh]">
        {openModal === "email-verify" && <SuccessModal />}
        {openModal === "identity-verification" && (
          <IdentityVerificationModal
            handlePassport={() => console.log("")}
            handleModal={setOpenModal}
          />
        )}
        {openModal === "email-verify" && (
          <EmailVerifyModal
            data={data?.data}
            error={error?.data}
            handleResendOtp={handleResendOtp}
            handleModal={(value) => {
              setOpenModal(value);
              navigate(`/applicant-email-verification`);
            }}
          />
        )}
        {openModal === "change-email" && (
          <ChangeEmailModal
            handleModal={setOpenModal}
            handleChangeEmail={handleResendOtp}
          />
        )}
      </div>
    </PublicLayout>
  );
};

export default PassportIdentification;
