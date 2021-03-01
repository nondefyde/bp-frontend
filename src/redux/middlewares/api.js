import { isEmpty } from "lodash";
import { createAPIRequest } from "../../services/axios";
import {
  API_REQUEST,
  startUILoading,
  stopUILoading,
  uiSetPagination,
  updateUIError,
} from "../actions/index";
import { updateSessionToken } from "../actions";
import { formatMessagesFromError } from "../../_shared/utils";
import { toast } from "react-toastify";

export const processApiError = (error) => {
  let response = "";
  if (!error) {
    response = "An error occurred, please try again!";
  } else if (error.message) {
    response = error.message;
  } else if (error.messages) {
    Object.values(error.messages).forEach((message) => {
      response += `${message}\n`;
    });
  }
  return response || "An error occurred";
};
// @ts-ignore
const apiRequest = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_REQUEST.START) {
    const {
      method,
      url,
      key,
      payload,
      onError,
      successMessage,
      params,
      onSuccess,
      nextRoute,
      errorMessage,
      noSuccessToast,
      noErrorToast,
    } = action.meta;
    const config = { method, url };

    if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
      config.data = payload;
    }
    if (params && !isEmpty(params)) {
      config.params = params;
    }
    dispatch(updateUIError(key, null));
    dispatch(startUILoading(key));
    createAPIRequest(config)
      .then((response) => {
        const { data, meta } = response;
        if (meta && meta.pagination) {
          dispatch(uiSetPagination(key, meta.pagination));
        }
        if (meta && meta.token) {
          dispatch(updateSessionToken(meta.token));
        }
        if (onSuccess) {
          if (typeof onSuccess === "function") {
            onSuccess(data);
          } else {
            dispatch({ type: onSuccess, payload: data });
          }
        }
        dispatch(stopUILoading(key));
        const toastMessage = successMessage || (meta && meta.message);
        if (!noSuccessToast && toastMessage) {
          toast.dismiss();
          toast.success(toastMessage);
        }
      })
      .catch((e) => {
        const showErrorMessage = (message) => {
          if (!noErrorToast && method.toLowerCase() !== "get" && message) {
            toast.error(message);
          }
        };
        if (onError) {
          if (typeof onError === "function") {
            onError(e);
          } else {
            const message = formatMessagesFromError(e);
            dispatch(updateUIError(key, message));
            showErrorMessage(message);
          }
        } else {
          const error =
            (e && e.data && e.data.meta && e.data.meta.error) ||
            (e && e.error) ||
            e;
          const message = errorMessage || formatMessagesFromError(error);
          dispatch(updateUIError(key, message));
          showErrorMessage(message);
        }
        dispatch(stopUILoading(key));
      });
  }
  return next(action);
};

export default [apiRequest];
