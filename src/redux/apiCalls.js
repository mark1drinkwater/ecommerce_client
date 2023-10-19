import {
  loginFailure, loginStart, loginSuccess,
  logoutStart, logoutFailure, logoutSuccess,
  addUserStart, addUserSuccess, addUserFailure
} from "./userRedux";
import { publicRequest } from "../requestMethods";

//REDUX CALLS
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("Login failed", err)
    dispatch(loginFailure());
  }
};

export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(addUserSuccess(res.data));
  } catch (error) {
    console.log("addUser failed", error)
    const errorsData = error.response.data;
    const validationErrors = Object.keys(errorsData.errors).map(key => errorsData.errors[key].message)
    dispatch(addUserFailure(validationErrors));
  }
}

export const logout = async (dispatch) => {
  try {
    dispatch(logoutStart())
    dispatch(logoutSuccess())
  } catch (err) {
    console.log("Logout failed", err);
    dispatch(logoutFailure());
  }
}

//Direct api calls
// Subscribe to newsletter
export const subscribe = async (email) => {
  try {
    const res = await publicRequest.post("/subscribers", { email: email });  
    return {success: true, message: "Sign-up successful"};
  } catch (err) {    
    console.log("Error occurred subscribing user", err.response.data)
    return err.response.data;
  }
}

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    return {success: true, message: "Sign-up successful"};
  } catch (error) {
    console.log("addUser failed", error.response.data)
    const errorsData = error.response.data;
    const validationErrors = Object.keys(errorsData.errors).map(key => errorsData.errors[key].message)
    return {success: false, message:validationErrors};
  }
}