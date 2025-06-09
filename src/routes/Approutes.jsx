import React from 'react'
import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionProvider } from './SessionProvider'
import AccessProvider from './AccessProvider'
import HomeProvider from './HomeProvider'

// Pages
import Home from '../pages/Home'
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard'
import Employlist from '../pages/Employlist'
import Calculate from '../pages/Calculate'
import Paysliplist from '../pages/Paysliplist'
import AddEmployment from '../pages/AddEmployment'
import Calendar from '../pages/Calendar'

const Approutes = () => {
  return (
    <>

      <BrowserRouter>

        <SessionProvider>

          <Routes>

              <Route path='/' element={<AccessProvider><Landing /></AccessProvider>} />

              <Route element={<HomeProvider><Home /></HomeProvider>}>

                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/employlist' element={<Employlist />} />
                    <Route path='/calculate' element={<Calculate />} />
                    <Route path='/paysliplist' element={<Paysliplist />} />
                    <Route path='/addemployment' element={<AddEmployment />} />
                    <Route path='/calendar' element={<Calendar />} />

              </Route>

          </Routes>

        </SessionProvider>

      </BrowserRouter>
        
    </>    
  )
}

export default Approutes