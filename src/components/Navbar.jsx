import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
    },
    logo: {
      textDecoration: 'none',
      fontWeight: 800,
      fontSize: '1.25rem',
      letterSpacing: '-0.5px',
      textTransform: 'uppercase',
    },
    menuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    desktopNavList: {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '16px',
    },
    navLink: {
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.95rem',
      letterSpacing: '-0.2px',
      transition: 'opacity 0.2s ease',
    },
    mobileMenu: {
      display: 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '64px',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    mobileNavList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: '16px 0',
      gap: '16px',
    },
  };

  // Responsive adjustments
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    styles.menuButton.display = 'block';
    styles.desktopNavList.display = 'none';
    styles.mobileMenu.display = isMenuOpen ? 'block' : 'none';
  }

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/news', label: 'News' },
    { href: '/projects', label: 'Projects' }
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <a href="/" style={styles.logo}>
          Terminus
        </a>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          style={styles.menuButton}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <ul style={styles.desktopNavList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                style={{
                  ...styles.navLink,
                  ':hover': { opacity: 0.75 }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          <ul style={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  style={{
                    ...styles.navLink,
                    ':hover': { opacity: 0.75 }
                  }}
                  onClick={toggleMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;