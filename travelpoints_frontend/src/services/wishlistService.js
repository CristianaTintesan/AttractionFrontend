import getAxiosInstance from "./axiosInstance";

export const getUser = async (username) => {
    try {
        let response = await getAxiosInstance().get(`user/username/${username}`, {
            // params: { username },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWishlist = async () => {
    try {
        let response = await getAxiosInstance().get(`wishlist`);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const insertWishlist = async (attraction_id, user_id) => {
    try {
        console.log(user_id);
        console.log(attraction_id);
        let response = await getAxiosInstance().post(`wishlist`, {
           // user: {user_id},
            //attraction: {attraction_id},
           // attraction_id,
           // user_id
            attraction:{
                id : attraction_id
            },
            user:{
                id : user_id
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteWishlist = async (attraction_id, user_id) => {
    try {
        let response = await getAxiosInstance().delete(`wishlist/${attraction_id}/${user_id}`, {
            data: { user_id },
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};