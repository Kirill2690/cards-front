
import {ChangeEvent} from "react";
import s from './SearchInput.module.css'


type SearchPropsType = {
    valueSearch: string
    searchValueText: (valueSearch: string) => void
}

export const SearchInput = ({searchValueText, valueSearch}: SearchPropsType) => {


    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        searchValueText(e.currentTarget.value)
    }

    return (
        <div className={s.inputBlock}>
            <label className={s.title}>Search</label>
            <input
                placeholder={'Provide your text'}
                className={s.input}
                value={valueSearch}
                onChange={searchHandler}
                type={'search'}
            />
        </div>
    )
}






