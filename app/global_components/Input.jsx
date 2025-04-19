import React from "react";

const Input = ({ placeholder, type, name, id, title }) => {
  return (
    <div className="block w-full">
      <label
        htmlFor={name}
        className="text-foreground text-[16px] block font-semibold mb-2"
      >
        {title}
      </label>
      <input
        name={name}
        className="bg-background mb-5 px-4 py-2 rounded-sm w-full border-1 placeholder:text-gray-600 text-[16px] font-normal text-foreground border-gray-600 hover:border-primary focus:border-primary focus:outline-primary focus:ring-none"
        placeholder={placeholder}
        type={type}
        required
      ></input>
    </div>
  );
};
export const DatePicker = ({ date }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="date"
        className="text-foreground text-[16px] block font-semibold mb-2"
      >
        Date of Birth
      </label>
      <input
        name="date"
        required
        type="date"
        placeholder="Enter your date of birth"
        className="bg-background mb-5 px-4 py-2 rounded-sm w-full border-1 text-gray-600 placeholder:text-gray-600 text-[16px] font-normal  border-gray-600 hover:border-primary focus:border-primary focus:outline-primary focus:ring-none"
      />
    </div>
  );
};

export default Input;
