import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BaseProvider, LightTheme } from 'baseui';

import App from "./App";
import configureStore from "./store/configureStore";

const store = configureStore();
const engine = new Styletron();

function Root() {
  return (
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <App />
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  );

}

export default Root;