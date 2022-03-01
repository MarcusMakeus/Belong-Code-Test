import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {React, useState} from "react";


const CellItem = () => {
    const [ cellActive, setCellState ] = useState(false);
    const handleCellState = () => {
        setCellState(!cellActive);
    };

    return (
            <Box onClick={handleCellState}  className={cellActive ? 'border bg-green-600 border-green-600 w-5 h-5' : 'border border-green-600  w-5 h-5'}/>
    )
}

export default CellItem