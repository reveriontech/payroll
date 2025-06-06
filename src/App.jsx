import React from 'react'
import './styles/main.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Approutes from './routes/Approutes'
import { SidebarProvider } from './context/SidebarContext'

const App = () => {
  return (
    <>
      <SidebarProvider>
        <Router>
          <Approutes />
        </Router>
      </SidebarProvider>
    </>
  )
}

export default App