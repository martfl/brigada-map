import React from "react";
import { Flex, Card, Box, Text, Heading } from "rebass";
import { LazyImage } from "react-lazy-images";
import { LinearInterpolator } from "react-map-gl";

import { Bar, FixedCard } from "./components";

const ImageCard = ({ nImages, children }) => {
  const { src, alt } = children;
  return (
    <Card
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
        {nImages > 1 ? `+${nImages - 1}` : ""}
      </Heading>
    </Card>
  );
};

const Info = ({ images }) => {
  const { url, alt } = images[0];
  return images.length !== 0 ? (
    <LazyImage
      src={url}
      alt={alt}
      debounceDurationMs={500}
      placeholder={({ ref }) => <div ref={ref} className="intrinsic-item" />}
      actual={({ imageProps }) => (
        <ImageCard nImages={images.length}>{imageProps}</ImageCard>
      )}
    />
  ) : (
    <Text>No submissions.</Text>
  );
};

const Section = ({ orgId, setFill, setVp, name, children }) => (
  <Box p={3} width={1}>
    <Heading>{name}</Heading>
    <Bar />
    {Object.values(children).map(({ images, location, id }) => {
      return (
        <FixedCard
          key={`${orgId}${id}`}
          width={1}
          my={3}
          onMouseEnter={() =>
            setFill({ ...location, size: 10000, fill: [0, 0, 255] })
          }
          onMouseLeave={() =>
            setFill({ ...location, size: 10000, fill: [255, 0, 0] })
          }
        >
          <Info images={images} />
        </FixedCard>
      );
    })}
  </Box>
);

const ControlPanel = ({ setVp, setFill, children }) => {
  const submissions = Object.values(children).map(org => {
    if (org.actions) {
      const actions = org.actions.reduce(
        (acc, v) => acc.concat(v.submissions),
        []
      );
      actions.name = org.name;
      actions.orgId = org.id;
      return actions;
    }
    return [];
  });

  return (
    <Flex my={2}>
      <Card
        width={1}
        borderRadius={8}
        m={4}
        py={2}
        px={4}
        bg="#fff"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
        className="control-panel"
      >
        {submissions.map(({ orgId, name, ...rest }) => (
          <Section
            key={orgId}
            setFill={setFill}
            setVp={setVp}
            orgId={orgId}
            name={name}
          >
            {rest}
          </Section>
        ))}
      </Card>
    </Flex>
  );
};

export default ControlPanel;
