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

const LegacyApp = () => {
  return (
    <Grommet theme={grommet} style={{ height: "auto", width: "100%" }} full>
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
          (The list above shouldn't have a border, upgrade the grommet version
          to fix it.)
        </Paragraph>
      </Box>
      <Box margin={{ top: "medium" }} align="center">
        <Heading level={2} size="small">
          Example
        </Heading>
        <Paragraph textAlign="center">
          On Grommet {packageJson.version} Avatar sizes were supported from
          'small' size to 'xlarge'. All higher sizes of '2xl', '3xl', '4xl',
          '5xl' were not supported. Since their size isn't defined the Avatar is
          setting an auto sizing as the default behavior.
        </Paragraph>
      </Box>
      <Box
        align="center"
        justify="center"
        direction="row"
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

export default LegacyApp;
