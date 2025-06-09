import React from 'react'
import { Navigate } from 'react-router-dom'
import { Session } from './SessionProvider'

function HomeProvider({ children }) {
    const {
        loading,
        setLoading,
        user,
        setUser,
        userDetails,
        setUserDetails,
        navigate
    } = Session()

    const homeRoutes = [ '/dashboard', '/employlist', '/calculate', '/paysliplist', '/addemployment', '/calendar' ]

    if (loading) {
        return (
          <div className="loading">Loading<span className="dots"></span></div>
        )
    }

    if (!loading) {
        if (!userDetails) {
            return children
        }
    
        if (userDetails &&
            (userDetails.usertype === 'User' || userDetails.usertype === 'Admin')) {
            if (homeRoutes.includes(location.pathname)) {
                return children
            } else {
                return <Navigate to="/dashboard" />
            }
        }
    }

    return children
}

export default HomeProvider