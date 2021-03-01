import {
  apiRequest,
  LOGIN,
  LOGOUT,
  POST,
  PUT,
  RESET_PASSWORD,
  UPDATE_PROFILE,
} from "../../actions/index";
import { API } from "../../../_shared/defs/_urls";
import { navigate } from "@reach/router";
import { isFunction } from "lodash";
import { toast } from "react-toastify";

const login = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === LOGIN.START) {
    const { onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: POST,
        url: API.LOGIN,
        key: "login",
        successMessage: "Your login was successful, welcome back",
        noSuccessToast: false,
        noErrorToast: false,
        onSuccess: (data) => {
          dispatch({ type: LOGIN.SUCCESS, payload: data });
          navigate("/");
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        },
        ...rest,
      })
    );
  }
};

const updateProfile = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === UPDATE_PROFILE.START) {
    const { onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: PUT,
        url: `${API.USER}/me`,
        key: "updateProfile",
        noErrorToast: false,
        noSuccessToast: false,
        errorMessage: "Oops! could not update your profile, please try again",
        onSuccess: (data) => {
          dispatch({ type: UPDATE_PROFILE.SUCCESS, payload: data });

          if (isFunction(onSuccess)) {
            onSuccess();
          }
        },
        ...rest,
      })
    );
  }
};

const resetPassword = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === RESET_PASSWORD.START) {
    dispatch(
      apiRequest({
        method: POST,
        url: API.RESET_PASSWORD,
        key: "resetPassword",
        ...action.meta,
      })
    );
  }
};

const logout = ({ dispatch }) => (next) => (action) => {
  next(action);
  const { type } = action;
  if (type === LOGOUT) {
    navigate("/");
    dispatch({ type: "RESET_APP_STATE" });
  }
};
export default [login, resetPassword, logout, updateProfile];
