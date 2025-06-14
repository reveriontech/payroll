import React from 'react'
import { Navigate } from 'react-router-dom'
import { Session } from './SessionProvider'
import PageLoader from '../components/PageLoader'

function AccessProvider({ children }) {
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
            (userDetails.usertype === 'User' || userDetails.usertype === 'Admin' || userDetails === 'Employee')) {
            if (homeRoutes.includes(location.pathname)) {
                return children
            } else {
                return <Navigate to="/" />
            }
        }
    }

    return children
}

export default AccessProvider