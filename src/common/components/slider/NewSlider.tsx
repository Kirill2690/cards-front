import React, {SyntheticEvent} from 'react';
import Slider from '@mui/material/Slider';
import s from './NewSlider.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setQueryParamsAC} from "../../../features/packs/packs-reducer";


const minDistance = 1;

export const NewSlider = () => {

    const minCards = useAppSelector(state => state.packs.minCardsCount)
    const maxCards = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([minCards, maxCards]);

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        activeThumb === 0
            ?
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
            :
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    };

    const handleChangeCommitted = (event: Event | SyntheticEvent<Element, Event>,
                                   newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        dispatch(setQueryParamsAC({min: newValue[0].toString(), max: newValue[1].toString()}))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.minMaxBox}>{value[0]}</div>
            <div className={s.slider}>
                <Slider
                    size={'small'}
                    min={minCards}
                    max={maxCards}
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    onChangeCommitted={handleChangeCommitted}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap
                />
            </div>
            <div className={s.minMaxBox}>{value[1]}</div>
        </div>
    );
};
