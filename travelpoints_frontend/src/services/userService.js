import getAxiosInstance from "./axiosInstance";

export const createUser = async (id, firstName, lastName, username, password, role) => {
    try {
        console.log(id, firstName, lastName, username, password, role);
        let response = await getAxiosInstance().post(`user`, {
            id,
            firstName,
            lastName,
            username,
            password,
            role,
        });
        console.log(response.data);
        return "";
    } catch (error) {
        console.log(error.response);
        return "Email already exists";
    }
};

export const resetPassword = async (username, oldPassword, newPassword) => {
    try {
        console.log(username, oldPassword, newPassword);
        let response = await getAxiosInstance().post(`user/resetPassword`, {
            username,
            oldPassword,
            newPassword,
        });
        console.log(response.data);
        return true;
    } catch (error) {
        console.log(error.response);
        return false;
    }
};

