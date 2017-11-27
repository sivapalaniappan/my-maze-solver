import React, { Component } from 'react';
import { performDepthFirstSearch } from '../utils/depthFirstSearch';
import { performBreadthFirstSearch } from '../utils/breadthFirstSearch';
import { draw, paintTheMaze } from '../utils/mazeBlock';

class Maze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maze: this.props.maze
        };
    }

    componentDidMount() {
        const { maze = [] } = this.state;

        const canvas = $('#GameBoardCanvas');
        const height = maze.length * 10;
        let width = 0;

        for (let i=0; i < maze.length; i++) {
            if(maze[i].length > width) {
                width = maze[i].length;
            }
        }
        width *= 10;

        let blockSize = 10;
        let ctx = canvas[0].getContext('2d');
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        draw(canvas, ctx, blockSize, width, maze);

        let mazeOutput;

        switch(this.props.searchMethod) {
            case 'bfs':
                mazeOutput = performBreadthFirstSearch(maze);
                break;

            case 'dfs':
                mazeOutput = performDepthFirstSearch(maze);
                break;
        }

        if(mazeOutput.pathFound) {
            paintTheMaze(mazeOutput.finalPath, mazeOutput.visitedPath);
            this.setState({
                message: `Destination Found in ${mazeOutput.visitedPath.length} Moves and ${mazeOutput.duration} ms. The length of Final Path is ${mazeOutput.finalPath.length}`
            })
        }
        else {
            this.setState({
                message: mazeOutput.message
            });
        }
    }

    render() {
        return (
            <div className="app">
                <h3>Maze Results ({this.props.searchMethod}) - </h3>
                {this.state.message &&
                    (
                        <h4>{this.state.message}</h4>
                    )
                }
                <canvas id="GameBoardCanvas"></canvas>
            </div>
        );
    }
}

export default Maze;
