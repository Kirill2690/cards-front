import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {NavLink} from "react-router-dom";
import s from './BackToPackList.module.css'


export const BackToPackList = () => {
    return (
        <div className={s.arrowBack}>
            <NavLink to={'/packs'}>
                <KeyboardBackspaceIcon className={s.icon}/>
                <span> Back to Packs List</span>
            </NavLink>
        </div>
    );
};
