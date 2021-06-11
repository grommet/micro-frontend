import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import App from "./App";

const name = "micro-web-component";

// https://medium.com/swlh/micro-frontend-using-web-components-e9faacfc101b
// Steps to create React Web Component
class Module extends HTMLElement {
  connectedCallback() {
    render(<App />, this);
  }
  disconnectedCallback() {
    unmountComponentAtNode(this);
  }
}

customElements.define(name, Module);
