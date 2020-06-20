type FieldScheme = boolean[][];

type GOLState = {
  golField: FieldScheme;
  gameStatus: StatusState;
};

type StatusState = {
  status: GameStatus;
  interval: number;
  generation: number;
};

type CellCorrds = {
  x: number;
  y: number;
};

type FieldSize = [number, number];

type GOLStatus = {
  size: FieldSize;
  interval: number;
  generation: number;
};

type GameStatus = "running" | "paused" | "stopped";

type ClrFieldAct = {
  fullness: number;
  size: number[];
};
