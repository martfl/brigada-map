import React from "react";
import { Card, Box, Text, Heading, Flex } from "rebass";
import { LazyImage } from "react-lazy-images";
import Spinner from "react-spinkit";

import { Bar, Container } from "./components";

const ControlPanel = ({ children, handlers, locations }) => {
  const actions = handleData(children);
  console.log(children);
  const [setLocations] = handlers;
  return actions ? (
    <Container>
      <OrganizationCard
        name={actions[0].org.name}
        locations={locations}
        setLocations={setLocations}
      >
        {actions.map(({ submissions, id, org }) => {
          if (!submissions) {
            return (
              <Text
                key={id}
                fontSize={[3, 4, 5]}
                fontWeight="bold"
                color="magenta"
              >
                No submissions found.
              </Text>
            );
          }
          const n = submissions.reduce((sum, s) => (sum += s.images.length), 0);
          const src = submissions[0].images[0].url;
          return (
            <ImageContainer key={id} src={src}>
              {n}
            </ImageContainer>
          );
        })}
      </OrganizationCard>
    </Container>
  ) : (
    <div>no data.</div>
  );
};

const OrganizationCard = ({ children, name, locations, setLocations }) => {
  return (
    <Card
      p={4}
      bg="#f6f6ff"
      borderRadius={8}
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      onMouseEnter={() => {
        setLocations(locs =>
          locs.map(location => ({
            ...location,
            size: 20000,
            fill: [0, 0, 255]
          }))
        );
      }}
      onMouseLeave={() => {
        setLocations(locs =>
          locs.map(location => ({
            ...location,
            size: 10000,
            fill: [255, 0, 0]
          }))
        );
      }}
    >
      <Heading as="h1" my={2} fontWeight="bold" fontSize={[3, 4, 5]}>
        {name}
      </Heading>
      <Bar />
      {children}
    </Card>
  );
};
const ImageSpinner = () => (
  <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
    <Box width={1} px="50%" mt={4}>
      <Spinner name="folding-cube" />
    </Box>
  </Flex>
);
const ImageContainer = ({ src, children }) => {
  return (
    <Box width={1}>
      <LazyImage
        src={src}
        alt={""}
        debounceDurationMs={1500}
        placeholder={({ ref }) => (
          <div ref={ref}>
            <ImageSpinner />
          </div>
        )}
        actual={({ imageProps }) => (
          <ImageCard {...imageProps} text={children} />
        )}
      />
    </Box>
  );
};

const ImageCard = ({ text, src, alt }) => (
  <Card
    m={2}
    p={4}
    py={6}
    backgroundImage={`url(${src})`}
    backgroundSize="cover"
    borderRadius={8}
    color="white"
    bg="darkgray"
    alt={alt}
  >
    <Heading textAlign="center" fontSize={[5, 6]}>
      {text > 1 ? `+${text - 1}` : ""}
    </Heading>
  </Card>
);

const handleData = obj => {
  console.log(obj);
  const [arr] = Object.values(obj).map(({ actions }) =>
    actions
      ? actions.reduce(
          (acc, { submissions, id, organization }) =>
            acc.concat({
              id,
              submissions,
              org: { name: organization.name, id: organization.id }
            }),
          []
        )
      : []
  );
  return arr;
};
export default ControlPanel;
