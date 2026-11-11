import React from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  FaHome,
  FaBoxOpen,
  FaTable,
  FaShoppingCart,
  FaTruck,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

const adminLinks = [
  {name: "Dashboard", path: "/admin-dashboard", icon: FaHome, end: true},
  {name: "Products", path: "/admin-dashboard/products", icon: FaBoxOpen},
  {name: "Categories", path: "/admin-dashboard/categories", icon: FaTable},
  {name: "Orders", path: "/admin-dashboard/orders", icon: FaShoppingCart},
  {name: "Suppliers", path: "/admin-dashboard/suppliers", icon: FaTruck},
  {name: "Users", path: "/admin-dashboard/users", icon: FaUsers},
  {name: "Profile", path: "/admin-dashboard/profile", icon: FaCog},
];

const employeeLinks = [
  {name: "Products", path: "/employee-dashboard", icon: FaBoxOpen, end: true},
  {name: "Orders", path: "/employee-dashboard/orders", icon: FaShoppingCart},
  {name: "Profile", path: "/employee-dashboard/profile", icon: FaCog},
];

// sidebar on the left, the current page (Outlet) on the right
function DashboardLayout() {
  const profile = useSelector((state) => state.auth.profile);
  const links = profile?.role === "admin" ? adminLinks : employeeLinks;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar links={links} />
      <main className="flex-1 min-w-0 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
