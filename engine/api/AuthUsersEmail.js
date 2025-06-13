import supabase from '../supabase/SupabaseClient.js'

export const users = async (req, res) => {

    try {
        
        const { data: usersEmail, error: usersEmailError } = await supabase
            .from('users')
            .select('id, username')
            .eq('usertype', 'User')

        if (usersEmailError) {
            return res.status(401).json({
                error: 'User details not found.',
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                usersEmail
            }
        })

    } catch (error) {
        return res.status(500).json({
            error: 'An unexpected error occurred. Please try again later.'
        })
    }
}