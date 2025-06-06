import React from 'react'
import { useSidebar } from '../context/SidebarContext'
import '../styles/pages/_add-employment.scss'


const AddEmployment = () => {
  const { isCollapsed } = useSidebar()

  return (
    <section className={`add-employment-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <h1>Add Employment</h1>
      <p>Register new employee information and salary details</p>
    
        <form className='form-container'>

             {/* This div is for left side */}
              <div className='container-left'>


               {/* For full name */}
                  <div className='full-name'>
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      placeholder="Enter full name"
                    
                    />
                  </div>

                {/* For employee ID */}
                  <div className='employee-id'>
                    <label>Employee ID</label>
                    <input
                      name="employeeId"
                      placeholder="Enter employee ID"
                    />
                  </div>
                  
                {/* For gender */}
                  <div className='gender'>
                    <label>Gender</label>
                    <select
                      name="gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                


              </div>

              {/* This div is for right side */}
              <div className='container-right'>
                <h4>Salary Details</h4>
              </div>
        </form>


    </section>
  )
}

export default AddEmployment