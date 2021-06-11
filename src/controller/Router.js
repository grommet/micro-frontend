// NOTE: our routing needs are so simple, we roll our own
// to avoid dependencies on react-router, to stay leaner.

import React, { Children } from 'react';

export const RouterContext = React.createContext({});

export const Router = ({ children }) => {
  const [path, setPath] = React.useState();

  React.useEffect(() => {
    const onPopState = () => setPath(document.location.pathname);
    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const push = nextPath => {
    if (nextPath !== path) {
      window.history.pushState(
        undefined,
        undefined,
        nextPath + window.location.search,
      );
      setPath(nextPath);
      window.scrollTo(0, 0);
    }
  };

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { path: contextPath } = React.useContext(RouterContext);
  let found;
  Children.forEach(children, child => {
    if (!found && contextPath === child.props.path) found = child;
  });
  return found || null;
};

export const Route = ({ children, path }) => {
  const { path: contextPath } = React.useContext(RouterContext);
  return contextPath === path ? children : null;
};

export default Router;
