[![Netlify Status](https://api.netlify.com/api/v1/badges/cdd3c0be-4f7e-4671-9965-86ee15034a97/deploy-status)](https://app.netlify.com/sites/practical-turing-eb3bf3/deploys)

# micro-frontend

## Multi-Version Grommet Application

A proof of concept (POC) for using grommet in a micro frontend context.
This [POC's live app](https://practical-turing-eb3bf3.netlify.app/) is
built & deployed via Netlify.

The Multi-Version Grommet application is focusing on supporting multi versions
of the following packages:

- Grommet
- Styled-Components
- React

This app is a POC of how you can configure a build system to serve
**different versions of Grommet, Styled-Components and React**
side by side in the same app.

This hybrid approach to support multi versions is only meant to be an escape
hatch and should only be used as a compromise to prevent your app from getting
stuck on an old version of Grommet.

This demo is built with Create React App for simpler babel/webpack
configuration, although it is generic and doesn't assume a
particular build system.

The routing system in this app is built using react-router, but it isn't
bounded to using it and could potentially use any other routing mechanism.

## Why?

Normally, we encourage you to use a single version of Grommet across your
whole app. When you need to upgrade Grommet, it is better to try to upgrade it
all at once.
Using a single version of Grommet removes a lot of complexity.
It is also essential to ensure the best experience for your users who don't have
to download the code twice. **So it is always preferred to use one version of Grommet if you can.**

That being said, for some apps that have been in production for some time,
upgrading all screens at once may be prohibitively difficult.
Traditionally, this meant that if a legacy API is deprecated, you would be
stuck on the old version of Grommet forever.
That prevents your whole app from receiving improvements and bugfixes.
This repository demonstrates a hybrid approach, it shows how you can use a newer version of Grommet + Styled-Components + React for some parts of your app, while
**lazy-loading an older version of Grommet + Styled-Components + React**
for the parts that haven't been migrated yet.

This approach is inherently more complex,
and should be used as a last resort when you can't upgrade.

## Versions

This POC app runs three different applications, each with different versions:

1. Controller (in `src/controller`)
   a. Grommet 2.17.0
   b. Styled-Components 5.2.1
   c. React 17.0.1
1. Legacy (in `src/legacy`)
   a. Grommet 2.16.0
   b. Styled-Components 5.1.0
   c. React 16.8
1. Modern (in `src/modern`)
   a. Grommet 2.17.1
   b. Styled-Components 5.2.1
   c. React 17.0.2

This app is managed via an overall container that loads and runs the three
applications above. The container app doesn't own any specific dependencies of
it's own from the above.

<img alt="architecture" width="600px" height="400px" src="https://github.com/grommet/micro-frontend/tree/master/src/controller/micro-frontend-architecture.png" />

## Installation

To run this demo, clone the project, open its folder and execute:

```sh
yarn install
yarn start
```

If you want to test the production build, you can run instead:

```sh
yarn install
yarn build
yarn serve
```

This sample app uses client-side routing and consists of three routes:

- `/` renders the home page which uses a the versions coming from the controller app.
- `/legacy` renders a page which uses older versions of Grommet + Styled-Components + React.
- `/modern` renders a page which uses newest versions of Grommet + Styled-Components + React.

**The purpose of this demo is to show some nuances of such setup:**

- How to install three versions of Grommet in a single app with npm side by side.
- How to avoid the ["invalid Hook call" error](https://github.com/facebook/react/issues/13991) while nesting React (Grommet) trees.
- How to lazy-load different Grommet bundle so it's only loaded on the screens
  that use it.
- How to do all of this without a special bundler configuration.

### Dependencies

We will use four different `package.json`s: one for non-Grommet code at the root, and three in the respective `src/legacy`, `src/modern`, and `src/controller` folders that specify the Grommet dependencies:

- **`package.json`**: The root `package.json` is a place for build dependencies (such as `react-scripts`). We do **not** include Grommet & friends dependencies or any React-related libraries in this file.
- **`src/controller/package.json`**: This is where we declare `grommet`, `styled-components` and `react`, `react-dom` dependencies for the "controller" tree which navigate between different apps (legacy/modern). In this app, the controller is using Grommet 2.17.0.
- **`src/legacy/package.json`**: This is where we declare `grommet`, `styled-components` and `react`, `react-dom` dependencies for the "legacy" trees.
  The legacy app is using Grommet 2.16.0 (although, we could downgrade it further below).
- **`src/modern/package.json`**: This is where we declare `grommet`, `styled-components` and `react`, `react-dom` dependencies for the "modern" trees.
  The modern app is using Grommet 2.17.1.

The `scripts` in the root `package.json` are set up so that when you run `yarn install` in it, it also runs `yarn install` in all `src/controller`, `src/legacy` and `src/modern` folders.

**Note:** This demo is set up with the third-party of React Router for the controller navigation. These is not essential, and you can remove/replace it from the demo. It is included to demonstrate easy navigation between apps and to show how to make them work with this approach.

### Folders

There are a few key folders in this example:

- **`src`**: Root of the source tree of the overall container.
- **`src/controller`**: This app is controlling the lazy loading of the apps that are being loaded & rendered. This code is using a new version of Grommet and includes new Styled-Components and React components.
- **`src/legacy`**: This is where all the code that is using the older version of Grommet & friends should go. This includes Styled-Components and React components and Hooks, and general product code that is **only** used by the legacy trees.
- **`src/modern`**: This is where all the code that is using the newest version of Grommet should go. This includes Styled-Components and React components and Hooks, and general product code that is **only** used by the modern trees.

### Lazy Loading

Loading different Grommet versions on the same page is bad for the
user experience, so you should strive to push this as far as possible from the
critical path of your app.

To encourage only loading the older React when necessary, this demo includes a
helper that works similarly to `React.lazy`.
For example, `src/controller/App.js`, simplified, looks like this:

```js
import lazyLegacyRoot from "./lazyLegacyRoot";

// Lazy-load a component from the bundle using legacy Grommet.
const LegacyApp = lazyLegacyRoot(() => import("../legacy/LegacyApp"));

export const App = () => <LegacyApp />;
```

As a result, only if the `App` (and as a result, `<LegacyApp />`) gets rendered,
we will load the bundle containing the legacy React and the
legacy `LegacyApp` component.
Like with `React.lazy()`, we wrap it in `<Suspense>`
to specify the loading indicator:

```js
<Suspense fallback={<Spinner />}>
  <LegacyApp />
</Suspense>
```

The implementation of the `src/controller/lazyLegacyRoot.js` helper is included
so you can tweak it and customize it to your needs.
Same for `src/controller/lazyModernRoot.js` to have a separate
instance of loader for the modern app.

### Nesting Direction

In this demo, I'm demonstrating two ways of nested directions.

1. The controller runs a newer version of Grommet + Styled-Components + React
   while it loads a legacy Grommet + Styled-Components + React versions.
1. The controller runs an older version of Grommet + Styled-Components + React
   while it loads a modern Grommet + Styled-Components + React versions.

Both nesting directions are valid and working as expected.

### Resources

**[Learn more about Gradual Upgrades.](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#gradual-upgrades)**

**[Learn more about Multi-Version React Application.](https://betterprogramming.pub/6-steps-to-create-a-multi-version-react-application-1c3e5b5df7e9)**
