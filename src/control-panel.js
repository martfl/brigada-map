import React from 'react'
import { Flex, Card, Box, Text, Heading, Image } from 'rebass'
import { LazyImage } from 'react-lazy-images'

import { Bar, FixedCard } from './components'

const ImageCard = ({ children }) => {
  return (
    <Flex alignItems="center">
      <Image
        height="250px"
        borderRadius={8}
        {...children}
        alt=""
        className="intrinsic-item animated fadeIn"
      />
    </Flex>
  )
}

const Info = ({ images }) => {
  // const { lng, lat } = location
  const { url, alt } = images[0]
  return images.length !== 0 ? (
    <LazyImage
      src={url}
      alt={alt}
      debounceDurationMs={500}
      placeholder={({ ref }) => <div ref={ref} className="intrinsic-item" />}
      actual={({ imageProps }) => <ImageCard>{imageProps}</ImageCard>}
    />
  ) : (
    <Text>No submissions.</Text>
  )
}

const Section = ({ orgId, name, children }) => (
  <Box p={3} width={1}>
    <Heading>{name}</Heading>
    <Bar />
    {Object.values(children)
      .slice(0, 15)
      .map(({ images, location, id }) => (
        <FixedCard key={`${orgId}${id}`} width={1} my={3}>
          <Info images={images} location={location} />
        </FixedCard>
      ))}
  </Box>
)

const ControlPanel = ({ children }) => {
  const submissions = Object.values(children).map(org => {
    if (org.actions) {
      const actions = org.actions.reduce((acc, v) => acc.concat(v.submissions), [])
      actions.name = org.name
      actions.orgId = org.id
      return actions
    }
    return []
  })

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
          <Section key={orgId} orgId={orgId} name={name}>
            {rest}
          </Section>
        ))}
      </Card>
    </Flex>
  )
}
export default ControlPanel
