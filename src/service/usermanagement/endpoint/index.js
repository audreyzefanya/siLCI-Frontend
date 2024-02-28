import UserManagementService from "../usermanagementService";

// [-----------User Management-----------]
// Post Login
export const PostLoginUser = async (username, password) => {
    try {
        const response = await UserManagementService.post('/api/login/', {
            'username': username,
            'password': password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}