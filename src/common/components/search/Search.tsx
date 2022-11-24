/*
import React from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../hooks/debounce";


export const Search = (props: SearchPropsType) => {

    const [text, setText] = React.useState<string>("");

    const debouncedText = useDebounce(text);
    props.handleChangeSearch(debouncedText)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText (event.target.value);
    };

    return (
        <div>
            <FormControl sx={{m: 1, height: 36}} variant="outlined" size="small">
                <InputLabel htmlFor="search"> Provide your text </InputLabel>
                <OutlinedInput
                    id="search"
                    type='text'
                    value={text}
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
    handleChangeSearch: (value:string) => void
}
*/

import React, {useEffect} from 'react';
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../hooks/debounce";

type NewSearchPropsType = {
    handleChangeSearch: (value: string) => void
    searchText: string
    setSearchText: (value: string) => void
}
export const Search = (props: NewSearchPropsType) => {

    const debouncedText = useDebounce(props.searchText);
    useEffect(() => {
        props.handleChangeSearch(debouncedText)
    }, [debouncedText])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchText(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{m: 1, height: 36}} variant="outlined" size="small">
                <InputLabel htmlFor="search"> Provide
            your text </InputLabel>
                <OutlinedInput id="search" type='text'
                               value={props.searchText}
                               onChange={handleChange}
                               endAdornment={<InputAdornment position="end">
                                   <SearchIcon/></InputAdornment>}
                                                   label="Provide your text"/>
                                   </FormControl>
                </div>)
}

