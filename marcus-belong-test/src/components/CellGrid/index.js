import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import Box from '@mui/material/Box';
import CellItem from "../CellItem";



const numRows = 20;
const numCols = 20;
const createEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
};

const CellGrid = () => {
    const [grid, setGrid] = useState(() => {
        return createEmptyGrid();
    });

    let gridTemplateColumns = `repeat(auto-fit, minmax(20px, 1fr))`;
    return (
        <Box className={'p-3 w-full'}>
            <div style={{display: 'grid', columnGap: '5px', rowGap: '5px', gridTemplateColumns: `${gridTemplateColumns}`}} >
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                    <CellItem  key={`${i}-${k}`}  onClick={() => {
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                        });
                        setGrid(newGrid);
                    }}/>
                    ))
                )}
            </div>
        </Box>
    )
}

export default CellGrid