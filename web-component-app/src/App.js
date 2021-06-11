import React from "react";

import {
  Avatar,
  Box,
  Grommet,
  Heading,
  grommet,
  List,
  Paragraph,
  Text,
  Tip,
} from "grommet";

import packageJson from "../node_modules/grommet/package.json";
import styledPackageJson from "../node_modules/styled-components/package.json";

const data = [
  { package: "Grommet", version: packageJson.version },
  { package: "React", version: React.version },
  {
    package: "styled-components",
    version: styledPackageJson.version,
  },
];

const App = () => {
  return (
    <Grommet theme={grommet}>
      <Box>
        <Heading>web component</Heading>
        <Heading level={2}>Loaded versions</Heading>
        <Paragraph>
          The current selected App is using the
          following versions. The version numbers are loaded dynamically
          and are not hard coded.
        </Paragraph>
        <List
          data={data}
          pad="medium"
          primaryKey="package"
          secondaryKey="version"
          border={false}
        />
        <Paragraph>
          (The list above shouldn't have a border, upgrade the grommet version
          to fix it or use the global App to see it's fixed.)
        </Paragraph>
      </Box>
      <Box>
        <Tip
          plain
          content="Drop/Tip example with 'round' prop that isn't supported in this grommet version"
          dropProps={{
            background: "light-4",
            round: "large",
            pad: "xsmall",
          }}
        >
          <Heading level={2}>Example</Heading>
        </Tip>
        <Paragraph>
          On Grommet {packageJson.version} Avatar sizes were supported from
          'small' size to 'xlarge'. All higher sizes of '2xl', '3xl', '4xl',
          '5xl' were not supported. Since their size isn't defined the Avatar is
          setting an auto sizing as the default behavior. Upgrade to Grommet
          2.17 to view the new sizes.
        </Paragraph>
      </Box>
      <Box
        align="center"
        justify="center"
        direction="row-responsive"
        gap="medium"
        margin={{ top: "medium", bottom: "xlarge" }}
      >
        {["small", "medium", "large", "xlarge", "2xl", "3xl", "4xl", "5xl"].map(
          (size) => (
            <Box align="center" gap="small" key={size}>
              <Text>{size}</Text>
              <Avatar background="dark-2" size={size}>
                SY
              </Avatar>
            </Box>
          )
        )}
      </Box>
    </Grommet>
  );
};

export default App;
