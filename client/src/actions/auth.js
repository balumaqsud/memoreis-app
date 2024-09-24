import * as api from "../api/index";
import { AUTH } from "../constants/constants";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    // sign in the user

    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });

    navigate("/");
    console.log(formData);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
