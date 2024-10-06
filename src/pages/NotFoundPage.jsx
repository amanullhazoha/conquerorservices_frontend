import PublicLayout from "../components/layouts/PublicLayout";
import { Link } from "react-router-dom";
import EmailVerifyModal from "../components/modals/EmailVerifyModal";
import ChangeEmailModal from "../components/modals/ChangeEmailModal";
import SuccessModal from "../components/modals/SucessModal";
import IdentityVerificationModal from "../components/modals/IdentityVerificationModal";
import { useState } from "react";

const NotFound = () => {
  const [openModal, setOpenModal] = useState("email-verify");

  return (
    <PublicLayout>
      <div className="flex gap-3 flex-col justify-center items-center min-h-[81.5vh]">
        <h1 className="text-2xl text-black font-medium">
          404 - Page Not Found
        </h1>

        <p>The page you are looking for does not exist.</p>

        <Link to="/" className="bg-cyan-400 px-3 py-1 rounded-lg">
          <button>Go to Home</button>
        </Link>
      </div>

      {/* {openModal === "email-verify" && <EmailVerifyModal />} */}
      {/* <ChangeEmailModal /> */}
      {/* <SuccessModal /> */}
      {/* <IdentityVerificationModal /> */}
    </PublicLayout>
  );
};

export default NotFound;
