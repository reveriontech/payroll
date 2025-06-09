import React, { useState } from 'react'
import { useSidebar } from '../context/SidebarContext'
import '../styles/pages/_add-employment.scss'
import Button from '../utils/Button'


const AddEmployment = () => {
  const [profileImage, setProfileImage] = useState(null);

  const { isCollapsed } = useSidebar()

  const handleAddEmployment = () => {
    console.log('Add Employment')
  }

  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    gender: '',
    tin: '',
    sss: '',
    hdmf: '',
    philhealth: '',
    basicSalary: '40000.00',
  });

  // For handling the change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // For handling the submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className={`add-employment-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <h1>ADD EMPLOYMENT</h1>
      <p>Register new employee information and salary details</p>
    
        <form className='form-container' onSubmit={handleSubmit}>

             {/* This div is for left side */}
              <div className='container-left'>

               {/* For full name */}
                  <div className='full-name'>
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                {/* For employee ID */}
                  <div className='employee-id'>
                    <label>Employee ID</label>
                    <input
                      name="employeeId"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                    />
                  </div>
                  
                {/* For gender */}
                  <div className='gender'>
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* For TIN */}
                  <div className='tin'>
                    <label>TIN</label>
                    <input
                      name="tin"
                      placeholder="000-000-000"
                      value={formData.tin}
                      onChange={handleChange}
                    />
                  </div>

                  {/* For uplaod image */}
                  
                  <div className='profile-image'>
                    <label>Profile Image</label>
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProfileImage(file);
                          console.log('Selected file:', file);
                        }
                      }}
                    />
                  </div>
              </div>

              {/* This div is for right side */}
              <div className='container-right'>

                {/* For SSS */}
                <div className='sss'>
                  <label>SSS</label>
                  <input
                    name="sss"
                    placeholder="00-0000000-0"
                    value={formData.sss}
                    onChange={handleChange}
                  />
                </div>
                
                {/* For HDMF */}
                <div className='hdmf'>
                  <label>HDMF</label>
                  <input
                    name="hdmf"
                    placeholder="0000-0000-0000"
                    value={formData.hdmf}
                    onChange={handleChange}
                  />
                </div>

                {/* For PhilHealth */}
                <div className='philhealth'>
                  <label>PhilHealth</label>
                  <input
                    name="philhealth"
                    placeholder="00-000000000-0"
                    value={formData.philhealth}
                    onChange={handleChange}
                  />
                </div>

                {/* For Basic Salary */}
                <div className='basic-salary'>
                  <label>Basic Salary (Monthly)</label>
                  <input
                    name="basicSalary"
                    placeholder="0.00"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    />
                </div>


              </div>
        </form>

            <div className='calculate-button'>
                <Button 
                        variant='primary' 
                        size='large' 
                        onClick={handleAddEmployment}
                        >
                            Add Employment
                </Button>
            </div>

    </section>
  )
}

export default AddEmployment