import React, {SyntheticEvent} from 'react';
import Slider from '@mui/material/Slider';
import s from './NewSlider.module.css'
import {useAppSelector} from "../../hooks/hooks";

const minDistance = 1;

export const NewSlider = React.memo((props: NewSliderPropsType) => {

    const minCards = useAppSelector(state => state.packs.minCardsCount)
    const maxCards = useAppSelector(state => state.packs.maxCardsCount)

    // const handleChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
    //     if (!Array.isArray(newValue)) {
    //         return;
    //     }
    //     activeThumb === 0
    //         ?
    //         props.setSliderValue([Math.min(newValue[0], props.value[1] - minDistance), props.value[1]])
    //         :
    //         props.setSliderValue([props.value[0], Math.max(newValue[1], props.value[0] + minDistance)])
    // };
    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setSliderValue(newValue as number[]);
    };

    const handleChangeCommitted = (event: Event | SyntheticEvent<Element, Event>,
                                   newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        props.handleChangeSlider(newValue)
    }
    const dis=minCards===maxCards

    return (
        <div className={s.wrapper}>
            <div className={s.minMaxBox}>{props.value[0]}</div>
            <div className={s.slider}>
                <Slider
                    size={'small'}
                    min={minCards}
                    max={maxCards}
                    getAriaLabel={() => 'Minimum distance'}
                    value={props.value}
                    onChangeCommitted={handleChangeCommitted}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap={dis}

                />
            </div>
            <div className={s.minMaxBox}>{props.value[1]}</div>
        </div>
    );
})

type NewSliderPropsType = {
    value: number[]
    setSliderValue: (valueSlider: number[]) => void
    handleChangeSlider:(newValue:number[])=> void
}

