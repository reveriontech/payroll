import React, { useState, useEffect } from 'react'
import '../styles/features/_upnav.scss'
import { GoSidebarExpand } from "react-icons/go";
import { useSidebar } from '../context/SidebarContext'

const Upnav = () => {
  const { toggleSidebar, isCollapsed } = useSidebar()
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle button click - same action but context-aware
  const handleToggle = () => {
    toggleSidebar() // The sidebar context will handle mobile vs desktop behavior
  }

  return (
    <section className={`upnav ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
       <GoSidebarExpand 
         size={30} 
         onClick={handleToggle}
       />
    </section>
  )
}

export default Upnav