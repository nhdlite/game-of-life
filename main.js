let gameBoard = [];
const width = 10;
const height = 10;
const bufferWidth = 12;
const bufferHeight = 12;
const initSimulation = () => {
    for(let i = 0; i < bufferWidth; i++) {
        gameBoard.push([]);
        for(let j = 0; j < bufferHeight; j++) {
            gameBoard[i].push([]);
            // let isAlive = Math.floor(Math.random() * 10) > 4 && i !== 0 && i !== bufferWidth - 1 && j !== 0 && j !== bufferHeight - 1 ? true : false;
            let isAlive = false;
            gameBoard[i][j] = {
                positionX: i,
                positionY: j,
                isAlive: isAlive,
                wasAlive: isAlive,
            }
        }
    }
    console.log(gameBoard);
    gameBoard[5][4].isAlive = true;
    gameBoard[5][5].isAlive = true;
    gameBoard[5][6].isAlive = true;
    gameBoard[6][6].isAlive = true;

    return gameBoard;
}

const setFrameSpeed = (fps, cb) => {
    setInterval(cb,1000/fps);
}

const update = () => {
    for(let i = 1; i <= width; i++) {
        for(let j = 1; j <= height; j++) {
            gameBoard[i][j].wasAlive = gameBoard[i][j].isAlive;
        }
    }

    for(let i = 1; i <= width; i++) {
        for(let j = 1; j <= height; j++) {
            let liveNeighborCount = 0;
            // Check top row;
            liveNeighborCount += gameBoard[i-1][j-1].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i-1][j].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i-1][j+1].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i][j-1].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i][j+1].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i+1][j-1].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i+1][j].wasAlive ? 1 : 0;
            liveNeighborCount += gameBoard[i+1][j+1].wasAlive ? 1 : 0;

            if (gameBoard[i][j].isAlive && liveNeighborCount < 2) {
                gameBoard[i][j].isAlive = false;
            }

            if (gameBoard[i][j].isAlive && liveNeighborCount > 3) {
                gameBoard[i][j].isAlive = false;
            }

            if (gameBoard[i][j].isAlive && liveNeighborCount === 2 || liveNeighborCount === 3) {
                // Do nothing
            }

            if (!gameBoard[i][j].isAlive && liveNeighborCount === 3) {
                gameBoard[i][j].isAlive = true;
            }
        }
    }
}

const drawCanvas = () => {
    var c=document.getElementById("gameOfLifeView");
    var ctx=c.getContext("2d");

    gameBoard.forEach((row) => {
        row.forEach((entry) => {
            const rectSize = 50;

            var rectXPos = entry.positionX * rectSize;
            var rectYPos = entry.positionY * rectSize;
            var rectWidth = rectSize;
            var rectHeight = rectSize;

            ctx.fillStyle='#000';
            ctx.fillRect(rectXPos - (1), rectYPos - (1), rectWidth + (1 * 2), rectHeight + (1 * 2));

            ctx.fillStyle = entry.isAlive ? '#FF0' : '#0F0';
            ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);
        });
    });
}

const gameLoop = () => {
    update();
    drawCanvas();
}



window.onload = () => {
    initSimulation();
    setFrameSpeed(1, gameLoop);
};