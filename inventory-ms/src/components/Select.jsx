import React, {useId} from "react";

const Select = React.forwardRef(function Select(
  {options = [], label, placeholder, className = "", ...props},
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none
          focus:border-blue-500 duration-200 border border-gray-300 w-full
          ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
