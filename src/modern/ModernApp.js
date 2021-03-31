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
} from "grommet";
import packageJson from "./node_modules/grommet/package.json";
import styledPackageJson from "./node_modules/styled-components/package.json";

const data = [
  { package: "Grommet", version: packageJson.version },
  { package: "React", version: React.version },
  {
    package: "styled-components",
    version: styledPackageJson.version,
  },
];

const ModernApp = () => {
  return (
    <Grommet theme={grommet}>
      <Box margin={{ vertical: "medium" }} align="center">
        <Heading size="small" margin="none">
          Loaded versions
        </Heading>
        <Paragraph textAlign="center">
          The current selected App is Legacy, the Legacy app is using the
          following legacy versions. The version numbers are loaded dynamically
          and are not hard coded.
        </Paragraph>
        <List
          data={data}
          pad="medium"
          primaryKey="package"
          secondaryKey="version"
          border={false}
        />
        <Paragraph textAlign="center">
          (Bug is fixed, the List above has no border)
        </Paragraph>
      </Box>
      <Box margin={{ top: "medium" }} align="center">
        <Heading level={2} size="small">
          Example
        </Heading>
        <Paragraph textAlign="center">
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
        gap="large"
        margin={{ top: "medium", bottom: "xlarge" }}
      >
        {["small", "medium", "large", "xlarge", "2xl", "3xl", "4xl", "5xl"].map(
          (size) => (
            <Box align="center" gap="small">
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

export default ModernApp;
