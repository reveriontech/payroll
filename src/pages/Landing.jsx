import React from 'react'
import Button from '../utils/Button'
import '../styles/pages/_landing.scss'
import GoogleAuth from '../functions/GoogleAuth'

const Landing = () => {

    const {
        isGoogleSigningIn,
        handleGoogleSignIn
    } = GoogleAuth()

  return (
    <section className='landing'>
        <div 
          className='landing-title'
        >
            Reverion Payroll
        </div>
        <Button variant='outline' 
            size='small'
            onClick={handleGoogleSignIn}
        >
            {isGoogleSigningIn ? ('Authenticating') : ('Authenticate')}
        </Button>
    </section>
  )
}

export default Landing