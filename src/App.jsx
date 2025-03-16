import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import ConferencesPage from "./pages/ConferencesPage";
import MembersPage from "./pages/MembersPage";
import MasterPage from "./pages/MasterPage";
import LabPage from "./pages/LabPage";
import NationalePage from "./pages/NationalePage";
import InternationalePage from "./pages/InternationalePage";
import ProjectsPage from "./pages/ProjectsPage";
import PrixPage from "./pages/PrixPage";
import MissingPage from "./pages/MissingPage";
import ContactPage from "./pages/ContactPage";
import IndividualPage from "./pages/IndividualPage";

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
          <Route path="*" element={<MissingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
