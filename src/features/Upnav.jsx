import React from 'react'
import '../styles/features/_upnav.scss'
import { GoSidebarExpand } from "react-icons/go";
import { useSidebar } from '../context/SidebarContext'

const Upnav = () => {
  const { toggleSidebar, isCollapsed } = useSidebar()

  return (
    <section className={`upnav ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
       <GoSidebarExpand 
         size={30} 
         onClick={toggleSidebar}
       />
    </section>
  )
}

export default Upnav