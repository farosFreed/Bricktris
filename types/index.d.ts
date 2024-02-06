// types/index.d.ts
declare global {
  enum Shape {
    I = "I",
    J = "J",
    L = "L",
    O = "O",
    S = "S",
    T = "T",
    Z = "Z",
  }
  interface ListItem {
    name: string;
    description?: string;
    shape: Shape | null;
  }

  interface Tetromino {
    name: string;
    matrix: number[][];
    row: number;
    col: number;
  }
}

export {};
