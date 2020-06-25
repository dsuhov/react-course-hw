import React from "react";
import { StatusLineWrapper, StatusSize, GenerationStatus } from "./styled";
import { useSelector } from "react-redux";
import { statusSelector } from "@/rdx/selectors/statusSelector";

export const StatusLine: React.FC<{}> = () => {
  const gameStatus = useSelector(statusSelector);

  return (
    <StatusLineWrapper>
      <StatusSize>
        Size: {gameStatus.size[0]} x {gameStatus.size[1]}
      </StatusSize>
      <div>
        Tick Interval: <b>{gameStatus.interval}</b> ms
      </div>
      <GenerationStatus>
        Generation: <b>{gameStatus.generation}</b>
      </GenerationStatus>
    </StatusLineWrapper>
  );
};

StatusLine.displayName = "StatusLine";
