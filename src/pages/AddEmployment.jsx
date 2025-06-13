import React, { useState, useEffect } from 'react'
import { useSidebar } from '../context/SidebarContext'
import '../styles/pages/_add-employment.scss'
import Button from '../utils/Button'
import Dropdown from '../utils/Dropdown'
import { useForm } from 'react-hook-form'
import FetchUsersEmailFunctions from '../functions/FetchUsersEmailFunctions'

const AddEmployment = () => {

  const { isCollapsed } = useSidebar()
  const { register, handleSubmit } = useForm()
  
  // Add error state
  const [errors, setErrors] = useState({})

  const {
    usersEmail,
    fetchUsersEmail 
  } = FetchUsersEmailFunctions()

  useEffect(() => {
    fetchUsersEmail()
  }, [])

  const employeeOptions = usersEmail

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
    basicSalary: '40,000.00',
    gmail: ''
  });

  // For handling the change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle dropdown selection
  const handleDropdownSelect = (selectedOption) => {
    const employee = employeeOptions.find(opt => opt.value === selectedOption.value);
    if (employee) {
      setFormData(prev => ({
        ...prev,
        gmail: employee.fullName,
        gender: '',
        employeeId: employee.value
      }));
      // Clear errors for auto-filled fields
      setErrors(prev => ({
        ...prev,
        fullName: '',
        gender: '',
        gmail: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 
      'employeeId', 
      'gender', 
      'gmail', 
      'basicSalary',
      'sss',
      'hdmf',
      'philhealth',
      'tin'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Special validation for basic salary
    if (formData.basicSalary && isNaN(parseFloat(formData.basicSalary))) {
      newErrors.basicSalary = 'Basic salary must be a valid number';
    }

    // Format validation for SSS
    if (formData.sss && !/^\d{2}-\d{7}-\d{1}$/.test(formData.sss)) {
      newErrors.sss = 'SSS must be in format: 00-0000000-0';
    }

    // Format validation for HDMF
    if (formData.hdmf && !/^\d{4}-\d{4}-\d{4}$/.test(formData.hdmf)) {
      newErrors.hdmf = 'HDMF must be in format: 0000-0000-0000';
    }

    // Format validation for PhilHealth
    if (formData.philhealth && !/^\d{2}-\d{9}-\d{1}$/.test(formData.philhealth)) {
      newErrors.philhealth = 'PhilHealth must be in format: 00-000000000-0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // For handling the submit of the form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <section className={`add-employment-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
       
      <div className='add-employment-header-container'>
        {/* This is for the left side */}
         <div className='add-employment-header'>
            <h1>ADD EMPLOYMENT</h1>
            <p>Register new employee information and salary details</p>
         </div>

         {/* This is for the search dropdown right side */}
         <div className='add-employment-search'>
           <h4>Search Employee</h4>
              <Dropdown 
                options={employeeOptions} 
                label="Search Employee Email" 
                onSelect={handleDropdownSelect} 
                register={register} 
              />
         </div>
      </div>
    
        <form className='form-container' onSubmit={handleSubmitForm}>

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
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>

                  {/* Gmail */}
                  <div className='gmail'>
                    <label>Gmail</label>
                    <input
                      name="gmail"
                      placeholder="Enter gmail"
                      value={formData.gmail}
                      onChange={handleChange}
                      className={errors.gmail ? 'error' : ''}
                    />
                    {errors.gmail && <span className="error-message">{errors.gmail}</span>}
                  </div>

                {/* For employee ID */}
                  <div className='employee-id'>
                    <label>Employee ID</label>
                    <input
                      name="employeeId"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className={errors.employeeId ? 'error' : ''}
                    />
                    {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
                  </div>
                  
                {/* For gender */}
                  <div className='gender'>
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={errors.gender ? 'error' : ''}
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>

                  {/* For TIN */}
                  <div className='tin'>
                    <label>TIN</label>
                    <input
                      name="tin"
                      placeholder="000-000-000"
                      value={formData.tin}
                      onChange={handleChange}
                      className={errors.tin ? 'error' : ''}
                    />
                    {errors.tin && <span className="error-message">{errors.tin}</span>}
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
                    className={errors.sss ? 'error' : ''}
                  />
                  {errors.sss && <span className="error-message">{errors.sss}</span>}
                </div>
                
                {/* For HDMF */}
                <div className='hdmf'>
                  <label>HDMF</label>
                  <input
                    name="hdmf"
                    placeholder="0000-0000-0000"
                    value={formData.hdmf}
                    onChange={handleChange}
                    className={errors.hdmf ? 'error' : ''}
                  />
                  {errors.hdmf && <span className="error-message">{errors.hdmf}</span>}
                </div>

                {/* For PhilHealth */}
                <div className='philhealth'>
                  <label>PhilHealth</label>
                  <input
                    name="philhealth"
                    placeholder="00-000000000-0"
                    value={formData.philhealth}
                    onChange={handleChange}
                    className={errors.philhealth ? 'error' : ''}
                  />
                  {errors.philhealth && <span className="error-message">{errors.philhealth}</span>}
                </div>

                {/* For Basic Salary */}
                <div className='basic-salary'>
                  <label>Basic Salary (Monthly)</label>
                  <input
                    name="basicSalary"
                    placeholder="0.00"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    className={errors.basicSalary ? 'error' : ''}
                    />
                    {errors.basicSalary && <span className="error-message">{errors.basicSalary}</span>}
                </div>


              </div>
        </form>

            <div className='calculate-button'>
                <Button 
                        variant='primary' 
                        size='large' 
                        onClick={handleSubmitForm}
                        >
                            Add Employment
                </Button>
            </div>

    </section>
  )
}

export default AddEmployment