<template>
  <div v-if="!isLoading" class="apptheme">
    <Modal
      :show="modalShow"
      :title="modalData.name ? modalData.name : 'Welcome'"
      :text="modalData.description ? modalData.description : ''"
      :shape="modalData.shape ? modalData.shape : ''"
      @closeModal="
        () => {
          modalShow = !modalShow;
        }
      "
      @spawnTetromino="(shape) => spawnTetromino(shape)"
    >
      <NewItemForm
        v-if="modalData == newItemData"
        @submitForm="(item) => addListItem(item)"
      />
    </Modal>
    <div class="headerbar">
      <h2>Bricktris</h2>
      |
      <span class="score">score: {{ linesCleared }}</span>
    </div>
    <div class="twocol">
      <div class="leftcol">
        <Bricklist
          :list="listData"
          :collapse="isPlaying"
          @toggleModal="(i) => showModal(i)"
          @newListItem="(i) => showModal(newItemData)"
          @removeListItem="(i) => removeListItem(i)"
        />
        <div>
          <Query />
          <button class="small" @click="clearGameboard">
            Clear Game Board
          </button>
        </div>
        <MobileKeypad
          v-if="showMobileKeypad"
          @handleKeyPress="(e) => handleKeyPress(e)"
          :width="gameWidth"
        />
      </div>
      <div class="rightcol">
        <canvas
          id="game"
          ref="gameboard"
          :width="gameWidth"
          :height="gameHeight"
          class="grid"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import isUserUsingMobile from "@/utils/detectMobile";
import { tetrominos, colors } from "@/utils/tetrominos";

const sampleListData = [
  { name: "meal prep", shape: "Z" },
  {
    name: "work or homework",
    shape: "L",
  },
  {
    name: "wash and fold laundry",
    shape: "I",
  },
  {
    name: "walk the dog",
    shape: "O",
  },
  {
    name: "exercise: including 25 sit-ups x3, 25 pushups x3, 30sec planking x3",
    shape: "T",
  },
];

export default {
  data() {
    return {
      listData: [] as ListItem[],
      tetrominos: tetrominos,
      colors: colors,
      canvas: null as HTMLElement | null,
      windowWidth: 0,
      gameWidth: 0,
      gameHeight: 0,
      ctx: null, // canvas context
      grid: 32,
      tetrominoSequence: [], // not using? deprecate?
      playfield: [] as Array<Array<string | number>>,
      isPlaying: false,
      isLoading: true,
      linesCleared: 0,
      modalShow: false,
      modalData: {
        name: "",
        description: "",
        shape: "",
      } as ListItem,
      currentTetromino: null as Tetromino | null,
      count: 0, // animation frame counter
      animation: null as number | null, // track animation so we can toggle it
      showMobileKeypad: false, // show mobile keypad if user is on mobile
      newItemData: {
        name: "new item",
        shape: "I",
      } as ListItem,
    };
  },
  watch: {
    playfield: {
      handler(newPlayfield) {
        localStorage.setItem("playfield", JSON.stringify(newPlayfield));
      },
      deep: true,
    },
    listData: {
      handler(newListData) {
        localStorage.setItem("gameListData", JSON.stringify(newListData));
      },
      deep: true,
    },
    windowWidth: {
      handler(newWindowWidth) {
        this.configPlayfield();
      },
    },
  },
  methods: {
    // sets up the playfield grid data model
    setupGameboard() {
      // create playfield
      for (let row = -2; row < 20; row++) {
        this.playfield[row] = [];
        for (let col = 0; col < 10; col++) {
          this.playfield[row][col] = 0;
        }
      }
    },
    clearGameboard() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setupGameboard();
      this.drawPlayfield();
    },
    gameLoop() {
      this.isPlaying = true;
      this.animation = requestAnimationFrame(this.gameLoop);
      this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      this.drawPlayfield();
      this.count++;
      // tetromino falls every 35 frames
      if (this.count > 35 && this.currentTetromino) {
        this.currentTetromino.row++;
        this.count = 0;

        // place piece if it runs into anything
        if (
          !this.isValidMove(
            this.currentTetromino.matrix,
            this.currentTetromino.row,
            this.currentTetromino.col
          )
        ) {
          this.currentTetromino.row--;
          this.placeTetromino();
          return;
        }
      }
      this.drawTetromino();
    },
    drawPlayfield() {
      for (let row = 0; row < this.playfield.length; row++) {
        for (let col = 0; col < this.playfield[row].length; col++) {
          if (this.playfield[row][col]) {
            const name = this.playfield[row][col];
            this.ctx!.fillStyle = colors[name];
            this.ctx!.fillRect(
              col * this.grid,
              row * this.grid,
              this.grid - 1,
              this.grid - 1
            );
          }
        }
      }
    },
    /**
     * Draws the initial tetromino on the canvas.
     * @param {string} shape - The letter corresponding to the tetromino shape to draw.
     **/
    spawnTetromino(shape: string) {
      // create tetromino object to track name, position, and rotation of drawing
      this.currentTetromino = {
        name: shape,
        matrix: this.tetrominos[shape],
        row: 0,
        col: 4,
      };
      this.drawTetromino();
      //start falling animation
      this.animation = requestAnimationFrame(this.gameLoop);
    },
    drawTetromino() {
      const tetromino = this.currentTetromino;
      if (!tetromino) return;

      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            this.ctx.fillStyle = colors[tetromino.name];
            this.ctx.fillRect(
              (tetromino.col + col) * this.grid,
              (tetromino.row + row) * this.grid,
              this.grid - 1,
              this.grid - 1
            );
          }
        }
      }
    },
    // place the tetromino on the playfield
    placeTetromino() {
      const tetromino = this.currentTetromino;
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            // game over if piece has any part offscreen
            if (tetromino.row - row < 0) {
              // TO DO put into game over function
              this.showGameOver();
            }
            this.playfield[tetromino.row + row][tetromino.col + col] =
              tetromino.name;
          }
        }
      }
      // check for line clears starting from the bottom and working our way up
      for (let row = this.playfield.length - 1; row >= 0; ) {
        if (this.playfield[row].every((cell) => !!cell)) {
          // drop every row above this one
          for (let r = row; r >= 0; r--) {
            for (let c = 0; c < this.playfield[r].length; c++) {
              this.playfield[r][c] = this.playfield[r - 1][c];
            }
            this.linesCleared++;
          }
        } else {
          row--;
        }
      }
      // stop animation & draw new piece as part of playfield
      cancelAnimationFrame(this.animation as number);
      this.isPlaying = false;
      this.drawPlayfield();
      this.currentTetromino = null;
    },
    showGameOver() {
      this.isPlaying = false;
      this.modalData = {
        name: "Game Over",
        description:
          "Your game is over. Close this message and click clear board to play again!",
        shape: "none",
      };
      this.modalShow = !this.modalShow;
    },
    // tetromino movement
    handleKeyPress(e: KeyboardEvent) {
      // if there is no current tetromino, do nothing
      if (this.currentTetromino === null) return;

      // variable that will track next positions for validation
      let tetromino = this.currentTetromino;
      // left & right movement with arrow keys
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const col =
          e.key === "ArrowLeft"
            ? this.currentTetromino.col - 1
            : this.currentTetromino.col + 1;
        if (this.isValidMove(tetromino.matrix, tetromino.row, col)) {
          this.currentTetromino.col = col;
        }
        // rotate with arrow up
      } else if (e.key === "ArrowUp") {
        tetromino.matrix = this.rotate(this.currentTetromino.matrix);
        if (this.isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
          this.currentTetromino.matrix = tetromino.matrix;
        }
      } // down movement with arrow down
      else if (e.key === "ArrowDown") {
        tetromino.row++;
        if (!this.isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
          tetromino.row--;
          this.placeTetromino();
          return;
        }
        this.currentTetromino.row = tetromino.row;
      }
      this.drawTetromino();
    },
    // rotate an NxN matrix 90deg
    // @see https://codereview.stackexchange.com/a/186834
    rotate(matrix) {
      const N = matrix.length - 1;
      const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
      );
      return result;
    },
    // check to see if the new matrix/row/col is valid
    isValidMove(matrix: number[][], cellRow: number, cellCol: number) {
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (
            matrix[row][col] &&
            // outside the game bounds
            (cellCol + col < 0 ||
              cellCol + col >= this.playfield[0].length ||
              cellRow + row >= this.playfield.length ||
              // collides with another piece
              this.playfield[cellRow + row][cellCol + col])
          ) {
            return false;
          }
        }
      }
      return true;
    },
    showModal(item: ListItem) {
      this.modalData = item;
      this.modalShow = !this.modalShow;
    },
    // item management
    addListItem(item: ListItem) {
      this.listData.push(item);
      this.modalShow = !this.modalShow;
    },
    removeListItem(item: ListItem) {
      const index = this.listData.indexOf(item);
      this.listData.splice(index, 1);
    },
    // setup playfield visual view
    configPlayfield() {
      // change grid size based on screen size
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 500) {
        this.grid = 20;
        this.gameWidth = 200;
        this.gameHeight = 400;
      } else {
        this.grid = 32;
        this.gameWidth = 320;
        this.gameHeight = 640;
      }
    },
  },
  beforeMount() {
    this.setupGameboard();
    // if localStorage has list & playfield data, load it
    const listData = localStorage.getItem("gameListData");
    const playfield = localStorage.getItem("playfield");
    if (playfield && listData) {
      this.listData = JSON.parse(listData);
      this.playfield = JSON.parse(playfield);
    } else {
      // otherwise, use sample list
      this.listData = sampleListData;
    }
    this.isLoading = false;
  },
  mounted() {
    this.canvas = this.$refs.gameboard as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.configPlayfield();
    this.showMobileKeypad = isUserUsingMobile();

    this.$nextTick(() => {
      this.drawPlayfield();
    });

    // listen for keydown & resize events
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("resize", this.configPlayfield);
  },
  beforeUnmount() {
    // remove event listener before component is unmounted
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("resize", this.configPlayfield);
  },
};
</script>

<style lang="scss" scoped>
.headerbar {
  margin: 0 auto;
  text-align: center;
  h2 {
    display: inline-block;
    padding: $spacer;
  }
  .score {
    display: inline-block;
    margin-left: auto;
    padding: $spacer;
  }
}
.grid {
  border: 1px solid $button-border-color;
  background-size: $grid-size $grid-size;
  background-position-x: calc($grid-size/2);
  background-position-y: calc($grid-size/2);
  background-image: radial-gradient(
    circle,
    $button-border-color 1px,
    rgba(0, 0, 0, 0) 1px
  );
}
</style>
