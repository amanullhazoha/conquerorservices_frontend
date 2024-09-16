import JobPlacePage from "./JobPlacePage";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/jobs/dubai",
        element: <JobPlacePage />,
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;