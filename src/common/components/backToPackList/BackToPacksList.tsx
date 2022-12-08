import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import s from './BackToPackList.module.css'


export const BackToPackList = () => {

    const navigate = useNavigate()

    const onClickBackHandler = () => {
        navigate('/packs')
    }
    return (
        <div onClick={onClickBackHandler} className={s.arrowBack}>
            <ArrowBackIcon/>
            <div className={s.title}>Back to Packs List</div>
        </div>
    );
};
