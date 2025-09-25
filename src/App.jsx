// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import AuthDialog from "./pages/AuthDialog";
import EmailVerify from "./pages/EmailVerify";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
         
        {/* Home route */}
        <Route path="/" element={<Home />} />
         <Route path="/header" element={<Header />} />
         <Route path="/login" element={<AuthDialog />} />
          <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
