export interface CellProps {
  // x-coordinate of the cell
  x: number;
  // y-coordinate of the cell
  y: number;
  // status of the cell, dead of alive
  isAlive: boolean;
  // click handler to inform about coordinates of the cell to further actions
  clickHandler: (x: number, y: number) => void;
}

export interface CellDrawnProps {
  isAlive: boolean;
  x: number;
  y: number;
}
