import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
