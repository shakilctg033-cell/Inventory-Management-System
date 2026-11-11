import React from "react";

// round number: red = 0, yellow = 5 or less, green = enough stock
function StockBadge({stock}) {
  let color = "bg-green-100 text-green-700";

  if (stock === 0) {
    color = "bg-red-100 text-red-700";
  } else if (stock <= 5) {
    color = "bg-yellow-100 text-yellow-700";
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-w-8 h-8 px-2
        rounded-full font-semibold ${color}`}
    >
      {stock}
    </span>
  );
}

export default StockBadge;
