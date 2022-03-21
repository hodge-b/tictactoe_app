import React from 'react';
import {nanoid} from 'nanoid';
import TicGrid from './components/TicGrid';
import './style.css'

export default function App(){

    const [grid, setGrid] = React.useState(setupGrid());
    const [players, setPlayers] = React.useState();

    function setupGrid(){
        const newArray = [];
        for(let i=0; i<3; i++){
            const secondaryArr = [];
            for(let n=0; n<3; n++){
                const object = {
                    id: nanoid(),
                    value: '',
                    isFocused: false,
                }
                secondaryArr.push(object);
            }
            newArray.push(secondaryArr);
        }
        return newArray;
    }


    const gridElements = grid.map(gridElem => (
        gridElem.map(elem => (
            <TicGrid 
                key = {elem.id}
                value = {elem.value}
            />
        ))
    ))

    return(
        <main>
            <h2 className='app-title'>React Tic Tac Toe</h2>
            <div className="app-container">
                <div className="win-container">
                    <div className="win-title">Player 1 Wins</div>
                    <div className="wins player-01-wins">0</div>
                </div>
                <div className="grid-container">{gridElements}</div>
                <div className="win-container">
                    <div className="win-title">Player 2 Wins</div>
                    <div className="wins player-02-wins">0</div>
                </div>
            </div>
            <button className='btn--endturn'>End Turn</button>
        </main>
    )
}