import { useSearchParams } from "react-router-dom";
import SuccessModal from "../components/modals/SucessModal";
import PublicLayout from "../components/layouts/PublicLayout";

const ApplicantVerified = () => {
  const [searchParams] = useSearchParams();

  return (
    <PublicLayout>
      <div className="flex gap-3 flex-col justify-center items-center min-h-[81.5vh]">
        {searchParams.get("success") && <SuccessModal />}
      </div>
    </PublicLayout>
  );
};

export default ApplicantVerified;
