import getAxiosInstance from "./axiosInstance";

export const sendContactUsEmail = async (name, email, subject, message) => {
    try {
        console.log(name, email, subject, message);
        let response = await getAxiosInstance().post(`mail`, {
            name, email, subject, message
        });
        console.log(response.data);
        return "";
    } catch (error) {
        console.log(error.response);
    }
};