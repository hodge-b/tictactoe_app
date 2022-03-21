import React from 'react';

export default function TicGrid(props){
    return(
        <div className="grid-cell" key={props.id}>{props.value}</div>
    )
}