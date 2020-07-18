let boardSideLength = 16;
grid = document.getElementById("grid");

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

function createColumns(appendToID) {
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
    !newBoardSize? alert("Enter number greater than 0"): resizeBoard()
}

function resizeBoard() {
    
    boardSideLength = newBoardSize;
    let container = document.getElementById('container');
    grid.remove();
    grid = document.createElement("DIV");
    grid.id = "grid"
    document.getElementById("container").appendChild(grid)
    createColumns("grid")
    addEventListeners()
}

function addEventListeners() {
    let squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("mouseenter", function(e) {
            e.target.style.backgroundColor = "black";
        });
});
    let resetButton = document.getElementById('resetButton');
    resetButton.addEventListener("click", getNewBoardSize);
};

createColumns("grid")
addEventListeners()