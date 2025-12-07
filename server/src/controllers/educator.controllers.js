import {clerkClient} from '@clerk/express'


// Update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId;

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role:'educator',
            }
        })

        res.status(200).json({success: true, message: 'you can publish a course now'})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}