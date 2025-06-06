import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard'
import Employlist from '../pages/Employlist'
import Calculate from '../pages/Calculate'
import Paysliplist from '../pages/Paysliplist'
import AddEmployment from '../pages/AddEmployment'

const Approutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landing />} />

            <Route element={<Home />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/employlist' element={<Employlist />} />
                  <Route path='/calculate' element={<Calculate />} />
                  <Route path='/Paysliplist' element={<Paysliplist />} />
                  <Route path='/addemployment' element={<AddEmployment />} />
            </Route>
        </Routes>
    </div>    
  )
}

export default Approutes