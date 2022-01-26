import React from 'react';
import CenterPlaylist from '../components/CenterPlaylist';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
  return (
        <div className="bg-black h-screen overflow-hidden">
        
        <main className='flex'>
            {/* Sidebar */}
            <Sidebar/>
            {/* Cetner */}
            <Outlet/>
        </main>
        <div className='sticky bottom-0'>
        {/* player */}
        <Player/>
        </div>
    </div>
  );
};

export default Dashboard;
