import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "../bll/store";
import {HashRouter} from "react-router-dom";
import {Main} from "./Main";

const App = () => (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Main/>
        </HashRouter>
      </Provider>
    </div>
);

export default App;