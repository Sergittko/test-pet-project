import {
  usersAPI
} from '../api/api.js'

const GET_USERS = 'users_GET_USERS';
const GET_TOKEN = 'users_GET_TOKEN';
const ADD_USERS = 'users_ADD_USERS';
const ARE_USERS_FETCHING = 'users_ARE_USERS_FETCHING';

let initialState = {
  token: null,
  areUsersFething: false,
  getNextUsersPage: null,
  users: [],
}

const getUsers = (users, link) => ({
  type: GET_USERS,
  users,
  link
});
const addNewUsers = (newUsers, link) => ({
  type: ADD_USERS,
  newUsers,
  link
});
const getToken = token => ({
  type: GET_TOKEN,
  token
});
const areUsersFething = status => ({
  type: ARE_USERS_FETCHING,
  status
});

export const getUsersTh = (count = 9) => async dispatch => {
  let users = await usersAPI.getUsers(count);
  dispatch(getUsers(users.data.users, users.data.links.next_url));
}
export const addUsersTh = (link) => async dispatch => {
  dispatch(areUsersFething(true))
  let users = await usersAPI.getNewUsers(link);
  dispatch(addNewUsers(users.data.users, users.data.links.next_url));
  dispatch(areUsersFething(false))
}
export const getTokenTh = () => async dispatch => {
  let response = await usersAPI.getToken();
  dispatch(getToken(response.data.token));
}
export const saveNewUserTh = (token, newUserData, count = 9) => async dispatch => {
  let formData = new FormData();
  formData.append("position_id", newUserData.position_id);
  formData.append("name", newUserData.name);
  formData.append("email", newUserData.email);
  formData.append("phone", newUserData.phone);
  formData.append("photo", newUserData.photo);
  let response = await usersAPI.addNewUser(token, newUserData)
    .then((resp)=>{
      // console.log(resp);
      if (resp.data.success){
         dispatch(getUsersTh(count));
         return true;
       }
    })
    .catch(error=>{
      // console.log(error.response.data.message);
      // console.log(error.response.data.fails);
      return false;
    })
    return response;
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [
            ...action.users,
          ],
          getNextUsersPage: action.link,
      };

    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case ADD_USERS:
      return {
        ...state,
        users: [
            ...state.users,
            ...action.newUsers,
          ],
          getNextUsersPage: action.link,
      };

    case ARE_USERS_FETCHING:
      return {
        ...state,
        areUsersFething: action.status,
      };

    default:
      return state;
  }
}

export default usersReducer;
