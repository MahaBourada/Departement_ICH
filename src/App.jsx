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
import MissingPage from "./pages/MissingPage";
import ContactPage from "./pages/User/ContactPage";
import IndividualPage from "./pages/User/IndividualPage";
import LoginPage from "./pages/Admin/LoginPage";
import Dashboard from "./pages/Admin/DashboardPage";
import PagesManagementPage from "./pages/Admin/PagesManagementPage";
import MembersListPage from "./pages/Admin/MembersListPage";
import MembersManagementPage from "./pages/Admin/MembersManagementPage";
import ConferencesManagementPage from "./pages/Admin/ConferencesManagementPage";
import ProjectsManagementPage from "./pages/Admin/ProjectsManagementPage";
import PrixManagementPage from "./pages/Admin/PrixManagementPage";
import AdminForm from "./pages/Admin/AdminForm";
import PagesListPage from "./pages/Admin/PagesListPage";
import AddMember from "./pages/Admin/AddMember";

function App() {
  return (
    <Router basename={import.meta.env.VITE_APP_BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="conferences" element={<ConferencesPage />} />
          <Route path="equipe" element={<MembersPage />} />
          <Route path="equipe/:id" element={<IndividualPage />} />
          <Route path="master" element={<MasterPage />} />
          <Route path="lab-chart" element={<LabPage />} />
          <Route path="collaboration-nationale" element={<NationalePage />} />
          <Route
            path="collaboration-internationale"
            element={<InternationalePage />}
          />
          <Route path="projets-etudiants" element={<ProjectsPage />} />
          {/* <Route path="prix-concours" element={<PrixPage />} /> */}
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="tableau-de-bord/add-admin" element={<AdminForm />} />

          <Route path="gestion-pages" element={<PagesListPage />} />
          <Route path="gestion-pages/:page" element={<PagesManagementPage />} />

          <Route path="gestion-equipe" element={<MembersListPage />} />
          <Route path="gestion-equipe/ajouter-membre" element={<AddMember />} />
          <Route
            path="gestion-equipe/:id"
            element={<MembersManagementPage />}
          />

          {/* <Route
            path="gestion-conferences"
            element={<ConferencesManagementPage />}
          />
          <Route path="gestion-projets" element={<ProjectsManagementPage />} />
          <Route path="gestion-prix" element={<PrixManagementPage />} /> */}
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
