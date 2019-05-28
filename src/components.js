import React from "react";
import styled, { keyframes } from "styled-components";
import { Box } from "rebass";
import "styled-components/macro";

export const colors = {
  cyan: "#0ff",
  violet: "#80f",
  magenta: "#f0f",
  lime: "#8f0"
};

const cx = key => colors[key] || key;

export const gradient = (n, from, to) =>
  `linear-gradient(${n}deg, ${cx(from)}, ${cx(to)})`;

const grow = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

export const Bar = styled.hr`
  margin: 0;
  border: 0;
  height: 3px;
  background-image: ${gradient(90, colors.cyan, colors.magenta)};
  transform-origin: 0 0;
  animation-name: ${grow};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const hyphenate = str => `${str}`.replace(/[A-Z]/g, "-$&").toLowerCase();

const color = key => props =>
  props[key] ? `${hyphenate(key)}:${props[key]};` : null;

const grx = props =>
  props.gradient ? `background-image:${gradient(...props.gradient)};` : null;

export const Color = styled.div`
  ${color("color")}
  ${color("backgroundColor")}
  ${grx}
`;

export const Container = props => (
  <Box
    {...props}
    fontSize={6}
    fontWeight="bold"
    width={[1, 1, 1 / 2]}
    p={4}
    mt={3}
    ml="auto"
    mr={3}
    css={{
      position: "absolute",
      top: 0,
      right: 0,
      overflowY: "scroll",
      maxHeight: "50%",
      maxWidth: "480px"
    }}
  />
);
