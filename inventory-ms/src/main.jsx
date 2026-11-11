import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store";
import {DashboardLayout, Protected, RoleRedirect} from "./components";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Suppliers from "./pages/admin/Suppliers";
import Users from "./pages/admin/Users";
import EmployeeProducts from "./pages/employee/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <RoleRedirect />},
      {path: "login", element: <Login />},
      {
        path: "admin-dashboard",
        element: (
          <Protected role="admin">
            <DashboardLayout />
          </Protected>
        ),
        children: [
          {index: true, element: <AdminDashboard />},
          {path: "products", element: <AdminProducts />},
          {path: "categories", element: <Categories />},
          {path: "orders", element: <Orders />},
          {path: "suppliers", element: <Suppliers />},
          {path: "users", element: <Users />},
          {path: "profile", element: <Profile />},
        ],
      },
      {
        path: "employee-dashboard",
        element: (
          <Protected role="user">
            <DashboardLayout />
          </Protected>
        ),
        children: [
          {index: true, element: <EmployeeProducts />},
          {path: "orders", element: <Orders />},
          {path: "profile", element: <Profile />},
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
