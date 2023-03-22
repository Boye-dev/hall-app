import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import NotFound from "../NotFound";
import Home from "./Home";
import Pending from "./Pending";
import Reported from "./Reported";
import Resolved from "./Resolved";
import Settings from "./Settings";
import SingleIssue from "./SingleIssue";
import Unresolved from "./Unresolved";

const Senator = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />

        <Route exact path="home" element={<Home />} />
        <Route exact path="reported" element={<Reported />} />
        <Route exact path="pending" element={<Pending />} />
        <Route exact path="resolved" element={<Resolved />} />
        <Route exact path="unresolved" element={<Unresolved />} />
        <Route exact path="settings" element={<Settings />} />

        <Route exact path="unresolved/:id" element={<SingleIssue />} />
        <Route exact path="resolved/:id" element={<SingleIssue />} />
        <Route exact path="pending/:id" element={<SingleIssue />} />
        <Route exact path="reported/:id" element={<SingleIssue />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Senator;
