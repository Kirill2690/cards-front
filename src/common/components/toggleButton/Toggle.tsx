import React from 'react';
import {ToggleButtonGroup} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';


export const Toggle = (props:TogglePropsType) => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        props.handleToggle(newAlignment)
    };

    return (
        <ToggleButtonGroup
            size="small"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton style={{width: 100}} value="my">My</ToggleButton>
            <ToggleButton style={{width: 100}} value="all">All</ToggleButton>
        </ToggleButtonGroup>
    );
};

type TogglePropsType = {
    handleToggle:(value: string) => void
}