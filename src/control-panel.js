import React from "react";
import { Card, Box, Text, Heading, Flex } from "rebass";
import { LazyImage } from "react-lazy-images";
import Spinner from "react-spinkit";

import { Bar, Container } from "./components";

const ControlPanel = ({ children, handlers, locations }) => {
  const [setLocations] = handlers;
  if (!children)
    return (
      <Text fontSize={[3, 4, 5]} fontWeight="bold" color="magenta">
        No organization found.
      </Text>
    );
  return (
    <Container>
      <Flex flexDirection="column">
        {Object.values(children).map(
          ({ id, name, actions, image_count, action_count }) => {
            return (
              <OrganizationCard
                my={2}
                key={id}
                name={name}
                orgId={id}
                setLocations={setLocations}
              >
                {action_count > 0 ? (
                  actions.map(({ submissions, id, org }) => {
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
                    const src = submissions[0].images[0].url;

                    return (
                      <ImageContainer key={id} src={src}>
                        {image_count}
                      </ImageContainer>
                    );
                  })
                ) : (
                  <Text
                    key={id}
                    fontSize={[3, 4, 5]}
                    fontWeight="bold"
                    color="magenta"
                  >
                    No actions found.
                  </Text>
                )}
              </OrganizationCard>
            );
          }
        )}
      </Flex>
    </Container>
  );
};

const OrganizationCard = ({ children, name, orgId, setLocations }) => {
  return (
    <Card
      m={3}
      p={4}
      bg="#f6f6ff"
      borderRadius={8}
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      onMouseEnter={() =>
        setLocations(prevLocations => {
          return prevLocations.map(loc =>
            loc.id === orgId
              ? { ...loc, size: 20000, fill: [0, 255, 255] }
              : loc
          );
        })
      }
      onMouseLeave={() =>
        setLocations(prevLocations => {
          return prevLocations.map(loc =>
            loc.id === orgId ? { ...loc, size: 10000, fill: [255, 0, 0] } : loc
          );
        })
      }
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
    <Box width={1} px="50%" m={4}>
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

export default ControlPanel;
