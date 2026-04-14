import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Terminal, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="glass sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-primary transition-colors" onClick={closeMenu}>
          <Terminal className="text-primary" size={28} />
          <span>CodeInsight <span className="text-primary">AI</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/review" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
                <Terminal size={18} /> New Review
              </Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 transition-colors border border-slate-700"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/25">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-slate-300 hover:text-white transition-colors focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-card/95 backdrop-blur-md border-b border-slate-800 absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu} className="text-slate-300 hover:text-white flex items-center gap-2 py-2 transition-colors text-lg border-b border-slate-800/50">
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                  <Link to="/review" onClick={closeMenu} className="text-slate-300 hover:text-white flex items-center gap-2 py-2 transition-colors text-lg border-b border-slate-800/50">
                    <Terminal size={20} /> New Review
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="mt-2 w-full px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg flex justify-center items-center gap-2 transition-colors border border-rose-500/20 text-lg"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="text-slate-300 hover:text-white text-center py-3 text-lg border border-slate-800 rounded-lg bg-slate-900/50 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" onClick={closeMenu} className="w-full text-center py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/25 text-lg">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
