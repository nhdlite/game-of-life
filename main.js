let gameBoard = {};
const width = 10;
const height = 10;
const rectSize = 50;

const initSimulation = () => {
    // Draw the initial board
    var canvas =document.getElementById("gameOfLifeView");
    var context = canvas.getContext("2d");
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

    // Set initial positions on the gameboard
    gameBoard['50_100'] = {
        isAlive: true,
        wasAlive: true,
    };
    gameBoard['200_400'] = {
        isAlive: true,
        wasAlive: true,
    };
}

const setFrameSpeed = (fps, cb) => {
    setInterval(cb,1000/fps);
}

const update = () => {
    // Please implement me
    console.log(gameBoard);
    /*
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
    */
}

const drawCanvas = () => {
    var canvas =document.getElementById("gameOfLifeView");
    var context = canvas.getContext("2d");

    for(let key in gameBoard) {
        const data = gameBoard[key];
        const coordinates = key.split('_');
        data.x = coordinates[0];
        data.y = coordinates[1];

        if(data.isAlive) {
            context.fillStyle =  '#00F';
            context.fillRect(data.x, data.y, rectSize - 2, rectSize - 2);
        } else {
            context.fillStyle =  '#F00';
            context.fillRect(data.x, data.y, rectSize - 2, rectSize - 2);
        }
    }

    // Future improvement: Just draw long horizontal and vertical lines instead of little insertions. The entire game space can be filled in before starting.
}

const gameLoop = () => {
    update();
    drawCanvas();
}

const on_canvas_click = (ev) => {
    var c = document.getElementById("gameOfLifeView");
    var x = ev.clientX - c.offsetLeft;
    var y = ev.clientY - c.offsetTop;
    console.log(`Hello ${x}, ${y}`);

    for(let i = x; i % rectSize !== 0; i--) {
        x = i;
    }
    for(let i = y; i % rectSize !== 0; i--) {
        y = i;
    }
    y--;
    x--;
    console.log(`Goodbye ${x}, ${y}`)
    if (gameBoard[`${x}_${y}`]) {
        gameBoard[`${x}_${y}`].isAlive = !gameBoard[`${x}_${y}`].isAlive;
        gameBoard[`${x}_${y}`].wasAlive = gameBoard[`${x}_${y}`].isAlive;

    } else {
        gameBoard[`${x}_${y}`] = {
            wasAlive: true,
            isAlive: true,
        }
    }

    // ... x,y are the click coordinates relative to the
    // canvas itself
    
}

window.onload = () => {
    var c = document.getElementById("gameOfLifeView");
    c.addEventListener('click', on_canvas_click, false); 
    initSimulation();
    setFrameSpeed(1, gameLoop);
};