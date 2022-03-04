import React from 'react';
import Header from 'lib/components/header';

// master layout for page
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
