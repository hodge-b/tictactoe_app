import React from 'react';
import {nanoid} from 'nanoid';
import TicGrid from './components/TicGrid';
import {checkRowsForWin, checkColumnsForWin, checkDiagonalsForWin, checkForFullGrid} from './utility/checkGrid';
import './style.css'


export default function App(){

    // initialize states to be used in application
    const [grid, setGrid] = React.useState(setupGrid());
    const [game, setGame] = React.useState({
        id: nanoid(),
        isPlayer01Turn: true,
        isWon: false,
        isPlayer01Win: false,
        previousWinner: '',
        player01WinCount: 0,
        player02WinCount: 0
    });

    // function used to setup the objects and populate the grid state
    function setupGrid(){
        const newArray = [];
        for(let i=0; i<3; i++){
            const secondaryArr = [];
            for(let n=0; n<3; n++){
                const object = {
                    id: nanoid(),
                    value: '',
                    isFocused: false,
                    isWinningCell: false,
                }
                secondaryArr.push(object);
            }
            newArray.push(secondaryArr);
        }
        return newArray;
    }

    // logic function used to determine winning conditions
    React.useEffect(() => {
        const rowSequenceIndex      = checkRowsForWin(grid);
        const columnSequenceIndex   = checkColumnsForWin(grid);
        const diagonalSequenceIndex = checkDiagonalsForWin(grid);
        const isGridFull            = checkForFullGrid(grid);
        let winningPlayer = '';

        if(rowSequenceIndex !== undefined){
            winningPlayer = grid[rowSequenceIndex][0].value;
            endGame(winningPlayer, 'row', rowSequenceIndex);
        }else if(columnSequenceIndex !== undefined){
            winningPlayer = grid[0][columnSequenceIndex].value;
            endGame(winningPlayer, 'column', columnSequenceIndex);
        }else if(diagonalSequenceIndex !== undefined){
            winningPlayer = grid[diagonalSequenceIndex][0].value;
            endGame(winningPlayer, 'diagonal', diagonalSequenceIndex);
        }else if(isGridFull){
            endGame('', 'draw', 0);
        }

    },[grid])
    
    // function to deal with a win in the game
    function endGame(winningPlayer, winCondition, indexStart){

        // update game state to reflect the winner
        setGame(prevGame => {
            return winningPlayer === 'X' ? 
            {...prevGame, isPlayer01Win: true, isWon: true, previousWinner: 'X'}: 
            winningPlayer === 'O' ? 
            {...prevGame, isPlayer01Win: false, isWon: true, previousWinner: 'O'}: {...prevGame, isPlayer01Win: false, isWon: true, previousWinner: 'draw'};
        });

        // update grid isWinningCell so it displays the right color in cell
        switch(winCondition){
            case 'row':
                grid[indexStart][0].isWinningCell = true;
                grid[indexStart][1].isWinningCell = true;
                grid[indexStart][2].isWinningCell = true;
                break;
            case 'column':
                grid[0][indexStart].isWinningCell = true;
                grid[1][indexStart].isWinningCell = true;
                grid[2][indexStart].isWinningCell = true;
                break;
            case 'diagonal':
                if(indexStart === 0){
                    grid[0][0].isWinningCell = true;
                    grid[1][1].isWinningCell = true;
                    grid[2][2].isWinningCell = true;
                }else{
                    grid[2][0].isWinningCell = true;
                    grid[1][1].isWinningCell = true;
                    grid[0][2].isWinningCell = true;
                }
                
                break;
            default:
                break;
        }

        // update player score
        setGame(prevGame => {
            const playerOneWin = prevGame.player01WinCount;
            const playerTwoWin = prevGame.player02WinCount;

            return (
                winningPlayer === 'X' ? {...prevGame, player01WinCount: (playerOneWin + 1)} 
                : winningPlayer === 'O' ? {...prevGame, player02WinCount: (playerTwoWin + 1)}
                : {...prevGame}
            )
        })

    }

    function newGame(){

        setGame(prevGame => {
            return{
                ...prevGame,
                isWon: false,
            }
        })

        setGrid(setupGrid())
    }

    // listener function that handles every grid cell's click and sets focus to cell
    function handleClick(event, id){

        if(game.isWon) return;

        let player01Turn = false;

        setGrid(prevGrid => {
            return prevGrid.map(gridElem => {
                return gridElem.map(cell => {
                    // player one
                    if(game.isPlayer01Turn){
                        player01Turn = false;
                        return cell.id === id ? {...cell, value: 'X'} : {...cell};
                    }else{
                        player01Turn = true;
                        return cell.id === id ? {...cell, value: 'O'} : {...cell};
                    }
                })
            })
        })

        setGame(prevGame => {
            return {...prevGame, isPlayer01Turn: player01Turn}
        })
    }

    // create the TicGrid cells within the application with props
    const gridElements = grid.map(gridElem => (
        gridElem.map(elem => (
            <TicGrid 
                key         = {elem.id}
                value       = {elem.value}
                focus       = {elem.isFocused}
                winningCell = {elem.isWinningCell}
                player01Win = {game.isPlayer01Win}
                handleclick = {(event) => handleClick(event, elem.id)}
            />
        ))
    ))

    // display all JSX to screen
    return(
        <main>
            <h2 className='app-title'>React Tac Toe</h2>
            <div className="app-container">
                <div className="win-container win-left">
                    <div className="win-title">X's Win Count</div>
                    <div className="wins player-01-wins">{game.player01WinCount}</div>
                </div>
                <div className="grid-container">{gridElements}</div>
                <div className="win-container win-right">
                    <div className="win-title">O's Win Count</div>
                    <div className="wins player-02-wins">{game.player02WinCount}</div>
                </div>
            </div>
            <br />
            <br />
            <h2 className='app-message'>{game.isWon? game.isPlayer01Win ? 'X WINS!' : game.previousWinner === 'draw' ? 'DRAW' : 'O WINS!' : game.isPlayer01Turn ? `X's turn` : `O's turn`}</h2>
            {game.isWon && <button className='btn--endturn' onClick={newGame}>Start New Game</button>}
        </main>
    )
}