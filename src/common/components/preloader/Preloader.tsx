import {LinearProgress} from "@mui/material";

export const Preloader = () => {
    return (
        <div
            style={{position: 'fixed', top: '45%', textAlign: 'center', width: '100%', height: '100vh'}}>
            <LinearProgress color={'inherit'}/>
        </div>
    );
};