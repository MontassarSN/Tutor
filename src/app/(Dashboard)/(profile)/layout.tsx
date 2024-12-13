import React, { ReactNode } from 'react';
import Navbar from './components/navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className="bg-customBg w-full h-[15rem]">
      </div>
      <Navbar />
      <div className="">{children}</div>

    </div>
  );
};

export default Layout;
