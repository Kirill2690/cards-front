import React from 'react';
import {Button, Input} from "@mui/material";
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import { changePackTC} from "../../../../features/packs/packs-reducer";

type EditPackModalPropsType = {
    closeModal: () => void
    packId: string
    packName: string

}
type FormikErrorsType = {
    name?: string
}

export const EditPackModal = (props: EditPackModalPropsType) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: props.packName
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.name) {
                errors.name = 'required'
            }
            if (values.name.length > 40) {
                errors.name = 'your pack name is too long'
            }
          /*  if (values.newPackName === props.packName) {
                errors.newPackName = 'your new pack name is the same'
                return errors
            }*/
        },
        onSubmit: values => {
            const updatePackData = {_id: props.packId, name: values.name}
            dispatch(changePackTC(updatePackData))
            formik.resetForm()
            props.closeModal()
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div >
                    <Input
                        placeholder={'Name pack'}
                        {...formik.getFieldProps(props.packName)}
                    />
                    <div>
                        {formik.touched.name && formik.errors.name && formik.errors.name}
                    </div>
                </div>
                <div>
                    <Button variant='outlined' onClick={props.closeModal}>Cancel</Button>
                    <Button variant='contained' type='submit'>Save</Button>
                </div>
            </form>
        </>
    )
}