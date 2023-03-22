import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarAdmin from "../../Components/SidebarAdmin";
import NotFound from "../NotFound";
import Compile from "./Compile";
import Compiled from "./Compiled";
import Costing from "./Costing";
import History from "./History";
import Pending from "./Pending";
import Reported from "./Reported";
import Resolved from "./Resolved";
import Settings from "./Settings";
import SingleIssue from "./SingleIssue";
import Unresolved from "./Unresolved";

const Admin = () => {
  return (
    <>
      <SidebarAdmin />
      <Routes>
        <Route path="/" element={<Navigate to="reported" replace />} />

        <Route exact path="reported" element={<Reported />} />
        <Route exact path="pending" element={<Pending />} />
        <Route exact path="resolved" element={<Resolved />} />
        <Route exact path="unresolved" element={<Unresolved />} />
        <Route exact path="costing" element={<Costing />} />
        <Route exact path="history" element={<History />} />
        <Route exact path="compile" element={<Compile />} />
        <Route exact path="settings" element={<Settings />} />
        <Route exact path="compile/compiled" element={<Compiled />} />

        <Route exact path="compile/:id" element={<SingleIssue />} />
        <Route exact path="unresolved/:id" element={<SingleIssue />} />
        <Route exact path="resolved/:id" element={<SingleIssue />} />
        <Route exact path="pending/:id" element={<SingleIssue />} />
        <Route exact path="reported/:id" element={<SingleIssue />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Admin;
