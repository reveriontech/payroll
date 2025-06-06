import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../features/Sidebar'
import Upnav from '../features/Upnav'
import { useSidebar } from '../context/SidebarContext'

const Home = () => {
  const { isCollapsed } = useSidebar()

  return (
    <>
        <Sidebar />
        <Upnav />
        <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Outlet />
        </main>
    </>
  )
}

export default Home