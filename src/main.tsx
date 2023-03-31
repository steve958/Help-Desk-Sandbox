import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { combineReducers } from "redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ticketReducer from "./store/reducers/ticketReducer";
import authReducer from "./store/reducers/authReducer";
import thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  tickts: ticketReducer,
  auth: authReducer,
});

const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type state = ReturnType<typeof rootReducer>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
