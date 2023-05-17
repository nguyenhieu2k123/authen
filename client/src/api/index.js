import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('posts', newPost);
export const likePost = (id) => API.patch(`${'posts'}/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`${'posts'}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${'posts'}/${id}`);

export const signin = (formData) => API.post('user/signin', formData);
export const signup = (formData) => API.post('user/signup', formData);

export const fetchGoogleResponse = async (res) => {
  const googleDecodedRes = jwtDecode(res.credential);
  const { name, picture, sub } = googleDecodedRes;
  //   const user = {
  //     _id: sub,
  //     _type: 'user',
  //     userName: name,
  //     image: picture,
  //   };
  console.log(googleDecodedRes);
  return googleDecodedRes;
};
