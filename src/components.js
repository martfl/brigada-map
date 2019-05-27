import styled, { keyframes } from "styled-components";
import { Box } from "rebass";

export const FixedCard = styled(Box)`
  display: block;
  position: relative;
  min-height: 250px;
  cursor: pointer;
`;

export const colors = {
  cyan: "#0ff",
  violet: "#80f",
  magenta: "#f0f",
  lime: "#8f0"
};

const cx = key => colors[key] || key;

export const gradient = (n, from, to) =>
  `linear-gradient(${n}deg, ${cx(from)}, ${cx(to)})`;

export const Button = styled.a`
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  padding: 12px;
  border: 0;
  color: #fff;
  background-color: ${colors.cyan};
  background-image: ${gradient(120, "magenta", "violet")};
  border-radius: 6px;
  appearance: none;
  transition-property: transform, color;
  transition-timing-function: ease-out;
  transition-duration: 0.05s;
  &:hover {
    color: #000;
    background-image: ${gradient(120, "lime", "cyan")};
    transform: scale(${17 / 16});
  }
  &:focus {
    outline: none;
    transform: scale(${17 / 16});
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px ${colors.cyan};
  }
  &:active {
    transform: scale(${15 / 16});
  }
`;

export const BaseButton = styled("button")`
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin: 0;
  padding: 16px;
  color: inherit;
  background-color: ${props => (props.active ? "#000" : "transparent")};
  border: 0;
  appearance: none;
`;

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
