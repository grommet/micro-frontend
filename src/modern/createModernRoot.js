/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * https://github.com/reactjs/react-gradual-upgrade-demo/blob/main/src/legacy/createLegacyRoot.js
 * */

/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactDOM from "react-dom";

// Note: this is a semi-private API, but it's ok to use it
// if we never inspect the values, and only pass them through.
import { __RouterContext } from "react-router";

// Pass through every context required by this tree.
// The context object is populated in src/modern/withModernRoot.
function Bridge({ children, context }) {
  return (
    <__RouterContext.Provider value={context.router}>
      {children}
    </__RouterContext.Provider>
  );
}

export default function createModernRoot(container) {
  return {
    render(Component, props, context) {
      ReactDOM.render(
        <Bridge context={context}>
          <Component {...props} />
        </Bridge>,
        container
      );
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}
