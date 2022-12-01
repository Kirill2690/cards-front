import React from 'react';
import {useAppDispatch} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import {addPackTC} from "../../../../../features/packs/packs-reducer";
import {BasicModal} from "../../basicModal/BasicModal";
import s from "./AddNewPackModal.module.css";
import {SuperInputText} from "../../../superInput/SuperInputText";



type AddNewPackModalPropsType = {
    closeModal: () => void
    title:string,
    openModal:boolean

}
type  FormikErrorsType = {
    packName?: string
}

export const AddNewPackModal = ({closeModal,title,openModal}: AddNewPackModalPropsType) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            packName: ''
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (values.packName.length < 1) {
                errors.packName = 'enter pack name'
            }
            if (values.packName.length > 40) {
                errors.packName = 'your pack name is too long'
            }
            return errors
        },
        onSubmit: values => {
        }

    })

    const saveHandler = () => {
        dispatch(addPackTC(formik.values.packName))
        formik.resetForm()
        closeModal()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.input_wrapper}>
                    <SuperInputText
                        placeholder={'Name pack'}
                        {...formik.getFieldProps('packName')}
                    />
                    {formik.touched.packName && formik.errors.packName &&
                        <div className={s.error} style={{color:'red'}}>{formik.errors.packName}</div>}
                </div>
                {/*<SuperCheckbox
                checked={formik.values.isPrivate}
                {...formik.getFieldProps('isPrivate')}>
                    Private pack
                </SuperCheckbox>*/}
                <div className={s.button_wrapper}>
                    <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                    <button className={s.button_save} onClick={saveHandler} >Save</button>
                </div>
            </form>
        </BasicModal>
    )
}