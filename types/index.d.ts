// types/index.d.ts
declare global {
  interface ListItem {
    name: string;
    description?: string;
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
