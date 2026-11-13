import React from "react";
import {useSelector} from "react-redux";

function Profile() {
  const profile = useSelector((state) => state.auth.profile);

  const rows = [
    {label: "Name", value: profile.name},
    {label: "Email", value: profile.email},
    {label: "Address", value: profile.address || "-"},
    {label: "Role", value: profile.role},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-lg">
        {rows.map((row) => (
          <div key={row.label} className="flex py-2 border-b border-gray-100">
            <span className="w-32 font-semibold">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
