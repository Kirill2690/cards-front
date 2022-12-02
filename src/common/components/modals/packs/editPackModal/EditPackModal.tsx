import React from 'react';
import {useAppDispatch} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import { changePackTC} from "../../../../../features/packs/packs-reducer";
import s from "../addPackModal/AddNewPackModal.module.css";
import {SuperInputText} from "../../../superInput/SuperInputText";
import {BasicModal} from "../../basicModal/BasicModal";
import {useNavigate} from "react-router-dom";

type EditPackModalPropsType = {
    closeModal: () => void
    packId: string
    packName: string
    title:string
    openModal:boolean,


}
type FormikErrorsType = {
    name?: string
}

export const EditPackModal = ({packName,packId,title,closeModal,openModal}: EditPackModalPropsType) => {

    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            name: packName,
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.name) {
                errors.name = 'Name is required'
            } else if (values.name.length <= 1) {
                errors.name = 'Name should be more then 1 symbols'
            }
            if (values.name.length > 40) {
                errors.name = 'your pack name is too long'
            }
                return errors

        },
        onSubmit: values => {

        }
    })

    const { isValid } = { ...formik };

    const saveHandler=()=>{
        const updatePackData = {_id:packId, name: formik.values.name}
        dispatch(changePackTC(updatePackData))
        formik.resetForm()
        closeModal()


    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.input_wrapper}>
                    <SuperInputText
                        placeholder={'New pack'}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name &&
                        <div className={s.error} style={{color:'red'}}>{formik.errors.name}</div>}
                </div>
                <div className={s.button_wrapper}>
                    <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                    <button className={s.button_save} disabled={!isValid} onClick={saveHandler}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}