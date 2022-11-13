import React, {useState} from 'react';
import s from './Test.module.css'
import SuperSelect from "../../common/components/superSelect/SuperSelect";
import {SuperRadio} from "../../common/components/superRadio/SuperRadio";
import {SuperButton} from "../../common/components/superButton/SuperButton";
import SuperCheckbox from "../../common/components/superCheckbox/SuperCheckbox";
import {SuperEditableSpan} from "../../common/components/superEditableSpan/SuperEditableSpan";
import {SuperInputText} from "../../common/components/superInput/SuperInputText";
import {CheckEmail} from "../auth/password/checkEmail/CheckEmail";

export const Test = () => {
    /*const [inputText, setInputText] = useState<string>('')
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
*/
    return <CheckEmail/>
       /* <div className={s.column}>
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
                {checkboxStatus?'done':'not done'}
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
*/

        /*</div>*/

};