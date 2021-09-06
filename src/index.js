import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import TaskApp from "./containers/TaskApp";



ReactDOM.render(
  <Provider store ={store}>
    <TaskApp />
  </Provider>,
  document.getElementById("root")
);
