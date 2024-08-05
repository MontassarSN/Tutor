import React from "react";

interface NavbarProps {
  onOptionSelect: (option: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOptionSelect }) => {
  return (

      <ul className="flex flex-row gap-5 bg-gray-100 m-auto justify-between px-20 w-[50rem] py-5">
        <li className="cursor-pointer text-lg font-semibold" onClick={() => onOptionSelect("option1")}>Details</li>
        <li className="cursor-pointer text-lg font-semibold" onClick={() => onOptionSelect("option2")}>Owned Courses</li>
        <li className="cursor-pointer text-lg font-semibold" onClick={() => onOptionSelect("option3")}>PurchasedCourses</li>
      </ul>
  );
};

export default Navbar;
