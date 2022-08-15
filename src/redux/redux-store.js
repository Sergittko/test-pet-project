import {createStore, combineReducers, applyMiddleware} from 'redux';
import users from './users_reducer';
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({ users });
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
