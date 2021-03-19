import React, { Suspense } from "react";
import {
  grommet,
  Anchor,
  Avatar,
  Box,
  Footer,
  Grommet,
  Header,
  Nav,
  Spinner,
} from "grommet";

import { Grommet as GrommetIcon, Github, Medium } from "grommet-icons";

import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

// LazyRoot has to have its own instance per module
import lazyLegacyRoot from "./lazyLegacyRoot";
import lazyModernRoot from "./lazyModernRoot";

import Home from "./Home";

// Lazy-load a component from the bundle using legacy Grommet.
const LegacyApp = lazyLegacyRoot(() => import("../legacy/LegacyApp"));

// Lazy-load a component from the bundle using modern Grommet.
const ModernApp = lazyModernRoot(() => import("../modern/ModernApp"));

const gravatarLink =
  "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80";

const NavHeader = () => (
  <Header background="light-4" pad="medium">
    <Anchor
      icon={<GrommetIcon size="medium" />}
      as={Link}
      to="/"
      label="Grommet"
    />
    <Nav direction="row">
      <Anchor as={Link} to="/legacy">
        Legacy
      </Anchor>
      <Anchor as={Link} to="/modern">
        Modern
      </Anchor>
    </Nav>
  </Header>
);

const AppFooter = () => (
  <Footer
    background="light-2"
    pad={{ vertical: "small", horizontal: "medium" }}
  >
    <Avatar src={gravatarLink} />
    <Nav direction="row" align="center">
      <Anchor
        a11yTitle="Share feedback on Github"
        href="???"
        icon={<Medium />}
      />
      <Anchor a11yTitle="Github repository" href="???" icon={<Github />} />
    </Nav>
  </Footer>
);

export const App = () => (
  <BrowserRouter>
    <Grommet theme={grommet} full>
      <NavHeader />
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
      <Box flex />
      <AppFooter />
    </Grommet>
  </BrowserRouter>
);

export default App;
