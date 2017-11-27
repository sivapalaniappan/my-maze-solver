import { Queue, Stack } from './helpers';

const stack = new Stack();
const branchStack = new Stack();
const visitedPath = new Queue();
let destinationFound = false;
let count = 0;
let maze = [];
let errorMessage;

export function performDepthFirstSearch(inputMazeData) {
    const startTime = Date.now();
    maze = inputMazeData;

    for(let row = 0; row < maze.length; row++) {
        for(let column = 0; column < maze[row].length; column++) {
            if(maze[row][column].id === 'A') {
                maze[row][column].visited = true;
                stack.push([row, column]);
                break;
            }
        }
    }

    const startingPosition = stack.top();
    if(startingPosition) {
        checkNeighbors(...startingPosition);
    }
    else {
        errorMessage = 'Could not find the starting position';
    }

    const endTime = Date.now();
    const duration = (endTime - startTime);

    return {
        finalPath: stack,
        visitedPath,
        pathFound: destinationFound,
        message: errorMessage,
        duration
    };
}

function checkNeighbors(row, column) {
    let top, bottom, left, right, wayFound = false;
    count++;
    visitedPath.enqueue([row, column]);

    if(!destinationFound && maze[row][column].id === 'B') {
        destinationFound = true;
        return -1;
    }
    else {
        if(row > 0) {
            top = row - 1;
        }

        if(row < maze.length - 1) {
            bottom = row + 1;
        }

        if(column > 0) {
            left = column - 1;
        }

        if(column < maze[row].length - 1) {
            right = column + 1;
        }

        checkIfThisIsBranch(top, bottom, left, right, row, column);

        if(isValidNode(top, column)) {
            wayFound = true;
            setNodeVisitedAndPushToStack(top, column);
            checkNeighbors(top, column);
        }
        else if (isValidNode(bottom, column)) {
            wayFound = true;
            setNodeVisitedAndPushToStack(bottom, column);
            checkNeighbors(bottom, column);
        }
        else if (isValidNode(row, left)) {
            wayFound = true;
            setNodeVisitedAndPushToStack(row, left);
            checkNeighbors(row, left);
        }
        else if (isValidNode(row, right)) {
            wayFound = true;
            setNodeVisitedAndPushToStack(row, right);
            checkNeighbors(row, right);
        }

        if(!wayFound && !destinationFound) {
            let previousIntersection = branchStack.top();

            if(previousIntersection) {
                branchStack.pop();
                clearStackUntilPreviousIntersection(previousIntersection);
                checkNeighbors(previousIntersection[0], previousIntersection[1]);
            }
            else {
                errorMessage = 'NO EXIT PATH FOUND EVEN AFTER ' + count + ' MOVES';
                return -1;
            }
        }
    }
}

function checkIfThisIsBranch(top, bottom, left, right, row, column) {
    let possiblePaths = 0;

    if(isValidNode(top, column)) possiblePaths++;
    if(isValidNode(bottom, column)) possiblePaths++;
    if(isValidNode(row, left)) possiblePaths++;
    if(isValidNode(row, right)) possiblePaths++;

    if(possiblePaths > 1) {
        branchStack.push([row, column]);
    }
}

function isValidNode(rowIndex, columnIndex) {
    const isValid = ((rowIndex || rowIndex === 0) && (columnIndex || columnIndex === 0) && maze[rowIndex][columnIndex].id !== '#' && !maze[rowIndex][columnIndex].visited);
    return isValid;
}

function setNodeVisitedAndPushToStack (rowIndex, columnIndex) {
    maze[rowIndex][columnIndex].visited = true;
    stack.push([rowIndex, columnIndex]);
}

function clearStackUntilPreviousIntersection(previousIntersection) {
    let topPathStack = stack.top();
    while(!(topPathStack[0] === previousIntersection[0] && topPathStack[1] === previousIntersection[1])) {
        stack.pop();
        topPathStack = stack.top();
    }
}
