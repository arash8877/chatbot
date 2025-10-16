import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bot, FileText } from "lucide-react";

export function Navbar() {
  const [activeItem, setActiveItem] = useState("chatbot");

  const navItems = [
    { id: "chatbot", name: "Chatbot", icon: <Bot size={18} />, path: "/chatbot" },
    { id: "summarizer", name: "summarizer", icon: <FileText size={18} />, path: "/summarizer" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 text-white font-bold flex items-center justify-center rounded-full">
          T
        </div>
        <span className="font-semibold text-lg">TivoliBot</span>
      </div>

      {/* Nav Items */}
      <div className="flex items-center gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeItem === item.id
                ? "bg-blue-500 text-white shadow-md scale-105"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
