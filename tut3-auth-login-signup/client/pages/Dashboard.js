import React from "react";
import RequireAuth from "../component/RequireAuth";

const Dashboard = () => {
  return (
    <RequireAuth>
      <div>Dashboard You are logged in.</div>
    </RequireAuth>
  );
};

export default Dashboard;
