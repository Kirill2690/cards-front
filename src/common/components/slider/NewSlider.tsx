import React, {SyntheticEvent} from 'react';
import Slider from '@mui/material/Slider';
import s from './NewSlider.module.css'
import {useAppSelector} from "../../hooks/hooks";

type NewSliderPropsType = {
    sliderValue: number[]
    setSliderValue: (valueSlider: number[]) => void
    handleChangeSlider: (newValue: number[]) => void
}

export const NewSlider = React.memo((props: NewSliderPropsType) => {

    const minCards = useAppSelector(state => state.packs.minCardsCount)
    const maxCards = useAppSelector(state => state.packs.maxCardsCount)

    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setSliderValue(newValue as number[]);
    };
    const handleChangeCommitted = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        props.handleChangeSlider(newValue)

    }
    const dis = minCards === maxCards

    return (
        <div className={s.wrapper}>
            <div className={s.minMaxBox}>{props.sliderValue[0]}</div>
            <div className={s.slider}><Slider size={'small'}
                                              min={minCards}
                                              max={maxCards}
                                              getAriaLabel={() => 'Minimum distance'}
                                              value={props.sliderValue}
                                              onChangeCommitted={handleChangeCommitted}
                                              onChange={handleChange}
                                              valueLabelDisplay="auto" disabled={dis}

            /></div>
            <div className={s.minMaxBox}>{props.sliderValue[1]}</div>
        </div>);
})

