import {
  apiRequest,
  LOGIN,
  LOGOUT,
  POST,
  RESET_PASSWORD,
} from "../../actions/index";
import { API } from "../../../_shared/defs/_urls";
import { navigate } from "@reach/router";
import { isFunction } from "lodash";

const login = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === LOGIN.START) {
    const { onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: POST,
        url: API.LOGIN,
        key: "login",
        noErrorToast: true,
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
export default [login, resetPassword, logout];
