let boardSideLength = 16;
let grid = document.getElementById("grid");
let modeSelector = 0; //0 for b&w mode, 1 for rainbow, 2 for greyscale
let gridLines = 0; //0 for off, 1 for on

function createSquares(appendToID) {
    for(let i=0; i < boardSideLength; i++) {
        let square = document.createElement("DIV");
        square.className = "square";
        square.id = `square ${i}`
        let squareSideLength = 100/boardSideLength;
        square.style.height = `${squareSideLength}%`;
        document.getElementById(appendToID).appendChild(square);
    }
};

function createGrid(appendToID) {
    for(let i=0; i < boardSideLength; i++) {
        let column = document.createElement("DIV");
        column.className = "column";
        column.id = `column ${i}`
        let columnWidth = 100/boardSideLength;
        column.style.width = `${columnWidth}%`
        document.getElementById(appendToID).appendChild(column);
        createSquares(`column ${i}`);
    }
};

function getNewBoardSize() {
    newBoardSize = prompt("Enter number for new board size, e.g. 16 will create a 16x16 board. Sizes over 100 start to get laggy");
    !newBoardSize || isNaN(newBoardSize)? 
    alert("Enter number greater than 0"): resizeBoard()
}

function resizeBoard() {
    
    boardSideLength = newBoardSize;
    let container = document.getElementById('container');
    grid.remove();
    grid = document.createElement("DIV");
    grid.id = "grid"
    document.getElementById("container").appendChild(grid)
    createGrid("grid")
    addSquareEventListeners()
};

function colorSquare(e) {
    if (modeSelector === 0) {
        e.target.style.backgroundColor = "black";
    }else if (modeSelector === 1) {
        e.target.style.backgroundColor = randomColorGenerator();
    }else if (modeSelector === 2) {
        e.target.style.backgroundColor = darkenBackground(e);
    }
    
};

function addSquareEventListeners() {
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("mouseenter", colorSquare);
    });
};

function randomColorGenerator() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

function darkenBackground(e) {
    let currentSquareColor = window.getComputedStyle(e.target).getPropertyValue("background-color");
    console.log(currentSquareColor)
    let currentAlpha = currentSquareColor.slice(-4,-1);
    let newAlpha;
    if(currentAlpha == 255){newAlpha = 0.9}
    else {newAlpha = ((currentAlpha*10)-1)/10}
    return `rgba(255,255,255,${newAlpha})`
};

function addOrRemoveGridLines() {
    squares = document.querySelectorAll('.square')
    if (!gridLines) {
        squares.forEach((square) => {
            square.classList.add('gridLines')
        })
        gridLines = 1;
    }else {
        squares.forEach((square) => {
            square.classList.remove('gridLines')
        })
        gridLines = 0;
    }
}
let resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", getNewBoardSize);

let blackAndWhiteModeButton = document.getElementById('blackMode');
blackAndWhiteModeButton.addEventListener("click", function(){modeSelector=0});

let rainbowModeButton = document.getElementById('rainbowMode');
rainbowModeButton.addEventListener("click", function(){modeSelector=1});

let greyscaleModeButton = document.getElementById('greyscaleMode');
greyscaleModeButton.addEventListener("click", function(){modeSelector=2});

let gridLinesButton = document.getElementById('gridLines');
gridLinesButton.addEventListener("click", addOrRemoveGridLines)

createGrid("grid")
addSquareEventListeners()