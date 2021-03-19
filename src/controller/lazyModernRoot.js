import React from "react";
import { useContext, useMemo, useRef, useLayoutEffect } from "react";
import { __RouterContext } from "react-router";

let rendererModule = {
  status: "pending",
  promise: null,
  result: null,
};

export default function lazyModernRoot(getModernComponent) {
  let componentModule = {
    status: "pending",
    promise: null,
    result: null,
  };
  return function Wrapper(props) {
    const createModernRoot = readModule(rendererModule, () =>
      import("../modern/createModernRoot")
    ).default;
    const Component = readModule(componentModule, getModernComponent).default;
    const containerRef = useRef(null);
    const rootRef = useRef(null);

    // Populate every contexts we want the modern subtree to see.
    // Then in src/modern/createModernRoot we will apply them.
    const router = useContext(__RouterContext);
    const context = useMemo(
      () => ({
        router,
      }),
      [router]
    );

    // Create/unmount.
    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createModernRoot(containerRef.current);
      }
      const root = rootRef.current;
      return () => {
        root.unmount();
      };
    }, [createModernRoot]);

    // Mount/update.
    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context);
      }
    }, [Component, props, context]);

    return <div ref={containerRef} />;
  };
}

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the modern React to render it.
function readModule(record, createPromise) {
  if (record.status === "fulfilled") {
    return record.result;
  }
  if (record.status === "rejected") {
    throw record.result;
  }
  if (!record.promise) {
    record.promise = createPromise().then(
      (value) => {
        if (record.status === "pending") {
          record.status = "fulfilled";
          record.promise = null;
          record.result = value;
        }
      },
      (error) => {
        if (record.status === "pending") {
          record.status = "rejected";
          record.promise = null;
          record.result = error;
        }
      }
    );
  }
  throw record.promise;
}
