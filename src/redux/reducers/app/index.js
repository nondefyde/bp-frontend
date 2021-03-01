import { LOGIN, LOGOUT, UPDATE_SESSION_TOKEN } from "../../actions";

const defaultState = {
  user: {
    data: null,
    session: null,
  },
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          data: action.payload,
        },
      });

    case UPDATE_SESSION_TOKEN:
      return Object.assign({}, state, {
        user: { ...state.user, session: action.payload },
      });
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

export default appReducer;
