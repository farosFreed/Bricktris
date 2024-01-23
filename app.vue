<template>
  <div class="apptheme">
    <h1>Bricktris</h1>
    <div class="twocol">
      <div class="leftcol">
        <Bricklist :list="mockListData" />
      </div>
      <div class="rightcol">
        <div id="game" class="grid"></div>
      </div>
    </div>
  </div>
</template>

<script>
const mockListData = [
  { name: "cooking", alt: "Z tetra", color: "red", img: "Z.svg" },
  { name: "look for job", alt: "L tetra", color: "purple", img: "L.svg" },
  { name: "do laundry", alt: "I tetra", color: "blue", img: "I.svg" },
  { name: "do dishes", alt: "O tetra", color: "lightblue", img: "O.svg" },
  { name: "exercise", alt: "T tetra", color: "pink", img: "T.svg" },
];

// must export for template to get data
export default {
  data() {
    return {
      mockListData: mockListData,
      tetrominos: tetrominos,
      colors: colors,
      // canvas: null,
      // context: null,
      grid: 32,
      tetrominoSequence: [],
      playfield: [],
    };
  },
  methods: {
    /**
     * Draws the tetromino on the canvas.
     *
     * @param {string} param1 - The first parameter of the function.
     * @param {number} param2 - The second parameter of the function.
     * @returns {boolean} - The result of the function.
     */
    drawTetromino() {
      const canvas = document.getElementById("game");
      const ctx = canvas.getContext("2d");

      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            // drawing 1 px smaller than the grid creates a grid effect
            ctx.fillRect(
              (tetromino.col + col) * grid,
              (tetromino.row + row) * grid,
              grid - 1,
              grid - 1
            );
          }
        }
      }
    },
    setupGameboard() {
      // create playfield
      for (let row = -2; row < 20; row++) {
        this.playfield[row] = [];
        for (let col = 0; col < 10; col++) {
          this.playfield[row][col] = 0;
        }
      }
      console.table(this.playfield);
    },
  },
  mounted() {
    this.setupGameboard();
  },
};

// move to utils file ???
const tetrominos = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

const colors = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
};

const name = "L";
const matrix = tetrominos[name];

/* return
  name: name, // name of the piece (L, O, etc.)
  matrix: matrix, // the current rotation matrix
  row: row, // current row (starts offscreen)
  col: col, // current col
}; */
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: sans-serif;
  font-size: 3rem;
}
.twocol {
  width: 98vw;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.leftcol {
}

.grid {
  border: 1px solid #333;
  width: 100%;
  height: 100%;
  background-size: 40px 40px;
  background-position-x: -20px;
  background-position-y: -10px;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
}
</style>
