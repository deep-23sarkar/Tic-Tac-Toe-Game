let cells = document.querySelectorAll(".cell");
let title = document.getElementById("title-heading");
let resetBtn = document.querySelector(".reset");
let xplayer = document.getElementById("xdisplay");
let oplayer = document.getElementById("odisplay");

//audiofiles
let start = new Audio("Music/game-start-6104.mp3");
let turnBg = new Audio("Music/button-202966.mp3");
let gameOver = new Audio("Music/game-over-160612.mp3");
let winner = new Audio("Music/success-1-6297.mp3");
let error = new Audio("Music/sound-effect-system-error-sound-117733.mp3");
let entry = new Audio("Music/bonk-sound-effect-36055.mp3");

//variable initialize
let player;
let isPause = false;
let gameStart = false;

const inputCells = ["", "", "", "", "", "", "", "", ""];
const winningCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const mainCode = () => {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      tapFunc(cell, index);
    });
  });
  const tapFunc = (cell, index) => {
    if (cell.textContent == "" && !isPause) {
      gameStart = true;
      updateCell(cell, index);
      if (!checkWin()) {
        changePlayer();
        //randomly computer generate move
        //   randomPick();
      }
      if (checkWin() && player == "") {
        error.play();
        title.textContent = "Choose a value";
      }
    }
  };
};

function randomPick() {
  isPause = true;
  let randomIndex;
  setTimeout(() => {
    do {
      randomIndex = Math.floor(Math.random() * 9);
    } while (inputCells[randomIndex] != "");

    updateCell(cells[randomIndex], randomIndex, player);
    if (!checkWin()) {
      changePlayer();
      isPause = false;
    }
  }, 1000);
}
let yourPlayer;
function setPlayer(selectedVal) {
  turnBg.play();
  if (selectedVal === "X" && !gameStart && player != "O") {
    player = "X";
    yourPlayer = "X";
    xplayer.classList.add("player-active");
    title.textContent = `You: ${player}`;
  }
  if (selectedVal === "O" && !gameStart && player != "X") {
    player = "O";
    yourPlayer = "O";
    oplayer.classList.add("player-active");
    title.textContent = `You: ${player}`;
  }
}

function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  console.log(inputCells[index], index);
  cell.style.color = (player === "X" )? "#1892EA" : "#A737FF";
}
function changePlayer() {
  player = (player === "X") ? "O" : "X";
}

function checkWin() {
  if (player == '') {
    resetFunc();
    return true;
  } else {
    turnBg.play();
    for (const [a, b, c] of winningCells) {
      // console.log(inputCells[a,b,c])
      if (
        inputCells[a] == player &&
        inputCells[b] == player &&
        inputCells[c] == player
      ) {
        declareWin([a, b, c]);
        return true
      }
      if (inputCells.every((cell) => cell != "")) {
        
        declareDraw();
        return true;
      }
    }
  }
}
let drawSound = new Audio("Music/brass-fail-11-a-207140.mp3");
function declareDraw() {
  drawSound.play();
  title.textContent = "Match Draw";
  isPause = false;
  gameStart = false;
  resetBtn.style.visibility = "visible";
  document.querySelector(".back-btn").style.visibility = "visible";
}
function declareWin(winIndices) {
  if (yourPlayer === player) winner.play();
  else gameOver.play();
  title.textContent = `${player} win`;
  isPause = true;
  winIndices.forEach((index) => (cells[index].style.background = "#2A2343"));

  resetBtn.style.visibility = "visible";
  document.querySelector(".back-btn").style.visibility = "visible";
}

resetBtn.addEventListener("click", () => {
  start.play();
  resetFunc();
});
function resetFunc() {
  cells.forEach((cell, index) => {
    inputCells[index] = "";
    cell.textContent = "";
    cell.style.background = "#17122a";
  });
  isPause = false;
  gameStart = false;
  title.textContent = "Choose";
  player = "";

  xplayer.classList.remove("player-active");
  oplayer.classList.remove("player-active");
}

//Code for entry point
let entryBtn = document.querySelector(".entryBtn");

entryBtn.addEventListener("click", () => {
  entry.play();
  setTimeout(() => {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".container1").style.display = "block";
    document.body.style.background = "#3a4452";
  }, 600);
});

document.querySelector(".back-btn").addEventListener("click", () => {
  setTimeout(() => {
    start.play();
    resetFunc();
    document.querySelector(".container").style.display = "block";
    document.querySelector(".container2").style.display = "none";
    document.body.style.background = "#3a4452";
  }, 100);
});

//Manual functionality code

document.querySelector(".manual-btn").addEventListener("click", () => {
  document.querySelector(".container1").style.display = "none";
  document.querySelector(".container2").style.display = "block";
  document.body.style.background = "#0A0519";
  start.play();
  mainCode();
});
document.querySelector(".com-btn").addEventListener("click", () => {
  document.querySelector(".container1").style.display = "none";
  document.querySelector(".container2").style.display = "block";
  document.body.style.background = "#0A0519";
  start.play();
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      tapFunc(cell, index);
    });
  });
  const tapFunc = (cell, index) => {
    if (cell.textContent == "" && !isPause) {
      gameStart = true;
      updateCell(cell, index);
      if (!checkWin()) {
        changePlayer();
        //randomly computer generate move
        randomPick();
      }
      if (checkWin() && player == "") {
        error.play();
        title.textContent = "Choose a value";
      }
    }
  };
});
