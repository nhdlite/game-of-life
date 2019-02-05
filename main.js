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
                positionX: i - 1,
                positionY: j - 1,
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
    var canvas =document.getElementById("gameOfLifeView");
    var context = canvas.getContext("2d");
    const rectSize = 50;
    let totalPxHeight = height * rectSize;
    let totalPxWidth = width * rectSize;
    
    // Draw horizontal line on the x and y axis
    context.beginPath();
    context.fillStyle = '#000';
    context.moveTo(0, 0);
    context.lineTo(totalPxWidth, 0);
    context.stroke();

    context.moveTo(0,0);
    context.lineTo(0, totalPxHeight);
    context.stroke();

    for(let i = 1; i <= width; i++) {
        for(let j = 1; j <= height; j++) {
            context.fillStyle = '#000';
            const xDrawPosition = i * rectSize;
            const yDrawPosition = j * rectSize;

            context.moveTo(xDrawPosition, yDrawPosition);
            context.lineTo(xDrawPosition - rectSize, yDrawPosition);
            context.stroke();

            context.moveTo(xDrawPosition, yDrawPosition);
            context.lineTo(xDrawPosition, yDrawPosition - rectSize);
            context.stroke();
            
            if(i !== 10 && j !== 10);
            context.fillStyle =  (i === 10 && j === 10) ? '#0F0' : '#F00';
            context.fillRect(xDrawPosition - 1, yDrawPosition - 1, -1 * (rectSize - 2), -1 * (rectSize - 2));
        }
    }

    /*
    for(let i = 1; i <= width; i++) {
        for(let j = 1; j <= height; j++) {
            const rectSize = 50;

            var rectXPos = gameBoard[i][j].positionX * rectSize;
            var rectYPos = gameBoard[i][j].positionY * rectSize;
            var rectWidth = rectSize;
            var rectHeight = rectSize;

            ctx.fillStyle='#000';
            ctx.fillRect(rectXPos - (1), rectYPos - (1), rectWidth + (1 * 2), rectHeight + (1 * 2));

            ctx.fillStyle = gameBoard[i][j].isAlive ? '#FF0' : '#0F0';
            ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);
        }
    }
    */
}

const gameLoop = () => {
    update();
    drawCanvas();
}

const on_canvas_click = (ev) => {
    var c = document.getElementById("gameOfLifeView");
    var x = ev.clientX - c.offsetLeft;
    var y = ev.clientY - c.offsetTop;

    // ... x,y are the click coordinates relative to the
    // canvas itself
    window.alert(`Hello ${x}, ${y}`)
}

window.onload = () => {
    var c = document.getElementById("gameOfLifeView");
    c.addEventListener('click', on_canvas_click, false); 
    initSimulation();
    setFrameSpeed(1, gameLoop);
};