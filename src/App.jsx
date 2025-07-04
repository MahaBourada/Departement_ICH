import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import HomePage from "./pages/User/HomePage";
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
import Dashboard from "./pages/Admin/Admin/DashboardPage";
import AddAdmin from "./pages/Admin/Admin/AddAdmin";
import UpdateAdmin from "./pages/Admin/Admin/UpdateAdmin";
import UpdatePage from "./pages/Admin/PagesContent/UpdatePage";
import PagesListPage from "./pages/Admin/PagesContent/PagesListPage";
import MembersListPage from "./pages/Admin/Members/MembersListPage";
import AddMember from "./pages/Admin/Members/AddMember";
import UpdateMember from "./pages/Admin/Members/UpdateMember";
import ProjectsListPage from "./pages/Admin/Projects/ProjectsListPage";
import AddProject from "./pages/Admin/Projects/AddProject";
import UpdateProject from "./pages/Admin/Projects/UpdateProject";
import PrixListPage from "./pages/Admin/Prix/PrixListPage";
import CollabsList from "./pages/Admin/Collabs/CollabsList";
import AddCollab from "./pages/Admin/Collabs/AddCollab";
import UpdateCollab from "./pages/Admin/Collabs/UpdateCollab";
import CollabsConventions from "./pages/User/CollabsConventions";
import CollabForm from "./pages/User/CollabForm";
import AddPrix from "./pages/Admin/Prix/AddPrix";
import UpdatePrix from "./pages/Admin/Prix/UpdatePrix";

function App() {
  return (
    <Router basename={import.meta.env.VITE_APP_BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="departement/equipe" element={<MembersPage />} />
          <Route path="departement/equipe/:id" element={<IndividualPage />} />

          <Route path="formation/master" element={<MasterPage />} />
          <Route
            path="formation/projets-etudiants"
            element={<ProjectsPage />}
          />
          <Route path="formation/prix-concours" element={<PrixPage />} />

          <Route path="recherche/lab-chart" element={<LabPage />} />

          <Route
            path="collaborations/collaborez-avec-nous"
            element={<CollabForm />}
          />
          <Route
            path="collaborations/collaborations-nationales"
            element={<NationalePage />}
          />
          <Route
            path="collaborations/collaborations-nationales/collabs-conventions"
            element={<CollabsConventions />}
          />
          <Route
            path="collaborations/collaborations-internationales"
            element={<InternationalePage />}
          />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="tableau-de-bord/ajouter-admin" element={<AddAdmin />} />
          <Route
            path="tableau-de-bord/gestion-admin/:id"
            element={<UpdateAdmin />}
          />

          <Route path="gestion-pages" element={<PagesListPage />} />
          <Route path="gestion-pages/:idPage" element={<UpdatePage />} />

          <Route path="gestion-equipe" element={<MembersListPage />} />
          <Route path="gestion-equipe/ajouter-membre" element={<AddMember />} />
          <Route path="gestion-equipe/:id" element={<UpdateMember />} />
          <Route path="gestion-projets" element={<ProjectsListPage />} />
          <Route
            path="gestion-projets/ajouter-projet"
            element={<AddProject />}
          />
          <Route path="gestion-projets/:id" element={<UpdateProject />} />

          <Route path="gestion-collaborations" element={<CollabsList />} />
          <Route
            path="gestion-collaborations/ajouter-collaboration"
            element={<AddCollab />}
          />
          <Route path="gestion-collaborations/:id" element={<UpdateCollab />} />

          <Route path="gestion-prix" element={<PrixListPage />} />
          <Route path="gestion-prix/ajouter-prix" element={<AddPrix />} />
          <Route path="gestion-prix/:id" element={<UpdatePrix />} />
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
