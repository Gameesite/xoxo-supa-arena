
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Info,
  Phone,
  Shield,
  FileText
} from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5 mr-2" /> },
    { path: '/about', label: 'About', icon: <Info className="w-5 h-5 mr-2" /> },
    { path: '/contact', label: 'Call Us', icon: <Phone className="w-5 h-5 mr-2" /> },
    { path: '/privacy', label: 'Privacy Policy', icon: <FileText className="w-5 h-5 mr-2" /> },
    { path: '/admin', label: 'Admin', icon: <Shield className="w-5 h-5 mr-2" /> },
  ];

  return (
    <nav className="bg-card shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">XO</span>
              <span className="ml-1 text-2xl font-bold text-secondary">Online</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            
            {user ? (
              <div className="flex items-center ml-4">
                <NavLink to="/dashboard" className="flex items-center nav-link">
                  <User className="w-5 h-5 mr-2" />
                  Dashboard
                </NavLink>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="flex items-center ml-2"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card shadow-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md flex items-center ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md flex items-center ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-2" />
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md flex items-center text-foreground"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
