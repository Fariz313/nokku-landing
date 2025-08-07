import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <>
      <div className='flex min-h-screen max-w-screen bg-black'>
        <div className='grow overflow-hidden flex flex-col'>
          <Navbar></Navbar>
          <main className='flex-1'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;