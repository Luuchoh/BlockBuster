import React from "react";
import { Provider } from "react-redux";

import { store } from "../store/store";
import AppRouter from "../routers/AppRouter";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/style.css'

const TaskApp = () =>{
    return(
        <Provider store ={store}>
          <AppRouter />
        </Provider>
      );
}

export default TaskApp
