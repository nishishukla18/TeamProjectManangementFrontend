// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import AuthDialog from "./pages/AuthDialog";
import EmailVerify from "./pages/EmailVerify";
import { Toaster } from "react-hot-toast";
import Members from "./components/Dashboard/Members";
import Progress from "./components/Dashboard/Progress";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Dashboard/Settings";
import Tasks from "./components/Dashboard/Tasks";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Workspaces from "./components/Dashboard/Workspaces";
import CreateWorkspace from "./create/CreateWorkspace";
import Workspace from "./pages/Workspace";
import CreateProject from "./create/CreateProject";

function App() {
  return (
    
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
     <Header/>
    <Routes>
  {/* Public routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<AuthDialog />} />
  <Route path="/email-verify" element={<EmailVerify />} />
  <Route path="/reset-password" element={<ResetPassword />} />

  {/* Protected routes */}
  <Route path="/hub" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="members" element={<Members />} />
      <Route path="progress" element={<Progress />} />
      <Route path="settings" element={<Settings />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="workspaces" element={< Workspaces/>} />
       <Route path="create-workspace" element={<CreateWorkspace />} />
       <Route path="workspace/:id" element={<Workspace />} />
        <Route path="workspace/:id/create-project" element={<CreateProject/>} />
    </Route>
  </Route>
</Routes>
    </BrowserRouter>
  );
}

export default App;
