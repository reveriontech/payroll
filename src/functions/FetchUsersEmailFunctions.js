import React, { useState, useEffect } from 'react'
import supabaseApi from '../supabase/supabaseApi'

function FetchUsersEmailFunctions() {

    const [loading, setLoading] = useState(true)
    const [usersEmail, setUsersEmail] = useState(null)
    const [loadingFields, setLoadingFields] = useState([])

    const fetchUsersEmail= async () => {

        try {
            const { data: result } = await supabaseApi.post('/users', {})

            const users = result.data.usersEmail.map(user => ({
                label: user.username,
                value: user.id,
                fullName: user.username
            }))

            setUsersEmail(users)

        } catch (error) {
            console.log(error)
        }

    }

    return {
       loading,
       usersEmail,
       loadingFields,
       fetchUsersEmail 
    }
}

export default FetchUsersEmailFunctions