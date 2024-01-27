// types/index.d.ts
declare global {
  interface ListItem {
    name: string;
    shape: string;
  }

  interface Tetromino {
    name: string;
    matrix: number[][];
    row: number;
    col: number;
  }
}

export {};
