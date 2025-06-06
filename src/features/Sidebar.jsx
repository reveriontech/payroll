import React, { useState, useEffect } from 'react'
import '../styles/features/_sidebar.scss'
import { Link } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'
import { MdDashboard, MdPeople, MdCalculate, MdDescription, MdPersonAdd, MdClose } from 'react-icons/md'

const Sidebar = () => {
  const { isCollapsed, isMobileOpen, isMobile, closeMobileSidebar, toggleSidebar } = useSidebar()
  const [isTablet, setIsTablet] = useState(false)

  // Check if we're on tablet
  useEffect(() => {
    const checkTablet = () => {
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024
      setIsTablet(tablet)
    }
    
    checkTablet()
    window.addEventListener('resize', checkTablet)
    
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  // Determine if sidebar should appear collapsed (for display purposes)
  // On tablet, respect the collapsed state instead of forcing it
  const shouldShowCollapsed = isCollapsed

  // Handle close button click - different behavior for mobile vs tablet
  const handleCloseClick = () => {
    if (isMobile) {
      closeMobileSidebar() // For mobile: close the sidebar overlay
    } else if (isTablet) {
      toggleSidebar() // For tablet: collapse the sidebar
    }
  }

  const menuItems = [
    { icon: <MdDashboard />, text: 'Dashboard', path: '/dashboard' },
    { icon: <MdPeople />, text: 'Employee List', path: '/employlist' },
    { icon: <MdCalculate />, text: 'Calculate Payroll', path: '/calculate' },
    { icon: <MdDescription />, text: 'View Payslip', path: '/paysliplist' },
    { icon: <MdPersonAdd />, text: 'Add Employee', path: '/addemployment' }
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div 
          className="mobile-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      <section className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className='sidebar-header'>
            {/* Mobile and Tablet close button */}
            {((isMobile && isMobileOpen) || (isTablet && !isCollapsed)) && (
              <button 
                className="mobile-close-button"
                onClick={handleCloseClick}
                aria-label="Close sidebar"
              >
                <MdClose />
              </button>
            )}
            
            <div className='sidebar-header-logo'>
                {!shouldShowCollapsed && !isMobile && (
                  <>
                    <p className='sidebar-header-logo-title'>ReverionTech</p>
                    <p className='sidebar-header-logo-subtitle'>Payroll system</p>
                  </>
                )}
                {(shouldShowCollapsed || (isTablet && isCollapsed)) && !isMobileOpen && (
                  <p className='sidebar-header-logo-title-collapsed'>RT</p>
                )}
                {isMobile && isMobileOpen && (
                  <>
                    <p className='sidebar-header-logo-title'>ReverionTech</p>
                    <p className='sidebar-header-logo-subtitle'>Payroll system</p>
                  </>
                )}
            </div>
            <br />
            <hr />
        </div>

        <div className='sidebar-header-menu'>
                <ul>
                    {menuItems.map((item, index) => (
                      <li key={index}>
                          <Link 
                            to={item.path} 
                            className='menu-item'
                            onClick={closeMobileSidebar}
                          >
                              <span className='menu-icon'>{item.icon}</span>
                              {(!shouldShowCollapsed || isMobileOpen) && <span className='menu-text'>{item.text}</span>}
                          </Link>
                      </li>
                    ))}
                </ul>
            </div>
        
    </section>
    </>
  )
}

export default Sidebar