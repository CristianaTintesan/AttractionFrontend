import getAxiosInstance from './axiosInstance';

export const getReviewsForAttractionId = async (attractionId) => {
    try {
        let response = await getAxiosInstance().get(`review/attraction/${attractionId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addReview = async (

    message,
    rating,

) => {
    try {
        let response = await getAxiosInstance().post(`review`, {

            message,
            rating

        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};