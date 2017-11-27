import { Queue, Stack } from './helpers';

const stack = new Stack();
const queue = new Queue();
const visitedPath = new Queue();
let finalPath = [];
let maze = [];
let errorMessage;
let destinationFound = false;

export function performBreadthFirstSearch(inputMazeData) {
    const startTime = Date.now();
    maze = inputMazeData;

    for(let row = 0; row < maze.length; row++) {
        for(let column = 0; column < maze[row].length; column++) {
            if(maze[row][column].id === 'A') {
                maze[row][column].visited = true;
                maze[row][column].distance = 1;
                queue.enqueue([row, column]);
            }
        }
    }

    if(queue.length === 0) {
        errorMessage = 'Could not find the starting position';

        return {
            pathFound: destinationFound,
            message: errorMessage
        };
    }

    let destination;

    while(queue.length > 0) {
        const currentNode = queue.dequeue();
        const row = currentNode[0], column = currentNode[1];
        maze[row][column].visited = true;
        visitedPath.enqueue(currentNode);


        if(maze[row][column].id === 'B') {
            destination = currentNode;
            destinationFound = true;
            break;
        }
        else {
            const adjacentNodes = getValidAdjacentNodes(row, column);
            const distanceFromStart = maze[row][column].distance || 1;

            adjacentNodes.forEach((node) => {
                const nodeRow = node[0], nodeColumn = node[1];
                maze[nodeRow][nodeColumn].visited = true;
                maze[nodeRow][nodeColumn].distance = distanceFromStart + 1;
                queue.enqueue(node);
            });
        }
    }

    if(!destinationFound) {
        errorMessage = 'NO EXIT PATH FOUND';

        return {
            pathFound: destinationFound,
            message: errorMessage
        };
    }

    backTrackPath(...destination);

    const endTime = Date.now();
    const duration = (endTime - startTime);

    let finalPathStack = {
        items: finalPath,
        length: finalPath.length
    };

    return {
        finalPath: finalPathStack,
        visitedPath,
        pathFound: destinationFound,
        message: errorMessage,
        duration
    };
}


function getValidAdjacentNodes(row, column) {
    let top, bottom, left, right;
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

    let validNeighbors = [];

    if(isValidUnvisitedNode(top, column)) {
        validNeighbors.push([top, column]);
    }
    if(isValidUnvisitedNode(bottom, column)) {
        validNeighbors.push([bottom, column]);
    }
    if(isValidUnvisitedNode(row, left)) {
        validNeighbors.push([row, left]);
    }
    if(isValidUnvisitedNode(row, right)) {
        validNeighbors.push([row, right]);
    }

    return validNeighbors;
}

function isValidUnvisitedNode(rowIndex, columnIndex) {
    const isValid = ((rowIndex || rowIndex === 0) && (columnIndex || columnIndex === 0) && maze[rowIndex][columnIndex].id !== '#' && !maze[rowIndex][columnIndex].visited);
    return isValid;
}


function backTrackPath(row, column) {
    finalPath.unshift([row, column]);
    const getParent = getCloserNeighbour(row, column);

    if(getParent && getParent.length > 0) {
        backTrackPath(...getParent);
    }
}

function getCloserNeighbour(row, column) {
    let top, bottom, left, right;
    const distanceFromStart = maze[row][column].distance;
    const parentDistance = distanceFromStart - 1;

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

    let validNeighbor;

    if(isValidTravelledNode(top, column, parentDistance)) {
        validNeighbor = [top, column];
    }
    else if(isValidTravelledNode(bottom, column, parentDistance)) {
        validNeighbor = [bottom, column];
    }
    else if(isValidTravelledNode(row, left, parentDistance)) {
        validNeighbor = [row, left];
    }
    else if(isValidTravelledNode(row, right, parentDistance)) {
        validNeighbor = [row, right];
    }

    return validNeighbor;
}

function isValidTravelledNode(rowIndex, columnIndex, parentDistance) {
    const isValid = ((rowIndex || rowIndex === 0) && (columnIndex || columnIndex === 0) && maze[rowIndex][columnIndex].id !== '#' && maze[rowIndex][columnIndex].visited && maze[rowIndex][columnIndex].distance === parentDistance);
    return isValid;
}
