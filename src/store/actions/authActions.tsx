import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { AuthAction } from "../reducers/authReducer";
import axios from "axios";

import { toast } from "react-toastify";

export interface loginSucces {
  type: ActionType.LOGIN_SUCCESS;
  auth_token: string | null;
}

export interface loginFail {
  type: ActionType.LOGIN_FAIL;
  error: string;
}

export interface loginUser {
  type: ActionType.LOGIN_USER;
  email: string;
  password: string;
}

export interface logoutUser {
  type: ActionType.LOGOUT_USER;
}

export const loginUserFn = (email: string, password: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    axios({
      method: "post",
      url: "", //promeniti url
      data: { email: email, password: password },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        dispatch({
          type: ActionType.LOGIN_SUCCESS,
          auth_token: response.data.auth_token, //odakle prevlacim taj token, tj sta mi se vraca kada logujem korisnika
        });
        localStorage.setItem("token", response.data.auth_token);
      })
      .catch((err) => {
        toast.error("Incorrect email or password.");
        dispatch({
          type: ActionType.LOGIN_FAIL,
          error: err.message,
        });
        console.log(err.message);
      });
  };
};

export const logoutUserFn = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
    localStorage.removeItem("token");
  };
};
