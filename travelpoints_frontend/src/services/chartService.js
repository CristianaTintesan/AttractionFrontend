import getAxiosInstance from './axiosInstance';

export const getVisited = async () => {
  try {
    let response = await getAxiosInstance().get(`visitedAttraction`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const insertVisited = async (timestamp, id) => {
  try {
    let response = await getAxiosInstance().post(`visitedAttraction`, {
      timestamp,
      attraction: { id },
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
