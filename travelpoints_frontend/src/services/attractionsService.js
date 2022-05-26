import getAxiosInstance from './axiosInstance';

export const getAttractionsList = async () => {
  try {
    let response = await getAxiosInstance().get(`attraction`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAttraction = async (id) => {
  try {
    let response = await getAxiosInstance().delete(`attraction/${id}`, {
      data: { id },
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAttraction = async (
  id,
  name,
  description,
  location,
  price,
  photoUrl,
  isWish,
) => {
  try {
    let response = await getAxiosInstance().put(`attraction/${id}`, {
      id,
      name,
      description,
      location,
      price,
      photoUrl,
      isWish,
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addAttraction = async (
  name,
  description,
  location,
  price,
  photoUrl,
  isWish
) => {
  try {
    let response = await getAxiosInstance().post(`attraction`, {
      name,
      description,
      location,
      price,
      photoUrl,
      isWish
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAttraction = async (id) => {
  try {
    let response = await getAxiosInstance().get(`attraction/${id}`, {
      params: { id },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
