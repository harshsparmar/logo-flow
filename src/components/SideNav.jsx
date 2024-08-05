import { Image, PencilRuler } from "lucide-react";
import React, { useState } from "react";

function SideNav({ selectedIndex }) {
  const menuList = [
    {
      id: 1,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 2,
      name: "Background",
      icon: Image,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuList.map((menu, index) => (
          <h2
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
            }}
            className={`p-3 text-lg px-7 text-gray-500 my-2 cursor-pointer flex items-center gap-2 hover:bg-primary hover:text-white 
            ${activeIndex === index && "bg-primary text-white"}`}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-sm text-gray-500 text-center fixed bottom-5">
          Created By&nbsp;
          <a
            href="https://github.com/harshsparmar/logo-flow"
            target="_blank"
            class="text-blue-600 underline"
          >
            Harsh Parmar
          </a>

        </h2>
      </div>
    </div>
  );
}

export default SideNav;
