import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar'; // Adjust the path as necessary
import Footer from '@/components/Footer'; // Adjust the path as necessary

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
