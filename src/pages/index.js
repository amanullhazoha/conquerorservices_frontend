import JobPlacePage from "./JobPlacePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <JobPlacePage />,
    }
])

export default router;