import React, {useEffect} from 'react';
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../../common/hooks/debounce";
import s from './SearchInput.module.css'


type SearchInputPropsType = {
    handleChangeSearch: (value: string) => void
    searchText: string
    setSearchText: (value: string) => void

}

export const SearchInput = React.memo((props: SearchInputPropsType) => {

    const debouncedText = useDebounce(props.searchText);

    useEffect(() => {
        props.handleChangeSearch(debouncedText)
    }, [debouncedText])

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchText(event.target.value);
    };

    return (
        <div>
            <div className={s.title}>Search</div>
            <div style={{marginBottom: -5}}>
                <FormControl sx={{m: 1, height: 36}} variant="outlined" size="small">
                    <InputLabel htmlFor="search"> Provide your text</InputLabel>
                    <OutlinedInput id="search" type='text'
                                   value={props.searchText}
                                   onChange={handlerChange}
                                   endAdornment={
                                       <InputAdornment position="end">
                                           <SearchIcon/>
                                       </InputAdornment>
                                   }
                                   label="Provide your text"
                    />
                </FormControl>
            </div>
        </div>)
})


