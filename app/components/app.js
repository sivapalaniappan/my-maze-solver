import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Maze from './maze';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mazeText: '',
            searchMethod: 'bfs'
        };
    }

    handleInputChange(event) {
        const { target = {} } = event;
        const { name = '', value = '' } = target;

        this.setState({
            [name]: value
        });
    }

    validateMazeData(mazeText) {
        const valid_chars = "#.AB";

        if(mazeText.length === 0) {
            return false;
        }

        for (let x=0; x < mazeText.length; x++)
        {
            if(valid_chars.indexOf(mazeText.charAt(x)) === -1 && mazeText.charAt(x) !== '\n')
            {
                return false;
            }
        }
        return true;
    }

    transformMazeData(mazeText) {
        let transformedMaze = mazeText.split('\n');

        transformedMaze = transformedMaze.map(line => {
            let cells = [];

            for(let i = 0; i < line.length; i++) {
                cells.push({ id: line[i] });
            }

            return cells;
        });

        return transformedMaze;
    }

    handleSubmit(event) {
        event.preventDefault();
        const { mazeText = '' } = this.state;

        const isValidMazeData = this.validateMazeData(mazeText);

        if(mazeText.length === 0) {
            const error = "No Input Provided. Please Enter the Maze values";
            this.setState({ response: error });
        }
        else if(!isValidMazeData) {
            const error = "Invalid characters Found ( only 'AB#.' are allowed)";
            this.setState({ response: error });
        }
        else {
            this.setState({ response: '' });
            const transformedMaze = this.transformMazeData(mazeText);
            ReactDOM.render(<Maze maze={transformedMaze} searchMethod={this.state.searchMethod}/>, document.getElementById('root'));
        }
    }

    render() {
        return (
            <div className="app">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label htmlFor="maze">Enter Maze: </label>
                    <br/>
                    <textarea id="mazeText" name="mazeText" rows="30" value={this.state.mazeText} onChange={this.handleInputChange.bind(this)}/>
                    <label>Select Search Type: </label>
                    <select name="searchMethod" value={this.state.searchMethod} onChange={this.handleInputChange.bind(this)}>
                        <option value="bfs">Breadth First Search</option>
                        <option value="dfs">Depth First Search</option>
                    </select>
                    <br/>
                    <button>Find Route</button>
                </form>
                <div className="response">
                    <h3 className={this.state.response ? '' : 'hidden'}>{this.state.response}</h3>
                </div>
            </div>
        );
    }

}

export default App;
