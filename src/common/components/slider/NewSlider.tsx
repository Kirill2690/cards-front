import React from 'react';
import Slider from '@mui/material/Slider';
import s from './NewSlider.module.css'


const minDistance = 1;

export const NewSlider = (props: NewSliderPropsType) => {
    const [value, setValue] = React.useState<number[]>([props.minValue, props.maxValue]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };
    return (
        <div className={s.wrapper}>
            <div className={s.span}>{value[0]}</div>
            <Slider
                max={props.maxValue}
                min={props.minValue}
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
            />

            <div className={s.span}>{value[1]}</div>
        </div>
    );
};

type NewSliderPropsType = {
    minValue: number,
    maxValue: number
}