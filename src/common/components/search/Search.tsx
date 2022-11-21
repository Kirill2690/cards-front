import React from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from "../../hooks/hooks";


export const Search = (props:SearchPropsType) => {

    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            props.handleChangeText (event.target.value);
        };

    return (
        <div>
            <FormControl sx={{m: 1, height:36}} variant="outlined" size="small">
                <InputLabel htmlFor="search"> Provide your text </InputLabel>
                <OutlinedInput
                    id="search"
                    type='text'
                    value={props.value}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                                <SearchIcon/>
                        </InputAdornment>
                    }
                    label="Provide your text"
                />
            </FormControl>
        </div>
    );
};

type SearchPropsType = {
    handleChangeText: (value: string) => void
    value:string
}
