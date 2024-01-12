import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import { useNotification } from "../contexts/NotificationContext";

const SharedLayout = () => {
  const { notification, notificationType } = useNotification();

  return (
    <div className="flex flex-col items-center">
      <Notification notificationType={notificationType} value={notification} />
      <Navbar />
      <div className="w-5/6 mt-12 mb-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
