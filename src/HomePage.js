import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.blurredBackground}></div>

      <div style={styles.popup}>
        <h1 style={styles.logo}>Package Tracking System</h1>
        <nav style={styles.nav}>
        <Link
            to="/create-order"
            style={{
              ...styles.navLink,
              ...(hoveredLink === 'create-order' ? styles.navLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink('create-order')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Create Order
          </Link>
          <Link
            to="/my-orders"
            style={{
              ...styles.navLink,
              ...(hoveredLink === 'my-orders' ? styles.navLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink('my-orders')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            My Orders
          </Link>
        
        </nav>
        <h2 style={styles.popupTitle}>Welcome to the Package Tracking System</h2>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  blurredBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/path/to/your/background-image.jpg")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(12px)', 
    zIndex: -1, 
  },
  popup: {
    position: 'relative', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: '40px 60px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '90%',
    zIndex: 1, 
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#004d99',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center', 
    gap: '25px',
    fontSize: '1.1rem',
    marginBottom: '30px',
  },
  navLink: {
    color: '#004d99',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  navLinkHover: {
    backgroundColor: '#006bb3',
    color: 'white',
    transform: 'scale(1.05)',
  },
  popupTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
};

export default HomePage;