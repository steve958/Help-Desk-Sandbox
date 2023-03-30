import { ActionType } from "../actions/actionTypes";
import { AuthState } from "../../interfaces";
import {
  loginUser,
  logoutUser,
  loginSucces,
  loginFail,
} from "../actions/authActions";

const initialState: AuthState = {
  user: {
    username: "",
    userId: "",
    firstName: "",
    lastName: "",
    isActive: null,
    email: "",
    phone: "",
    userType: { userTypeId: 0, userTypeName: "" },
  },
  token: null,
  error: "",
};
export type AuthAction = loginUser | logoutUser | loginSucces | loginFail;

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.auth_token,
      };

    case ActionType.LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        loginSuccess: false,
      };

    case ActionType.LOGIN_USER:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        token: null,
        user: {},
        error: "",
      };

    default:
      return state;
  }
};

export default reducer;
