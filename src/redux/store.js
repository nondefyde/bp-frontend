import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import customMiddleWares from './middlewares';
import appReducers from './reducers';


const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP_STATE') {
        state = undefined;
    }
    return appReducers(state, action);
};

// add the middleWares
const middleWares = [...customMiddleWares];

if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
}

// apply the middleware
let middleware = applyMiddleware(...middleWares);

if (
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

// create the store
const store = createStore(rootReducer, {}, middleware);

export default store;
