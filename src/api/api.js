import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/',
});

export const usersAPI = {
  getToken() {
    return instance.get('token');
  },
  getUsers(count) {
    return instance.get(`users?page=1&count=${count}`);
  },
  getNewUsers(link) {
    return axios.get(link);
  },
  getUserById(id) {
    return instance.get(`users/${id}`);
  },
  addNewUser(token, formData) {
    return instance.post('users', formData, {
      headers: {
        'Token': `${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
  }
}
