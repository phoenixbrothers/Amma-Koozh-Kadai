import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom' 
import logo from './images/logo.png'
import { Menu, X } from 'lucide-react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 968)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968)
      if (window.innerWidth > 968) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Desktop Navigation Component
  const DesktopNav = () => (
    <div className="header-container desktop-view">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Amma koozh kadai" className="logo-image" />
      </NavLink>
      
      <nav className="nav desktop-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={scrollToTop}
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={scrollToTop}
        >
          ABOUT US
        </NavLink>
        <NavLink
          to="/foods"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={scrollToTop}
        >
          OUR FOODS
        </NavLink>
      </nav>

      <button className="franchise-btn desktop-franchise">
        <NavLink to="/franchise" className="franchise-link" onClick={scrollToTop}>
          Franchise Enquiry
        </NavLink>
      </button>
    </div>
  )

  // Mobile Navigation Component
  const MobileNav = () => (
    <div className="header-container mobile-view">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Amma koozh kadai" className="logo-image" />
      </NavLink>

      <button className="franchise-btn mobile-franchise">
        <NavLink to="/franchise" className="franchise-link" onClick={scrollToTop}>
          Franchise Enquiry
        </NavLink>
      </button>
      
      <button 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X size={28} strokeWidth={2.5} />
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </button>

      <nav className={`nav mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
        >
          HOME
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
        >
          ABOUT US
        </NavLink>
        <NavLink
          to="/foods"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
        >
          OUR FOODS
        </NavLink>
      </nav>

      {/* Page overlay for mobile nav */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  )

  return (
    <header className="header">
      {/* Top Purple Banner */}
      <div className="top-banner">
        <div className="banner-container">
          <span className="banner-text">WELCOME TO AMMA KOOZHU KADAI</span>
          <span className="banner-timing">Shop-Timing: 7AM - 6PM</span>
        </div>
      </div>

      {/* Conditional Rendering: Desktop or Mobile */}
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </header>
  )
}

export default Header
