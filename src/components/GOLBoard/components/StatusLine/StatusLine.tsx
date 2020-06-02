import React from "react";
import { StatusLineWrapper, StatusSize, GenerationStatus } from "./styled";

interface StatusLineProps {
  size: [number, number];
  interval: number;
}

function areEqual(prevProps: StatusLineProps, nextProps: StatusLineProps) {
  const isEqInterval = prevProps.interval === nextProps.interval;
  const isSizeEqual =
    prevProps.size[0] === nextProps.size[0] &&
    prevProps.size[1] === nextProps.size[1];

  return isEqInterval && isSizeEqual;
}

export const StatusLine = React.memo<StatusLineProps>(({ size, interval }) => {
  return (
    <StatusLineWrapper>
      <StatusSize>
        Size: {size[0]} x {size[1]}
      </StatusSize>
      <div>
        Tick Interval: <b>{interval}</b> ms
      </div>
      <GenerationStatus>
        Generation: <b>5</b>
      </GenerationStatus>
    </StatusLineWrapper>
  );
}, areEqual);

StatusLine.displayName = "StatusLine";
