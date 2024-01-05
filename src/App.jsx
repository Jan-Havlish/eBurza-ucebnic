import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./pages/SharedLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import UcebniceVyber from "./pages/UcebniceVyber";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import UserPage from "./pages/UserPage";
import SpecificBook from "./pages/SpecificBook";
import AddBook from "./pages/AddBook";
import LogWithGoogle from "./pages/LogWithGoogle";

import Error from "./pages/Error";

// https://docs.google.com/document/d/1pPhj56B_XYnTKNOXjq2QV3wJej35gDcNRLUIpPRTfDs/edit?pli=1

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/ucebnice" element={<UcebniceVyber />} />
          <Route path="/ucebnice/:BookID" element={<SpecificBook />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/google" element={<LogWithGoogle />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/o" element={<About />} />
          
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
