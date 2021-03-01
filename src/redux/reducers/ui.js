import { UI_ERROR, UI_LOADING, UI_SET_PAGINATION } from "../actions/index";
import { get } from "lodash";

const defaultState = {
  route: get(window.location, "pathname"),
  module: "app",
  errors: {},
  loading: {},
  pagination: {},
};

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UI_LOADING.START:
      return getNewLoadingState(state, action, true);
    case UI_LOADING.END:
      return getNewLoadingState(state, action, false);
    case UI_ERROR:
      return Object.assign({}, state, {
        errors: { ...state.errors, [action.key]: action.value },
      });
    case UI_SET_PAGINATION.START:
      const { key, payload } = action.meta;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [key]: payload,
        },
      };
    default:
      return state;
  }
};

export default uiReducer;

function getNewLoadingState(currentState = {}, action, value) {
  const { key } = action;
  return Object.assign({}, currentState, {
    loading: { ...currentState.loading, [key]: value },
  });
}
