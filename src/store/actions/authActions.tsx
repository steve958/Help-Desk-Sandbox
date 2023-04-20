import { ActionType } from "./actionTypes";
import { Dispatch } from "redux";
import { AuthAction } from "../reducers/authReducer";
import axios from "axios";

import { toast } from "react-toastify";
import { User } from "../../interfaces";

export interface loginSucces {
  type: ActionType.LOGIN_SUCCESS;
  auth_token: string | null;
  user: User;
}

export interface loginFail {
  type: ActionType.LOGIN_FAIL;
  error: string;
}

export interface loginUser {
  type: ActionType.LOGIN_USER;
  username: string;
  password: string;
}

export interface logoutUser {
  type: ActionType.LOGOUT_USER;
}

export const loginUserFn = (username: string, password: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    axios({
      method: "post",
      url: "", //promeniti url
      data: { username: username, password: password },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        dispatch({
          type: ActionType.LOGIN_SUCCESS,
          auth_token: response.data.auth_token,
          user: response.data.user,
        });
        localStorage.setItem("token", response.data.auth_token);
      })
      .catch((err) => {
        toast.error("Incorrect username or password.");
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
