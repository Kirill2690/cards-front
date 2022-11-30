import React from 'react';
import {Button, Input} from "@mui/material";
import {addCardTC} from "../../../../features/cards/cards-reducer";
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";

type AddNewCardModalPropsType = {
    closeModal: () => void

}
type  EditModalType = {
    id?: string
    question?: string
    answer?: string

}

export const AddNewCardModal = (props: AddNewCardModalPropsType & EditModalType) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            cardsPack_id: props.id + '',
            answer: '',
            question: '',
        },
        onSubmit: values => {
            dispatch(addCardTC(values))
            formik.resetForm()
            props.closeModal()
        },
        validate: (values) => {
            const errors: EditModalType = {}
            if (!values.question) {
                errors.question = 'Please enter question'
            }
            if (values.question && values.question.length > 40) {
                errors.question = 'Your card question is too long'
            }
            if (!values.answer) {
                errors.answer = 'Please enter answer'
            }
            if (values.answer && values.answer.length > 40) {
                errors.answer = 'Your card answer is too long'
            }
            return errors
        },
    })

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <Input
                            placeholder={'Question'}
                            {...formik.getFieldProps('question')}
                        />
                        <div>
                            {formik.touched.answer && formik.errors.answer && formik.errors.answer}
                        </div>
                    </div>

                    <div>
                        <Input
                            placeholder={'Answer'}
                            {...formik.getFieldProps('answer')}
                        />
                        <div>
                            {formik.touched.answer && formik.errors.answer && formik.errors.answer}
                        </div>
                    </div>

                    <div>
                        <Button variant='outlined' onClick={props.closeModal}>Cancel</Button>
                        <Button variant='contained' type="submit">Save</Button>
                    </div>
                </form>

            </div>
        </>
    )
}