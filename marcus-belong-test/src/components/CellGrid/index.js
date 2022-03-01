import React, { useState, useCallback, useRef } from "react";
import Box from '@mui/material/Box';
import CellItem from "../CellItem";
import produce from "immer";

const numRows = 30;
const numCols = 20;

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

const countNeighbors = (grid, x, y) => {
    return operations.reduce((acc, [i, j]) => {
        const row = (x + i + numRows) % numRows;
        const col = (y + j + numCols) % numCols;
        acc += grid[row][col];
        return acc;
    }, 0);
};

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
    const [generation, setGeneration] = useState(0);

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const generationRef = useRef(generation);
    generationRef.current = generation;

    const runSimulation = useCallback((isStep) => {
        setInterval(() => {

            if (!runningRef.current) {
                return;
            }
            if (isStep) {
                setRunning(false);
            }
            setGrid((currentGrid) =>
                produce(currentGrid, (gridCopy) => {
                    for (let i = 0; i < numRows; i++) {
                        for (let j = 0; j < numCols; j++) {
                            const count = countNeighbors(currentGrid, i, j);
                            if (currentGrid[i][j] === 1 && (count < 2 || count > 3))
                                gridCopy[i][j] = 0;
                            if (!currentGrid[i][j] && count === 3) gridCopy[i][j] = 1;
                        }
                    }
                }),
            );
            setGeneration(++generationRef.current);
        });
    }, []);
    let gridTemplateColumns = `repeat(${numCols}, 20px)`;

    return (
        <div className={'flex h-full'}>
            <Box className={'flex justify-center m-4 align-middle items-center'}>
                <button className={'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'}
                        onClick={() => {
                            setRunning(!running);
                            runSimulation(true);
                        }}
                >
                    Next Generation
                </button>
            </Box>
            <Box className={'bg-green-200 p-4  flex justify-center align-middle items-center'}>
                <div style={{display: 'grid', columnGap: '5px', rowGap: '5px', gridTemplateColumns: `${gridTemplateColumns}`}} >
                    {grid.map((rows, i) =>
                        rows.map((col, k) => (
                            <CellItem
                                key={`${i}-${k}`}
                                onClick={(e) => {
                                   const newGrid = produce(grid, gridCopy => {
                                       gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                   });
                                   setGrid(newGrid);
                                }}
                                isCellAlive={grid[i][k]}
                            />
                        ))
                    )}
                </div>
            </Box>
            <Box  className={'flex justify-center m-4 align-middle items-center'}>
                <button className={'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'}
                        onClick={() => {
                            setGrid(createEmptyGrid());
                        }}
                >
                    Reset
                </button>
            </Box>
        </div>
    )
}
export default CellGrid