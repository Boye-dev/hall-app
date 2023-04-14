import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarAdmin from "../../Components/SidebarAdmin";
import NotFound from "../NotFound";
import Categories from "./Categories";
import Compile from "./Compile";
import Compiled from "./Compiled";
import Costing from "./Costing";
import Dashboard from "./Dashboard";
import History from "./History";
import Pending from "./Pending";
import PrintPreview from "./PrintPreview";
import Reported from "./Reported";
import Resolved from "./Resolved";
import Settings from "./Settings";
import SingleIssue from "./SingleIssue";
import Statistics from "./Statistics";
import Unresolved from "./Unresolved";
import Users from "./Users";
import ChangePassword from "./ChangePassword";

const Admin = () => {
  return (
    <>
      <SidebarAdmin />
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        <Route exact path="reported" element={<Reported />} />
        <Route exact path="pending" element={<Pending />} />
        <Route exact path="resolved" element={<Resolved />} />
        <Route exact path="unresolved" element={<Unresolved />} />
        <Route exact path="costing" element={<Costing />} />
        <Route exact path="categories" element={<Categories />} />
        <Route exact path="dashboard" element={<Dashboard />} />
        <Route exact path="history" element={<History />} />
        <Route exact path="compile" element={<Compile />} />
        <Route exact path="settings" element={<Settings />} />
        <Route exact path="change-password" element={<ChangePassword />} />
        <Route exact path="users" element={<Users />} />
        <Route exact path="statistics" element={<Statistics />} />
        <Route exact path="print" element={<PrintPreview />} />
        <Route exact path="compile/compiled" element={<Compiled />} />

        <Route exact path="compile/:id" element={<SingleIssue />} />
        <Route exact path="history/:id" element={<SingleIssue />} />
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
