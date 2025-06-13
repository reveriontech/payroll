import supabase from '../supabase/SupabaseClient.js'

export const employee = async (req, res) => {

    try {
        
        const { data: usersEmployee, error: usersEmployeeError } = await supabase
            .from('users')
            .select('id, fullname, username, gender, sss, hdmf, philhealth, tin, salary')
            .eq('usertype', 'Employee')

        if (usersEmployeeError) {
            return res.status(401).json({
                error: 'User details not found.',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                usersEmployee
            }
        })

    } catch (error) {
        return res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        })
    }
}