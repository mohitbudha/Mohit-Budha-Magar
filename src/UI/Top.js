import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Top = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);


  
  return (
    <div className="relative">
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center px-6 py-4 shadow-md z-50 relative border-b ${
          theme === 'dark'
            ? 'bg-gray-900 text-white border-gray-700'
            : 'bg-white text-gray-800 border-gray-300'
        }`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          MOHIT <span className="text-blue-500">BUDHA</span>MAGAR
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
  <li>
    <a href="#home" className="nav-link text-gray-800 dark:text-white" >
      Home
    </a>
  </li>
  <li>
    <a href="#about" className="nav-link text-gray-800 dark:text-white">
      About Me
    </a>
  </li>
  <li>
    <a href="#projects" className="nav-link text-gray-800 dark:text-white">
      Projects
    </a>
  </li>
  <li>
    <a href="#contact" className="nav-link text-gray-800 dark:text-white">
      Contact
    </a>
  </li>
</ul>


        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>

           <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
           >
           Admin
           </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>


      


      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Menu
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Sidebar Links */}
       
<ul className="flex flex-col gap-6 p-6 text-lg">
  <li>
    <a href="#home" className="nav-link text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
      Home
    </a>
  </li>
  <li>
    <a href="#about" className="nav-link text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
      About Me
    </a>
  </li>
  <li>
    <a href="#projects" className="nav-link text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
      Projects
    </a>
  </li>
  <li>
    <a href="#contact" className="nav-link text-gray-800 dark:text-white" onClick={() => setIsOpen(false)}>
      Contact
    </a>
  </li>
</ul>


      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default Top;
