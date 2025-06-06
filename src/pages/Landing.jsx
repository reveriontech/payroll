import React from 'react'
import Button from '../utils/Button'
import '../styles/pages/_landing.scss'
import { useNavigate } from 'react-router-dom'  

const Landing = () => {
    const navigate = useNavigate()

  return (
    <section className='landing'>
        <div 
          className='landing-title'
        >
            Reverion Payroll
        </div>
        <Button variant='outline' 
            size='small'
            onClick={() => {
                navigate('/dashboard')
            }}
        >
            Proceed
        </Button>
    </section>
  )
}

export default Landing