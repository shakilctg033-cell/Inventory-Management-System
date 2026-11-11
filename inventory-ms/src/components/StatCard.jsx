import React from "react";

// the 4 coloured boxes on the admin dashboard
function StatCard({title, value, color}) {
  return (
    <div className={`${color} text-white rounded-lg shadow p-6 text-center`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default StatCard;
