import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import HomePage from "./pages/User/HomePage";
import ConferencesPage from "./pages/User/ConferencesPage";
import MembersPage from "./pages/User/MembersPage";
import MasterPage from "./pages/User/MasterPage";
import LabPage from "./pages/User/LabPage";
import NationalePage from "./pages/User/NationalePage";
import InternationalePage from "./pages/User/InternationalePage";
import ProjectsPage from "./pages/User/ProjectsPage";
import PrixPage from "./pages/User/PrixPage";
import MissingPage from "./pages/User/MissingPage";
import ContactPage from "./pages/User/ContactPage";
import IndividualPage from "./pages/User/IndividualPage";
import LoginPage from "./pages/Admin/LoginPage";
import Dashboard from "./pages/Admin/DashboardPage";
import PagesManagementPage from "./pages/Admin/PagesManagementPage";
import MembersManagementPage from "./pages/Admin/MembersManagementPage";
import ConferencesManagementPage from "./pages/Admin/ConferencesManagementPage";
import ProjectsManagementPage from "./pages/Admin/ProjectsManagementPage";
import PrixManagementPage from "./pages/Admin/PrixManagementPage";
import AdminForm from "./pages/Admin/AdminForm";
import HistoryPage from "./pages/Admin/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="conférences" element={<ConferencesPage />} />
          <Route path="équipe" element={<MembersPage />} />
          <Route path="équipe/:id" element={<IndividualPage />} />
          <Route path="master" element={<MasterPage />} />
          <Route path="lab-chart" element={<LabPage />} />
          <Route path="collaboration-nationale" element={<NationalePage />} />
          <Route
            path="collaboration-internationale"
            element={<InternationalePage />}
          />
          <Route path="projets-étudiants" element={<ProjectsPage />} />
          <Route path="prix-concours" element={<PrixPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<LoginPage />} />
        </Route> */}
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="tableau-de-bord/add-admin" element={<AdminForm />} />
          <Route path="tableau-de-bord/historique" element={<HistoryPage />} />
          <Route path="gestion-pages" element={<PagesManagementPage />} />
          <Route path="gestion-équipe" element={<MembersManagementPage />} />
          <Route
            path="gestion-conférences"
            element={<ConferencesManagementPage />}
          />
          <Route path="gestion-projets" element={<ProjectsManagementPage />} />
          <Route path="gestion-prix" element={<PrixManagementPage />} />
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
