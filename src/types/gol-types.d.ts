type FieldScheme = boolean[][];

type GOLState = {
  golField: FieldScheme;
  gameStatus: StatusState;
};

type StatusState = {
  status: string;
};

type CellCorrds = {
  x: number;
  y: number;
};
