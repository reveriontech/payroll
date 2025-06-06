import React from 'react'
import '../styles/features/_sidebar.scss'
import { Link } from 'react-router-dom'
import { useSidebar } from '../context/SidebarContext'
import { MdDashboard, MdPeople, MdCalculate, MdDescription, MdPersonAdd } from 'react-icons/md'

const Sidebar = () => {
  const { isCollapsed } = useSidebar()

  const menuItems = [
    { icon: <MdDashboard />, text: 'Dashboard', path: '/dashboard' },
    { icon: <MdPeople />, text: 'Employee List', path: '/employlist' },
    { icon: <MdCalculate />, text: 'Calculate Payroll', path: '/calculate' },
    { icon: <MdDescription />, text: 'View Payslip', path: '/paysliplist' },
    { icon: <MdPersonAdd />, text: 'Add Employee', path: '/addemployment' }
  ]

  return (
    <section className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='sidebar-header'>
            <div className='sidebar-header-logo'>
                {!isCollapsed && (
                  <>
                    <p className='sidebar-header-logo-title'>ReverionTech</p>
                    <p className='sidebar-header-logo-subtitle'>Payroll system</p>
                  </>
                )}
                {isCollapsed && (
                  <p className='sidebar-header-logo-title-collapsed'>RT</p>
                )}
            </div>
            <br />
            <hr />
        </div>

        <div className='sidebar-header-menu'>
                <ul>
                    {menuItems.map((item, index) => (
                      <li key={index}>
                          <Link to={item.path} className='menu-item'>
                              <span className='menu-icon'>{item.icon}</span>
                              {!isCollapsed && <span className='menu-text'>{item.text}</span>}
                          </Link>
                      </li>
                    ))}
                </ul>
            </div>
        
    </section>
  )
}

export default Sidebar