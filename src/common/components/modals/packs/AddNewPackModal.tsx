import React from 'react';
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {addPackTC} from "../../../../features/packs/packs-reducer";
import {Button, Input} from "@mui/material";

type AddNewPackModalPropsType = {
    closeModal: () => void
}
type  FormikErrorsType = {
    packName?: string
}

export const AddNewPackModal = (props: AddNewPackModalPropsType) => {
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
            dispatch(addPackTC(values.packName))
            formik.resetForm()
            props.closeModal()
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <Input
                        placeholder={'Name pack'}
                        {...formik.getFieldProps('packName')}
                    />
                    <div>
                        {formik.touched.packName && formik.errors.packName && formik.errors.packName}
                    </div>
                    <div>
                        <Button variant='outlined' onClick={props.closeModal}>Cancel</Button>
                        <Button variant='contained' type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </>
    )
}