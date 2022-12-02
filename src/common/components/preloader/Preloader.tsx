import loader from '../../../assets/images/loading-75.gif'
import {CircularProgress} from "@mui/material";

export const Preloader = () => {
    return (
        <div style={{position: 'fixed', top: '70%',right:'500px', textAlign: 'center', width: '10%', zIndex: 999}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress />
            </div>
        </div>
    );
};