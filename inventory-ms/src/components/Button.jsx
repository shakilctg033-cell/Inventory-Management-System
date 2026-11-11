import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg duration-200 hover:opacity-90
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
