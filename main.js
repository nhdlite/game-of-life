let gameBoard = {};
const width = 10;
const height = 10;
const rectSize = 50;
let gameStarted = false;
let generationCounter = 1;

const drawEmptyGrid = () => {
    var canvas = document.getElementById("gameOfLifeView");
    var context = canvas.getContext("2d");
    let totalPxHeight = height * rectSize;
    let totalPxWidth = width * rectSize;
    context.lineWidth = 1;

    for(let i = 0; i <= width; i++) {
        context.fillStyle = '#000';
        const xDrawPosition = i * rectSize;
        context.moveTo(xDrawPosition, 0);
        context.lineTo(xDrawPosition, totalPxHeight);
        context.stroke();
    }

    for(let i = 0; i <= height; i++) {
        context.fillStyle = '#000';
        const yDrawPosition = i * rectSize;
        context.moveTo(0, yDrawPosition);
        context.lineTo(totalPxWidth, yDrawPosition);
        context.stroke();
    }
}

const setFrameSpeed = (fps, cb) => {
    setInterval(cb,1000/fps);
}

const update = () => {
    // Please implement me
    console.log(gameBoard);
    let updatedGameBoard = gameBoard;
    for(key in gameBoard) {
        // Get x and y coordinates
        const coordinates = key.split('_');
        const x = parseInt(coordinates[0]);
        const y = parseInt(coordinates[1]);

        // Update values
        updatedGameBoard[key].wasAlive = gameBoard[key].isAlive;

        // Add neighbors if they do not exist
        // Top Row
        if(!gameBoard[`${x-rectSize}_${y-rectSize}`]) {
            updatedGameBoard[`${x-rectSize}_${y-rectSize}`] = { isAlive: false, wasAlive: false };
        }

        if(!gameBoard[`${x}_${y-rectSize}`]) {
            updatedGameBoard[`${x}_${y-rectSize}`] = { isAlive: false, wasAlive: false };
        }

        if(!gameBoard[`${x+rectSize}_${y-rectSize}`]) {
            updatedGameBoard[`${x+rectSize}_${y-rectSize}`] = { isAlive: false, wasAlive: false };
        }

        // Next To
        if(!gameBoard[`${x-rectSize}_${y}`]) {
            updatedGameBoard[`${x-rectSize}_${y}`] = { isAlive: false, wasAlive: false };
        }

        if(!gameBoard[`${x+rectSize}_${y-rectSize}`]) {
            updatedGameBoard[`${x+rectSize}_${y}`] = { isAlive: false, wasAlive: false };
        }

        // Below
        if(!gameBoard[`${x-rectSize}_${y+rectSize}`]) {
            updatedGameBoard[`${x-rectSize}_${y+rectSize}`] = { isAlive: false, wasAlive: false };
        }

        if(!gameBoard[`${x}_${y+rectSize}`]) {
            updatedGameBoard[`${x}_${y+rectSize}`] = { isAlive: false, wasAlive: false };
        }

        if(!gameBoard[`${x+rectSize}_${y+rectSize}`]) {
            updatedGameBoard[`${x+rectSize}_${y+rectSize}`] = { isAlive: false, wasAlive: false };
        }
    }
    gameBoard = updatedGameBoard;

    for(key in gameBoard) {
        // Get x and y coordinates
        const coordinates = key.split('_');
        const x = parseInt(coordinates[0]);
        const y = parseInt(coordinates[1]);

        let liveNeighborCount = 0;

        // Above
        liveNeighborCount += gameBoard[`${x-rectSize}_${y-rectSize}`] && gameBoard[`${x-rectSize}_${y-rectSize}`].wasAlive ? 1 : 0;
        liveNeighborCount += gameBoard[`${x}_${y-rectSize}`] && gameBoard[`${x}_${y-rectSize}`].wasAlive ? 1 : 0;
        liveNeighborCount += gameBoard[`${x+rectSize}_${y-rectSize}`] && gameBoard[`${x+rectSize}_${y-rectSize}`].wasAlive ? 1 : 0;

        //Side
        liveNeighborCount += gameBoard[`${x-rectSize}_${y}`] && gameBoard[`${x-rectSize}_${y}`].wasAlive ? 1 : 0;
        liveNeighborCount += gameBoard[`${x+rectSize}_${y}`] && gameBoard[`${x+rectSize}_${y}`].wasAlive ? 1 : 0;

        //Below
        liveNeighborCount += gameBoard[`${x-rectSize}_${y+rectSize}`] && gameBoard[`${x-rectSize}_${y+rectSize}`].wasAlive ? 1 : 0;
        liveNeighborCount += gameBoard[`${x}_${y+rectSize}`] && gameBoard[`${x}_${y+rectSize}`].wasAlive ? 1 : 0;
        liveNeighborCount += gameBoard[`${x+rectSize}_${y+rectSize}`] && gameBoard[`${x+rectSize}_${y+rectSize}`].wasAlive ? 1 : 0;
        
        if (gameBoard[`${x}_${y}`].isAlive && liveNeighborCount < 2) {
            gameBoard[`${x}_${y}`].isAlive = false;
        }

        if (gameBoard[`${x}_${y}`].isAlive && liveNeighborCount > 3) {
            gameBoard[`${x}_${y}`].isAlive = false;
        }

        if (gameBoard[`${x}_${y}`].isAlive && liveNeighborCount === 2 || liveNeighborCount === 3) {
            // Do nothing
        }

        if (!gameBoard[`${x}_${y}`].isAlive && liveNeighborCount === 3) {
            gameBoard[`${x}_${y}`].isAlive = true;
        }
    }
}

const drawCell = (x, y, isAlive) => {
    let canvas =document.getElementById("gameOfLifeView");
    let context = canvas.getContext("2d");

    if(isAlive) {
        context.fillStyle =  '#00F';
        context.fillRect(x + 1, y + 1, rectSize - 2, rectSize - 2);
    } else {
        context.fillStyle = '#FFF';
        context.fillRect(x + 1, y + 1, rectSize - 2, rectSize - 2);
    }
}

const drawCanvas = () => {
    let canvas =document.getElementById("gameOfLifeView");
    let context = canvas.getContext("2d");

    for(let key in gameBoard) {
        const data = gameBoard[key];
        const coordinates = key.split('_');
        let x = parseInt(coordinates[0]);
        let y = parseInt(coordinates[1]);

        if(data.isAlive) {
            context.fillStyle =  '#00F';
            context.fillRect(x + 1, y + 1, rectSize - 2, rectSize - 2);
        } else {
            context.fillStyle =  '#FFF';
            context.fillRect(x + 1, y + 1, rectSize - 2, rectSize - 2);
        }
    }
}

const gameLoop = () => {
    if (gameStarted) {
        update();
        generationCounter++;
        drawCanvas();
    }
}

const on_canvas_click = (ev) => {
    let c = document.getElementById("gameOfLifeView");
    let x = ev.clientX - c.offsetLeft;
    let y = ev.clientY - c.offsetTop;

    for(let i = x; i % rectSize !== 0; i--) {
        x = i;
    }
    for(let i = y; i % rectSize !== 0; i--) {
        y = i;
    }
    y--;
    x--;

    if (gameBoard[`${x}_${y}`]) {
        gameBoard[`${x}_${y}`].isAlive = !gameBoard[`${x}_${y}`].isAlive;
        gameBoard[`${x}_${y}`].wasAlive = gameBoard[`${x}_${y}`].isAlive;
        drawCell(x, y, gameBoard[`${x}_${y}`].isAlive);

    } else {
        gameBoard[`${x}_${y}`] = {
            wasAlive: true,
            isAlive: true,
        }
        drawCell(x, y, true);
    }
}

window.onload = () => {
    var c = document.getElementById("gameOfLifeView");
    c.addEventListener('click', on_canvas_click, false); 

    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click', ()=> {
        gameStarted = true;
    });

    drawEmptyGrid();
    setFrameSpeed(1, gameLoop);
};