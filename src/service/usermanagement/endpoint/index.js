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

// Post Register
export const PostRegisterUser = async (username, password, email, role) => {
    try {
        const response = await UserManagementService.post('/api/register/', {
            username: username,
            password: password,
            email: email,
            role: role
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get User Details
export const GetUserDetails = async (id) => {
    try {
        const response = await UserManagementService.get(`/api/user/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Update User Details
export const PutEditUserDetails = async (id, username, email, role) => {
    try {
        const response = await UserManagementService.put(`/api/user/${id}/`, {
            username: username,
            email: email,
            role: role
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}