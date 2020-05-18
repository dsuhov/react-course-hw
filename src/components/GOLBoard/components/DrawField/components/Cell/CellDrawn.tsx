import styled from "@emotion/styled";
import { css } from "@emotion/core";

interface CellDrawnProps {
  isAlive: boolean;
  x: number;
  y: number;
}

const borderColor = "rgb(85, 74, 58)";
const deadBg = "background-color: #fff";
const aliveBg = "background-color: #050505";

const MainCell = css`
  width: 10px;
  height: 10px;
  border-right: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  flex: 0 0 10px;
`;

const DeadCell = css`
  ${deadBg};
`;

const AliveCell = css`
  ${aliveBg};
`;

export const CellDrawn = styled.div`
  ${MainCell};
  ${({ isAlive }: CellDrawnProps) => (isAlive ? AliveCell : DeadCell)};
  ${({ x }: CellDrawnProps) =>
    x === 0 ? `border-left: 1px solid ${borderColor}` : "border-left: none"};
  ${({ y }: CellDrawnProps) =>
    y === 0 ? `border-top: 1px solid ${borderColor}` : "border-top: none"};
`;
