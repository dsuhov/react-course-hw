import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

interface CellDrawnProps {
  isAlive: boolean;
  x: number;
  y: number;
}

const borderColor = "rgb(85, 74, 58)";
const dyingBg = "background-color: rgb(250, 42, 12)";
const revivingBg = "background-color: rgb(59, 197, 0)";
const deadBg = "background-color: #fff";
const aliveBg = "background-color: #050505";

const animateTransitionDied = keyframes`
  0% {
    ${aliveBg};
  }
  50% {
    ${dyingBg};
  }
  100% {
    ${deadBg};
  }
`;

const animateTransitionRevived = keyframes`
  0% {
    ${deadBg};
  }
  50% {
    ${revivingBg};
  }
  100% {
    ${aliveBg};
  }
`;

const MainCell = css`
  width: 10px;
  height: 10px;
  border-right: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  flex: 0 0 10px;
`;

const DeadCell = css`
  ${deadBg};
  animation: ${animateTransitionDied} 0.1s linear;
`;

const AliveCell = css`
  ${aliveBg};
  animation: ${animateTransitionRevived} 0.1s linear;
`;

export const CellDrawn = styled.div`
  ${MainCell};
  ${({ isAlive }: CellDrawnProps) => (isAlive ? AliveCell : DeadCell)};
  ${({ x }: CellDrawnProps) =>
    x === 0 ? `border-left: 1px solid ${borderColor}` : "border-left: none"};
  ${({ y }: CellDrawnProps) =>
    y === 0 ? `border-top: 1px solid ${borderColor}` : "border-top: none"};
`;
