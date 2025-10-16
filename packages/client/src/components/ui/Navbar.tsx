import { NavLink } from 'react-router-dom';
import { Bot, FileText } from 'lucide-react';

export function Navbar() {
   const navItems = [
      {
         id: 'chatbot',
         name: 'Chatbot',
         icon: <Bot size={18} />,
         path: '/chatbot',
      },
      {
         id: 'summarizer',
         name: 'Summarizer',
         icon: <FileText size={18} />,
         path: '/summarizer',
      },
   ];

   return (
      <nav className="flex items-center justify-between px-6 bg-white shadow-sm border-b border-gray-200">
         {/* Logo */}
         <div className="flex items-center gap-2">
            <img
               src="/tivoli-logo.png"
               alt="Tivoli Logo"
               className="w-20 h-20 object-contain"
            />
            <span className="font-bold text-xl text-blue-500">
               Bot
            </span>
         </div>

         {/* Nav Items */}
         <div className="flex items-center gap-4">
            {navItems.map((item) => (
               <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                     `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                           ? 'bg-blue-500 text-white shadow-md scale-105'
                           : 'text-gray-600 hover:text-blue-500'
                     }`
                  }
               >
                  {item.icon}
                  {item.name}
               </NavLink>
            ))}
         </div>
      </nav>
   );
}
