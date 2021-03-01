import { createActionString, createActionType } from "../../../_shared/utils";

export const LOGIN = createActionType("LOGIN", "Authentication");
export const UPDATE_PROFILE = createActionType(
  "UPDATE_PROFILE",
  "Authentication"
);
export const RESET_PASSWORD = createActionType("RESET_PASSWORD", "auth");
export const UPDATE_SESSION_TOKEN = createActionString(
  "UPDATE_SESSION_TOKEN",
  "auth"
);
export const LOGOUT = createActionString("LOGOUT", "auth");

export const login = (payload, onSuccess) => ({
  type: LOGIN.START,
  meta: { payload, onSuccess },
});
export const updateProfile = (payload, onSuccess) => ({
  type: UPDATE_PROFILE.START,
  meta: { payload, onSuccess },
});
export const logout = () => ({
  type: LOGOUT,
});
export const updateSessionToken = (token) => ({
  type: UPDATE_SESSION_TOKEN,
  payload: token,
});
