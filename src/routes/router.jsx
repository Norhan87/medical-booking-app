import { createBrowserRouter } from "react-router-dom";

import DoctorsPage from "../pages/DoctorsPage";
import DoctorDetailsPage from "../pages/DoctorDetailsPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DoctorsPage />,
  },
  {
    path: "/doctors/:id",
    element: <DoctorDetailsPage />,
  },
  {
    path: "/book",
    element: <BookAppointmentPage />,
  },
  {
    path: "/appointments",
    element: <AppointmentsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;