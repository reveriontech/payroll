import React from 'react'
import './styles/main.scss'
import Approutes from './routes/Approutes'
import { SidebarProvider } from './context/SidebarContext'

const App = () => {
  return (
    <>
      <SidebarProvider>
          <Approutes />
      </SidebarProvider>
    </>
  )
}

export default App