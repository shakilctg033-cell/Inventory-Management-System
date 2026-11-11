import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import authService from "./appwrite/auth";
import service from "./appwrite/service";
import {login, logout} from "./store/authslice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  
  useEffect(() => {
    authService
      .getCurrentUser()
      .then(async (userData) => {
        if (!userData) {
          dispatch(logout());
          return;
        }

        const profile = await service.getProfile(userData.$id);
        if (profile) {
          dispatch(login({userData, profile}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div className="p-8 text-xl">Loading...</div>;
  }

  return <Outlet />;
}

export default App;
