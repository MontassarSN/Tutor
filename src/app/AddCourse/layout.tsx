import React, { ReactNode } from 'react';
import { OptionProvider } from './context/OptionContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <OptionProvider>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </OptionProvider>
  );
};

export default Layout;
