import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

// role="admin" -> only admin can open, role="user" -> only employee can open
function Protected({children, role}) {
  const status = useSelector((state) => state.auth.status);
  const profile = useSelector((state) => state.auth.profile);

  if (!status) {
    return <Navigate to="/login" replace />;
  }

  const myRole = profile?.role === "admin" ? "admin" : "user";
  if (role && role !== myRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;
