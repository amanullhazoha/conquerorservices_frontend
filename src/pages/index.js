import NotFound from "./NotFoundPage";
import JobPlacePage from "./JobPlacePage";
import EmailVerification from "./EmailVerification";
import ApplicantVerified from "./ApplicantVerified";
import { createBrowserRouter } from "react-router-dom";
import PassportIdentification from "./PassportIdentification";

const router = createBrowserRouter([
  {
    path: "/jobs/dubai",
    element: <JobPlacePage />,
  },
  {
    path: "/applicant-identify-by-passport",
    element: <PassportIdentification />,
  },
  {
    path: "/applicant-email-verification",
    element: <EmailVerification />,
  },
  {
    path: "/applicant-verified",
    element: <ApplicantVerified />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
