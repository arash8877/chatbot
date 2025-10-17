import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, FileText } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'chatbot', name: 'Chatbot', icon: <Bot size={18} />, path: '/chatbot' },
    { id: 'summarizer', name: 'Summarizer', icon: <FileText size={18} />, path: '/summarizer' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/tivoli-logo.png" alt="Tivoli Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          <span className="font-bold text-xl text-blue-500">Bot</span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-blue-500 text-white shadow-md scale-105' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-between w-6 h-6 p-1 focus:outline-none"
          >
            {/* Top Line */}
            <span
              className={`block h-0.5 w-full bg-gray-600 rounded transform transition duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            {/* Middle Line */}
            <span
              className={`block h-0.5 w-full bg-gray-600 rounded transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            {/* Bottom Line */}
            <span
              className={`block h-0.5 w-full bg-gray-600 rounded transform transition duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav Items */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-64 shadow-lg border-b border-gray-200 rounded-b-xl' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-2 px-2 pb-4 bg-white">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-blue-500 text-white shadow-md scale-105' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
