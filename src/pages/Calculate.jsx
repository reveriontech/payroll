import { useState, useMemo } from 'react'
// import {useState, useMemo} from 'react'
import '../styles/pages/_calculate.scss'
import Button from '../utils/Button'

const Calculate = () => {

    // State for employee information
    const [employee, setEmployee] = useState('');
    const [payPeriod, setPayPeriod] = useState({
      start: '',
      end: ''
    });

    // State for working days
    const [workingDays, setWorkingDays] = useState(0);
    const [allowances, setAllowances] = useState({
        internet: 0,
        rice: 0,
        uniform: 0,
        medical: 0
    });

    // Handle employee change
    const handleEmployeeChange = (e) => {
        setEmployee(e.target.value);
    };

    // Handle pay period change
    const handlePayPeriodChange = (e) => {
        setPayPeriod({
            ...payPeriod,
            [e.target.name]: e.target.value
        });
    };

    // Handle working days change
    const handleWorkingDaysChange = (e) => {
        setWorkingDays(e.target.value);
    };

    // Handle allowance change
    const handleAllowanceChange = (e) => {
        setAllowances({
            ...allowances,
            [e.target.name]: e.target.value
        });
    };
    
      // Calculate total allowances
      const totalAllowance = useMemo(() => {
        return Object.values(allowances).reduce((sum, val) => sum + val, 0);
      }, [allowances]);
    
      // Calculate payroll on button click and display the result
      const handleCalculatePayroll = () => {
        const payrollData = {
          employee,
          payPeriod,
          workingDays,
          allowances,
          totalAllowance,
        };
    
        console.log('Payroll Computation:', payrollData);
        alert(`Payroll calculated for Employee ID: ${employee}\nTotal Allowance: ₱${totalAllowance}`);
      };
    
  return (
    <section className='calculate-container'>
        <h1>Calculate Payroll</h1>
        <p>Process employee payroll for the selected period</p>

            <div className='second-container'>

                {/* This div is for left side */}
                <div className='container-left'>

                    <h4>Employee Information</h4>

                    {/* For select */}
                    <div className='select-employee'>
                        <label>Select Employee</label>
                        <select onChange={handleEmployeeChange}>
                            <option value="">Choose Employee</option>
                            <option value="1">Juan Dela Cruz</option>
                            <option value="2">Maria Santos</option>
                            <option value="3">Pedro Reyes</option>
                        </select>
                    </div>

                        {/* For select START period */}

                        <div className='select-start'>
                            <label>Pay Period Start</label>
                            <input type="date" name="start" title='Pay Period Start' onChange={handlePayPeriodChange} />
                        </div>

                        {/* For select END period */}
                        <div className='select-end'>
                            <label>Pay Period End</label>
                            <input type="date" name="end" title='Pay Period End' onChange={handlePayPeriodChange} />
                       </div>

                        {/* For working days */}

                        <div className='working-days'>
                            <label>Working Days</label>
                            <input type="number" title='Working Days' onChange={handleWorkingDaysChange} />
                        </div>
                            
                    </div>


                    {/* This div is for right side */}
                    <div className='container-right'>
                        <h4>Allowances</h4>

                        {/* Internet Allowance */}
                        <div className='internet-allowance'>
                            <label>Internet Allowance</label>
                            <input type="number" name="internet" title='Internet Allowance' onChange={handleAllowanceChange} />
                        </div>

                        {/* Rice Subsidy */}
                        <div className='rice-subsidy'>
                            <label>Rice Subsidy</label>
                            <input type="number" name="rice" title='Rice Subsidy' onChange={handleAllowanceChange} />
                        </div>

                        {/* Uniform Allowance */}
                        <div className='uniform-allowance'>
                            <label>Uniform Allowance</label>
                            <input type="number" name="uniform" title='Uniform Allowance' onChange={handleAllowanceChange} />
                        </div>

                        {/* Medical Assistance */}
                        <div className='medical-assistance'>
                            <label>Medical Assistance</label>
                            <input type="number" name="medical" title='Medical Assistance' onChange={handleAllowanceChange} />
                        </div>
                        
                    </div>

             </div>
        {/* This div is for left side */}

        <div className='calculate-button'>
                <Button 
                        variant='primary' 
                        size='large' 
                        className='calculate-button'
                        onClick={handleCalculatePayroll}
                        >
                            Calculate
                </Button>
            </div>               





    </section>
  )
}

export default Calculate