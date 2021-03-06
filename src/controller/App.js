import React, { Suspense } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  grommet,
  Anchor,
  Avatar,
  Button,
  Box,
  Footer,
  Grommet,
  Header,
  Nav,
  Layer,
  List,
  Spinner,
  Text,
} from "grommet";

import {
  CircleInformation,
  Grommet as GrommetIcon,
  Github,
  Medium,
} from "grommet-icons";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

// LazyRoot has to have its own instance per module
import lazyLegacyRoot from "./lazyLegacyRoot";
import lazyModernRoot from "./lazyModernRoot";

import Home from "./Home";

// Lazy-load a component from the bundle using legacy Grommet.
const LegacyApp = lazyLegacyRoot(() => import("../legacy/LegacyApp"));

// Lazy-load a component from the bundle using modern Grommet.
const ModernApp = lazyModernRoot(() => import("../modern/ModernApp"));

export const AppContainer = ({ ...rest }) => {
  return (
    <Box
      fill
      flex
      margin={{ horizontal: "auto" }}
      width={{ max: "xlarge" }}
      height={{ min: "100%" }}
      {...rest}
    />
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #7d4cdb;
  }
  &:focus {
    outline: 1px solid #6fffb0;
  }
`;

const NavHeader = () => (
  <Header background="light-2" pad="medium">
    <StyledLink to="/">
      <Box direction="row" gap="small" align="center">
        <GrommetIcon color="brand" size="medium" />
        <Text align="center">Multi-Version Grommet</Text>
      </Box>
    </StyledLink>
    <Nav direction="row" aria-label="apps navigation">
      <StyledLink to="/legacy">Legacy</StyledLink>
      <StyledLink to="/modern">Modern</StyledLink>
    </Nav>
  </Header>
);

const AppFooter = () => {
  const [show, setShow] = useState(false);
  const gravatarLink =
    "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80";

  const resources = [
    {
      description: "Micro Frontend",
      source: "https://martinfowler.com/articles/micro-frontends.html",
    },
    {
      description: "Micro Frontend With React",
      source:
        "https://floqast.com/engineering-blog/post/implementing-a-micro-frontend-architecture-with-react/",
    },
    {
      description: "Github react-gradual-upgrade-demo",
      source: "https://github.com/reactjs/react-gradual-upgrade-demo",
    },
  ];
  const onClose = () => {
    setShow(false);
  };
  return (
    <Footer
      background="light-2"
      pad={{ vertical: "small", horizontal: "medium" }}
    >
      <Avatar src={gravatarLink} />
      <Nav direction="row" align="center">
        <Anchor
          a11yTitle="More info on Medium blog"
          href="https://betterprogramming.pub/6-steps-to-create-a-multi-version-react-application-1c3e5b5df7e9"
          icon={<Medium />}
          target="_blank"
          rel="noreferrer noopener"
        />
        <Anchor
          a11yTitle="Github repository"
          href="https://github.com/grommet/micro-frontend"
          icon={<Github />}
          target="_blank"
          rel="noreferrer noopener"
        />
        <Button
          icon={<CircleInformation color="brand" />}
          onClick={() => {
            setShow(!show);
          }}
        />
        {show && (
          <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
            <Box pad="medium" gap="medium">
              <Text>More Resources:</Text>
              <List
                pad={{ horizontal: "0px", vertical: "small" }}
                data={resources}
                border={false}
                primaryKey={(item) => (
                  <Anchor
                    href={item.source}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.description}
                  </Anchor>
                )}
              />
            </Box>
          </Layer>
        )}
      </Nav>
    </Footer>
  );
};

export const App = () => (
  <BrowserRouter>
    <Grommet theme={grommet} full style={{ height: "auto", width: "100%" }}>
      <AppContainer>
        <NavHeader />
        <Box role="main" flex={false}>
          <Suspense
            fallback={
              <Box align="center" justify="center" pad="xlarge">
                <Spinner
                  border={[
                    {
                      side: "horizontal",
                      color: "brand",
                      size: "large",
                      style: "inset",
                    },
                  ]}
                  size="large"
                />
              </Box>
            }
          >
            <Switch>
              <Route path="/legacy">
                <LegacyApp />
              </Route>
              <Route path="/modern">
                <ModernApp />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Suspense>
        </Box>
        <AppFooter />
      </AppContainer>
    </Grommet>
  </BrowserRouter>
);

export default App;
