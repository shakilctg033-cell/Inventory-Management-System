import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FaSignOutAlt} from "react-icons/fa";
import authService from "../appwrite/auth";
import {logout} from "../store/authslice";

function Sidebar({links}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <aside className="w-64 min-h-screen shrink-0 bg-slate-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-8 px-2">Inventory MS</h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              className={({isActive}) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-lg
                duration-200 ${isActive ? "bg-white/15" : "hover:bg-white/10"}`
              }
            >
              <Icon />
              {link.name}
            </NavLink>
          );
        })}

        <button
          onClick={logoutHandler}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg
            text-left hover:bg-white/10 duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
