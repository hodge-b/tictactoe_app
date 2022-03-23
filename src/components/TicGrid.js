import React from 'react';

export default function TicGrid(props){

    const styles = {
        boxShadow: props.winningCell ? props.player01Win ? 'inset 0px 0px 5px blue' : 'inset 0px 0px 5px red' : props.focus ? 'inset 0px 0px 5px green' : '',
        color: props.winningCell ? props.player01Win ? 'blue' : 'red' : 'black'
    }

    return(
        <div 
            className ="grid-cell"
            tabIndex  = '0'
            key       ={props.id} style={styles} 
            onClick   ={props.handleclick}
            onKeyDown = {props.handlekeys}
            >{props.value}</div>
    )
}