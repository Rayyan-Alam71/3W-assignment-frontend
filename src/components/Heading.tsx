import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // icon library
import { Link } from 'react-router-dom';

const Heading = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#205993] sticky top-0 left-0 right-0 z-10">
      <header className="container mx-auto py-6 px-4 w-3/4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl md:text-4xl text-white font-bold">
            <Link to={'/'}>LOGO</Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 text-white font-semibold text-lg">
            <a href="/" className="hover:text-cyan-300 transition">Home</a>
            <a href="#" className="hover:text-cyan-300 transition">Contact</a>
            <a href="#" className="hover:text-cyan-300 transition">About Us</a>
          </nav>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {menuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col items-start space-y-3 md:hidden text-white text-sm font-medium px-2">
            <a href="#" className="w-full py-2 border-b border-gray-700 hover:text-cyan-300 transition">Home</a>
            <a href="#" className="w-full py-2 border-b border-gray-700 hover:text-cyan-300 transition">Contact</a>
            <a href="#" className="w-full py-2 hover:text-cyan-300 transition">About Us</a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Heading;
