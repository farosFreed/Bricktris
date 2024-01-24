<template>
  <div class="apptheme">
    <h1>Bricktris</h1>
    <div class="twocol">
      <div class="leftcol">
        <Bricklist :list="mockListData" />
      </div>
      <div class="rightcol">
        <canvas id="game" width="320" height="640" class="grid"></canvas>
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
      canvas: null,
      context: null,
      grid: 32,
      tetrominoSequence: [],
      playfield: [],
    };
  },
  methods: {
    /**
     * NOT IMPLEMENTED YET JUST FOR SHOW
     * Draws the tetromino on the canvas.
     *
     * @param {string} param1 - The first parameter of the function.
     * @param {number} param2 - The second parameter of the function.
     * @returns {boolean} - The result of the function.
     */
    drawTetromino() {
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            // drawing 1 px smaller than the grid creates a grid effect
            this.ctx.fillRect(
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
      this.canvas = document.getElementById("game");
      console.log(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // create playfield
      for (let row = -2; row < 20; row++) {
        this.playfield[row] = [];
        for (let col = 0; col < 10; col++) {
          this.playfield[row][col] = 0;
        }
      }
      console.table(this.playfield);
    },
    drawPlayfield() {
      for (let row = 0; row < this.playfield.length; row++) {
        for (let col = 0; col < this.playfield[row].length; col++) {
          if (this.playfield[row][col]) {
            const name = this.playfield[row][col];
            this.ctx.fillStyle = colors[name];
            this.ctx.fillRect(
              col * this.grid,
              row * this.grid,
              this.grid - 1,
              this.grid - 1
            );
          }
        }
      }
    },
  },
  mounted() {
    this.setupGameboard();
    this.playfield[0][0] = "I";
    this.playfield[0][1] = "I";
    this.playfield[0][2] = "J";
    this.playfield[1][2] = "J";
    this.playfield[2][2] = "J";
    this.drawPlayfield();
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
</script>

<style lang="scss" scoped>
$grid-size: 32px;

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

.grid {
  border: 1px solid #333;
  background-size: $grid-size $grid-size;
  background-position-x: calc($grid-size/2);
  background-position-y: calc($grid-size/2);
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
}
</style>
