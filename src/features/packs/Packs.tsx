import {Button, IconButton, Slider, Table} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {Search} from "@mui/icons-material";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {Preloader} from "../../common/components/preloader/Preloader";
import s from './Packs.module.css'

export const Packs = () => {

    const dispatch = useAppDispatch()

    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const status = useAppSelector(state => state.app.status)

    return (
        <div className={s.packs_wrapper}>
            <div className={s.header}>
                <div className={s.title}>
                    Packs List
                </div>
                <Button variant={'contained'}>Add
                    new pack</Button>
            </div>
            <div className={s.settings}>
                <div className={s.search}>
                    <div>Search</div>
                    <div className={s.search_components}>
                        <Search/>
                    </div>
                </div>
                <div>
                    <div>
                        Show packs cards
                    </div>
                    <Button variant={'contained'}>My</Button>
                    <Button>All</Button>
                </div>
                <div className={s.slider_container}>
                    <div>
                        Number of cards
                    </div>
                    <div className={s.rangeSlider}>
                        <div className={s.minMaxValue}>{min}</div>
                        <Slider/>
                        <div className={s.minMaxValue}>{max}</div>
                    </div>
                </div>
                <div className={s.wrapper_filter}>
                    <IconButton>
                        <FilterListOffIcon/>
                    </IconButton>
                </div>
            </div>
            {status === 'loading' && <Preloader/>}
            <div className={s.table}>
                <Table/>
            </div>
        </div>
    );
};