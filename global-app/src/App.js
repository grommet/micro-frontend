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
        <Heading>
          window global
        </Heading>
        <Heading level={2}>Loaded versions</Heading>
        <Paragraph>
          The current selected application using
          the newest versions. The version numbers are loaded dynamically and
          are not hard coded.
        </Paragraph>
        <List
          data={data}
          pad="medium"
          primaryKey="package"
          secondaryKey="version"
          border={false}
        />
        <Paragraph>
          (The List above has no border, the bug that was specified in the
          web component application is fixed in this Grommet version)
        </Paragraph>
      </Box>
      <Box>
        <Tip
          plain
          content="Drop/Tip example with 'round' prop that is supported in this grommet version"
          dropProps={{
            background: "light-4",
            round: "large",
            pad: "xsmall",
          }}
        >
          <Heading level={2}>Example</Heading>
        </Tip>
        <Paragraph>
          Before Grommet {packageJson.version}, Avatar sizes were supported only
          from 'small' size to 'xlarge'. All higher sizes of '2xl', '3xl',
          '4xl', '5xl' were not supported. In this example you can see how all
          the higher sizes up to '5xl' are being supported as expected.
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
            <Box align="center" flex={false} key={size} gap="small">
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
