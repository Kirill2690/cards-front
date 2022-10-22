import React, {useState} from 'react';
import s from './Test.module.css'
import SuperSelect from "../../k1-main/m1-ui/common/c5-superSelect/SuperSelect";
import {SuperRadio} from "../../k1-main/m1-ui/common/c6-superRadio/SuperRadio";
import {SuperButton} from "../../k1-main/m1-ui/common/c2-superButton/SuperButton";
import SuperCheckbox from "../../k1-main/m1-ui/common/c3-superCheckbox/SuperCheckbox";
import {SuperEditableSpan} from "../../k1-main/m1-ui/common/c4-superEditableSpan/SuperEditableSpan";
import {SuperInputText} from "../../k1-main/m1-ui/common/c1-superInput/SuperInputText";

export const Test = () => {
    const [inputText, setInputText] = useState<string>('')
    const error = inputText ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('type something...')
        } else {
            alert(inputText)
        }
    }

    const [checkboxStatus, setCheckboxStatus] = useState<boolean>(false)
    const [spanValue, setSpanValue] = useState<string>('')

    const arr = ['1', '2', '3', '4', '5']
    const [value, onChangeOption] = useState(arr[2])

    return (
        <div className={s.column}>
            <SuperInputText
                value={inputText}
                onChangeText={setInputText}
                onEnter={showAlert}
                error={error}/>
            <div className={s.row}>
                <SuperButton onClick={showAlert}>
                    default
                </SuperButton>

                <SuperButton red>
                    delete
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>
            </div>
            <SuperCheckbox
                checked={checkboxStatus}
                onChangeChecked={setCheckboxStatus}>
                some text
            </SuperCheckbox>
            <SuperEditableSpan
                value={spanValue}
                onChangeText={setSpanValue}
                spanProps={{children: spanValue ? undefined : 'enter text...'}}
            />
            <SuperSelect
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
            />
            <div className={s.row}><SuperRadio
                name={'radio'}
                options={arr}
                value={value}
                onChangeOption={onChangeOption}
            /></div>


        </div>
    );
};