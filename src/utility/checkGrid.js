import React from 'react';


export function checkRowsForWin(grid){
    
    const targetValue = copyGrid(grid);

    if(targetValue[0][0].value !== ''){
        if(targetValue[0][0].value === grid[0][1].value &&
            targetValue[0][1].value === grid[0][2].value){
                return 0; // return the row index
            }
    }
    if(targetValue[1][0].value !== ''){
        if(targetValue[1][0].value === grid[1][1].value &&
            targetValue[1][1].value === grid[1][2].value){
                return 1; // return the row index
            }
    }
    if(targetValue[2][0].value !== ''){
        if(targetValue[2][0].value === grid[2][1].value &&
            targetValue[2][1].value === grid[2][2].value){
                return 2; // return the row index
            }
    }
    return undefined;
}

export function checkColumnsForWin(grid){

    const targetValue = copyGrid(grid);

    if(targetValue[0][0].value !== ''){
        if(targetValue[0][0].value === grid[1][0].value &&
            targetValue[1][0].value === grid[2][0].value){
                return 0;
            }
    }
    if(targetValue[0][1].value !== ''){
        if(targetValue[0][1].value === grid[1][1].value &&
            targetValue[1][1].value === grid[2][1].value){
                return 1;
            }
    }
    if(targetValue[0][2].value !== ''){
        if(targetValue[0][2].value === grid[1][2].value &&
            targetValue[1][2].value === grid[2][2].value){
                return 2;
            }
    }
    return undefined;
}

export function checkDiagonalsForWin(grid){

    const targetValue = copyGrid(grid);

    if(targetValue[0][0].value !== ''){
        if(targetValue[0][0].value === grid[1][1].value &&
            targetValue[1][1].value === grid[2][2].value){
                return 0;
            }
    }
    if(targetValue[2][0].value !== ''){
        if(targetValue[2][0].value === grid[1][1].value &&
            targetValue[1][1].value === grid[0][2].value){
                return 2;
        }
    }
    return undefined;
}

export function checkForFullGrid(grid){
    
    let count = 0;
    grid.map(gridElem => {
        gridElem.map(cell => {
            if(cell.value !== ''){
                count++;
            }
        })
    })

    if(count >= 9){
        return true;
    }else{
        return false;
    }
}

function copyGrid(grid){
    const newArray = [];
    grid.forEach(item => {
        const secondaryArr = [];
        item.forEach(elem => {
            secondaryArr.push(elem);
        })
        newArray.push(secondaryArr);
    })
    return newArray;
}