import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";


function RoleRedirect() {
  const status = useSelector((state) => state.auth.status);
  const profile = useSelector((state) => state.auth.profile);

  if (!status) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Navigate to="/employee-dashboard" replace />;
}

export default RoleRedirect;
