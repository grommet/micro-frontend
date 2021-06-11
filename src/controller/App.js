import React, { useEffect, useRef, useState } from "react";
import { grommet, Button, Box, Grommet, Header, Nav } from "grommet";
import { Router, RouterContext, Routes, Route } from "./Router";

import Home from "./Home";

// name must match the global added by the script
const LazyGlobal = ({ name, url }) => {
  const [loaded, setLoaded] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    if (loaded) {
      // after it loads, mount the contents in the container
      window[name].mount(container);
    } else if (document.getElementById(name)) {
      setLoaded(true);
    } else {
      // inject a script tag for it
      // the sequence matters: appendChild, onload, src
      const script = document.createElement("script");
      script.id = name;
      document.body.appendChild(script);
      script.onload = () => setLoaded(true);
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
    }

    return () => {
      // when unmounting LazyGlobal, unmount the contents
      if (loaded) window[name].unmount(container);
    };
  }, [loaded, name, url]);

  return <div ref={containerRef} />;
};

// name must match the name of the web component name added by the script
const LazyWebComponent = ({ name, url }) => {
  const [loaded, setLoaded] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    if (loaded) {
      // after it loads, append the contents to the container
      const contents = document.createElement(name);
      container.appendChild(contents);
    } else if (document.getElementById(name)) {
      setLoaded(true);
    } else {
      // inject a script tag for it
      // the sequence matters: appendChild, onload, src
      const script = document.createElement("script");
      script.id = name;
      document.body.appendChild(script);
      script.onload = () => setLoaded(true);
      script.type = "text/javascript";
      script.async = true;
      script.src = url;
    }
  }, [loaded, name, url]);

  return <div ref={containerRef} />;
};

export const App = () => (
  <Router>
    <Grommet theme={grommet} full>
      <Box flex={false} margin="large" align="center">
        <Header width={{ width: "100%", max: "large" }}>
          <RouterContext.Consumer>
            {({ path, push }) => (
              <Nav direction="row">
                <Button
                  label="home"
                  active={path === "/"}
                  onClick={() => push("/")}
                />
                <Button
                  label="global"
                  active={path === "/global"}
                  onClick={() => push("/global")}
                />
                <Button
                  label="web component"
                  active={path === "/web-component"}
                  onClick={() => push("/web-component")}
                />
              </Nav>
            )}
          </RouterContext.Consumer>
        </Header>

        <Box role="main" width={{ width: '100%', max: 'large' }}>
          <Routes>
            <Route path="/web-component">
              <LazyWebComponent
                name="micro-web-component"
                url="http://127.0.0.1:8081/micro-web-component.js"
              />
            </Route>
            <Route path="/global">
              <LazyGlobal
                name="micro-global"
                url="http://127.0.0.1:8080/micro-global.js"
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Grommet>
  </Router>
);

export default App;
