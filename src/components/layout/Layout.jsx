import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import OfferBanner from '../ui/OfferBanner';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <OfferBanner />
    </div>
  );
};

export default Layout;
