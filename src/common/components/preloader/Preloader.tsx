import {Box, CircularProgress} from "@mui/material";

export const Preloader = () => {
    return (
        <Box sx={{textAlign: 'center',position: 'fixed', top: '45%',width: '100%', height: '100vh'}}>
            <CircularProgress />
        </Box>
    );
};