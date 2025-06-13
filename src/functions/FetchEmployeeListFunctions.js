import React, { useState, useEffect } from 'react'
import supabaseApi from '../supabase/supabaseApi'

function FetchEmployeeListFunctions() {

    const [loading, setLoading] = useState(true)
    const [usersEmployee, setUsersEmployee] = useState([])
    const [loadingFields, setLoadingFields] = useState([])

    const fetchEmployeeList= async () => {

        setLoading(true)

        try {
            const { data: result } = await supabaseApi.post('/employee', {})

            const emp = result.data.usersEmployee.map(emp => ({
                id: emp.id,
                fullName: emp.fullname,
                username: emp.username,
                gender: emp.gender,
                sss: emp.sss,
                hdmf: emp.hdmf,
                philhealth: emp.philhealth,
                tin: emp.tin,
                salary: emp.salary
            }))

            setUsersEmployee(emp)
            console.log(emp)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return {
       loading,
       usersEmployee,
       loadingFields,
       fetchEmployeeList 
    }
}

export default FetchEmployeeListFunctions