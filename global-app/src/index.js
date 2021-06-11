
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";

const name = "micro-global";

window[name] = {
  mount: function(container) {
    render(<App />, container);
  },
  unmount: function(container) {
    unmountComponentAtNode(container);
  }
};
