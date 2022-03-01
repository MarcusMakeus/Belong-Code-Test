import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CellGrid from "../../components/CellGrid";

const CellPage = () => {
    return (
        <Container maxWidth="sm" className={'h-screen p-4'}>
            <Box className={'bg-green-200 h-full flex justify-center align-middle items-center'}>
                <CellGrid />
            </Box>
        </Container>
    )
}

export default CellPage