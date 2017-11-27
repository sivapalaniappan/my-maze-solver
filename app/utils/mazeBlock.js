//Draw the game board
let canvas = [];
export function draw(inputCanvas, ctx, blockSize, width, board) {
    canvas = inputCanvas;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="black";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x].id === '#'){
                ctx.fillStyle="black";
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(board[y][x].id === 'B'){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "red";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
            else if(board[y][x].id === 'A') {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
        }
    }
}

export function paintTheMaze(stack, queue) {
    printVisitedNodes(queue, stack);
}

function printVisitedNodes(queue, stack) {
    let blockSize = 10;
    var ctx1 = canvas[0].getContext('2d');
    ctx1.beginPath();
    queue.items.map((cell, index) => {
        setTimeout(() => {
            ctx1.fillStyle="#effcb8";
            ctx1.fillRect(cell[1]*blockSize, cell[0]*blockSize, blockSize, blockSize);
        }, 2*index);

        if(index === queue.length - 1) {
            setTimeout(() => {
                printActualPath(stack, ctx1);
            }, 2*index)
        }
    });
}

function printActualPath(stack, ctx) {
    let blockSize = 10;
    ctx.beginPath();
    ctx.fillStyle="green";
    stack.items.map((cell, index) => {
        ctx.fillRect(cell[1]*blockSize, cell[0]*blockSize, blockSize, blockSize);
    });
}
