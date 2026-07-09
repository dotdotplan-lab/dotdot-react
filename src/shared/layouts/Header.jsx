import { Link, NavLink } from 'react-router';
import { FaEnvelope, FaHome, FaBars, FaTimes, FaIdCard, FaCalendar, FaBlog} from 'react-icons/fa';
import { useState } from 'react';
import Button from './Button.jsx';
import {FaPencil, FaPerson, FaPhotoFilm, FaShop} from "react-icons/fa6";
// import './Header.css';

export function Header() {

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, to: '/' },
    { id: 'about', label: 'About', icon: <FaIdCard />, to: '/about' },
    { id: 'canvas', label: 'Canvas', icon: <FaCalendar />, to: '/canvas' },
    { id: 'board', label: 'Board', icon: <FaPencil />, to: '/board' },
    { id: 'shop', label: 'Shop', icon: <FaShop />, to: '/shop' },
    { id: 'blog', label: 'Blog', icon: <FaBlog />, to: '/blog' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className='sticky top-0 bg-gray-800 text-white z-30'>
      <div className="container mx-auto flex justify-between items-center h-14">
        <div>
          <Link to="/" className="text-xl font-bold">dotdot.com</Link>
        </div>
        <nav className='hidden md:flex space-x-4'>
          {navItems.map(item => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300">
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        <Button className="hidden md:block"><FaPerson /></Button>
      </div>

      {/* Mobile Menu */}
      <aside className={`
      fixed top-0 left-0 w-64 h-full bg-gray-800 z-50  
      ${isMenuOpen ? 'translate-0' : '-translate-x-full'} 
      md:hidden transform transition-transform duration-300 ease-in-out 
      `}>
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6"/>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300">
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}