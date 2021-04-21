import React from "react";

import { Box, Heading, Image, Paragraph } from "grommet";

import architecture from "./micro-frontend-architecture.png";

const Home = () => (
  <Box margin={{ left: "medium", right: "xlarge" }}>
    <Heading>Multi-Version Grommet Application</Heading>
    <Paragraph fill>
      This application is a proof of concept for loading Multi-Versions of
      Grommet dependencies side by side via a micro frontend application
      architecture.
    </Paragraph>
    <Paragraph fill>
      Normally, we encourage you to use a single version of Grommet across your
      whole app. When you need to upgrade Grommet, it is better to try to
      upgrade it all at once. Using a single version of Grommet removes a lot of
      complexity and is also essential to ensure the best experience for your
      users who don't have to download the code twice. So always prefer using
      one Grommet if you can. <br />
      That being said, for some apps that have been in production for some time,
      upgrading all screens at once may be prohibitively difficult.
      Traditionally, this meant that if a legacy API is deprecated, you would be
      stuck on the old version of Grommet forever. That prevents your whole app
      from receiving improvements and bug fixes.
    </Paragraph>
    <Paragraph fill>
      This repository demonstrates a hybrid approach. It shows how you can use a
      newer version of Grommet + Styled-Components + React for some parts of
      your app, while lazy-loading an older version of Grommet +
      Styled-Components + React for the parts that haven't been migrated yet.
    </Paragraph>
    <Heading level={2}>Background</Heading>
    <Paragraph fill>
      React 17 enabled the feature of supporting multiple React versions using
      lazy loading on a micro frontend architecture. As you probably
      experienced, the upgrade to React 17 was a relatively smooth upgrade --
      considering it was a major release it had only few breaking changes. This
      release was mainly to provide the infrastructure to support micro frontend
      architecture, so in future major release changes of React (that may
      contain heavier breaking changes), developers could upgrade legacy
      projects gradually while still running the latest version of React in
      their modern development environment. This micro frontend architecture
      should be a middle step to allow developers the opportunity to upgrade
      versions gradually.
    </Paragraph>
    <Paragraph fill>
      This micro frontend hybrid approach is inherently more complex and only
      meant to be an escape hatch and a compromise to prevent your app from
      getting stuck on an old version of Grommet. Use this approach as a last
      resort when you can't upgrade.
    </Paragraph>

    <Heading level={2}>About</Heading>
    <Paragraph fill>
      This app is managed via a Container that loads and runs three applications
      Controller, Legacy and Modern. The container app doesn't own any Grommet,
      React or Styled-components dependencies of it's own.
    </Paragraph>
    <Image alt="architecture-sketch" src={architecture} />
    <Paragraph fill>
      The <b>Container</b> app runs three different applications, each with
      different Grommet, React and Styled-components versions. The Container is
      hosting the Controller as you enter to its home page. <br /> <br />
      <b>Controller</b>- The Navigation Header that is used to control the
      routing of the pages, the controller will 'poke' the Legacy & Modern
      applications and will trigger them to load and run different Grommet +
      Styled-Components + React. The Controller is using newer versions of
      Grommet + Styled-Components + React than the Legacy app, but older
      versions from the Modern app, this behavior demonstrates a two way nesting
      of dependencies within the app.
      <br /> Note: The Controller uses a third-party of React Router for its
      navigation. It is included to demonstrate easy navigation between apps but
      it is not essential for this POC.
      <br />
      <br />
      <b>Legacy</b>- The Legacy app that will be hosted in the main Container.
      This app is using old versions of Grommet + Styled-Components + React, the
      versions are being displayed in real-time as you enter the page, and are
      demonstrated by defects from older versions. Sharp eyes will notice that
      the Legacy App page is consistent of two applications of Legacy and the
      Controller, which means the single-page is hosting different versions of
      Grommet + Styled-Components + React in the same view.
      <br />
      <br />
      <b>Modern</b>- The Modern app that will be hosted in the main Container.
      This app is using the newest versions of Grommet + Styled-Components +
      React, the versions are being displayed in real-time as you enter the page
      and are demonstrated by showing the resolved defects introduced on the
      Legacy app. Sharp eyes will notice that the Modern App page is consistent
      of two applications of Modern and the Controller, which means the
      single-page is hosting different versions of Grommet + Styled-Components +
      React in the same view.
    </Paragraph>
    <Heading level={2}> Ready to Go?</Heading>
    <Paragraph fill>
      Great! you are currently viewing a Grommet page loaded by the Controller
      app that uses the dependencies described in the controller application. As
      you navigate through the app and move between Legacy and Modern
      applications, the controller will be using a lazy loading mechanism to
      load different versions of Grommet + Styled-Components + React.
    </Paragraph>
    <Paragraph fill>
      Would loading different versions of Grommet + Styled-Components + React
      effect the performance of the App?!? YES!! This is why it is only
      recommended to use this architecture and approach when upgrade options are
      limited.
    </Paragraph>
    <Paragraph fill>
      Quick eyes will notice the Spinner that is shown when navigating between
      the Legacy & Modern apps for the first time. The versions for each app is
      loaded dynamically from the versions that are being used on the real-time
      deployment and are not hard coded within the app.
    </Paragraph>
    <Paragraph fill>
      In Grommet, the components of Drop & Layer are the two that have the most
      DOM interventions, hence, these two components are being explicitly
      demonstrated in this demo app. You can find a Drop (Tip) on the Example
      Heading of both Legacy & Modern apps, and you can find Layer demonstrated
      on the Footer on the information icon. All works as expected.
    </Paragraph>
    <Paragraph fill> Give it a try and let me know what you think!</Paragraph>
  </Box>
);

export default Home;
