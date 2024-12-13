"use client";
import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import { useSearchParams } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen">
      <Sidebar  />
      <div className='flex flex-col mx-auto items-start'>
        <Navbar  />
        <main className="flex-grow mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
