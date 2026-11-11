import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import authService from "../appwrite/auth";
import service from "../appwrite/service";
import {login as authLogin} from "../store/authslice";
import {Input, Button} from "../components";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      await authService.login(data);
      const userData = await authService.getCurrentUser();
      const profile = userData ? await service.getProfile(userData.$id) : null;

      if (!profile) {
        await authService.logout();
        setError("Profile not found. Ask the admin to add your profile.");
        return;
      }

      dispatch(authLogin({userData, profile}));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // already logged in? go to the dashboard
  if (status) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-600 h-80 pt-16 text-center px-4">
        <h1 className="text-4xl text-white">Inventory (POS) Management System</h1>
      </div>

      <div
        className="relative -mt-44 mx-auto w-full max-w-md bg-white rounded-lg
          shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter Email"
            required
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            required
            {...register("password")}
          />
          <Button type="submit" bgColor="bg-green-600" className="w-full py-3">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
