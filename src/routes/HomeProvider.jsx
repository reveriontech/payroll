import React from 'react'
import { Navigate } from 'react-router-dom'
import { Session } from './SessionProvider'
import PageLoader from '../components/PageLoader'

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
          <PageLoader/>
        )
    }

    if (!loading) {
        if (!userDetails) {
            return children
        }
    
        if (userDetails &&
            (userDetails.usertype === 'User' || userDetails.usertype === 'Admin' || userDetails.usertype === 'Employee')) {
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