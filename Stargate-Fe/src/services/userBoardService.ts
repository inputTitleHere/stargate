import { api } from './api';

const fetchUserBoard = async () => {
  try {
    const response = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
  }
};

const fetchUserData = async () => {
  try {
    const response = await api.get('/fusers/get', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
  }
};

const updateUserData = async (formData: FormData) => {
  try {
    const response = await api.put('/fusers/update', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    console.log(response);
    alert('수정되었습니다.');
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
  }
};

const fetchRemindData = async (uuid : string) => {
  try {
    const response = await api.get(`/reminds/${uuid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.log(location)
    console.log('에러발생', error);
  }
};
export { fetchUserBoard, fetchUserData, updateUserData, fetchRemindData };