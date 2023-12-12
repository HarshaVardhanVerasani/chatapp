import { Box, Typography } from '@mui/material';
import { style } from './ErrorPageStyle';

const ErrorPage = () => {
    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "black" }}>
            <Typography sx={{ ...style.txt }}>404 Not Found</Typography>
        </Box>
    )
}

export default ErrorPage
