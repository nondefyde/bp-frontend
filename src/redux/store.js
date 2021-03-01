import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import customMiddleWares from "./middlewares";
import appReducers from "./reducers";

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP_STATE") {
    state = undefined;
  }
  return appReducers(state, action);
};

// add the middleWares
const middleWares = [...customMiddleWares];

if (process.env.NODE_ENV !== "production") {
  middleWares.push(createLogger());
}

// apply the middleware
let middleware = applyMiddleware(...middleWares);

if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const persistedState = loadState();
// create the store
const store = createStore(rootReducer, persistedState, middleware);
// export const persistor = persistStore(store);

store.subscribe(() => {
  saveState({
    app: store.getState().app,
  });
});

// export
export default store;

function loadState() {
  try {
    const serializedState = localStorage.getItem("bp-products-landing");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    localStorage.setItem("bp-products-landing", JSON.stringify(state));
  } catch (e) {}
}
