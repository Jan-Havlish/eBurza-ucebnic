import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const SharedLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-5/6 mt-12 mb-12">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SharedLayout;
