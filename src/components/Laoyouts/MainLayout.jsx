import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Searchbar from "../Searchbar/Searchbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../ScrollToTop";

const MainLayout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Searchbar />
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
