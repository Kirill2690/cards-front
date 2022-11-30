import React from "react";
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {updateCardsTC} from "../../../../features/cards/cards-reducer";
import {Button, Input} from "@mui/material";

type PropsType={
    closeModal:()=>void
    cardId:string
    answer:string
    question: string
}
type EditModalType = {
    answer?: string
    question?: string
    _id?: string

}
export const EditCardModal = (props: PropsType) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            _id: props.cardId,
            answer:props.answer,
            question: props.question

        },
        validate: (values) => {
            const errors:EditModalType = {}
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
        onSubmit: values => {
            const updateCardData={_id:props.cardId,question:values.question,answer:values.answer}
            dispatch(updateCardsTC(updateCardData))
            props.closeModal && props.closeModal()
        },
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <Input
                        placeholder={'Question'}
                        {...formik.getFieldProps('question')}
                    />
                    <div >
                        {formik.touched.question && formik.errors.question && formik.errors.question}
                    </div>
                </div>
                <div >
                    <Input
                        placeholder={'Answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    <div >
                        {formik.touched.answer && formik.errors.answer && formik.errors.answer}
                    </div>
                </div>
                <div>
                    <Button onClick={props.closeModal} type='button'>Cancel</Button>
                    <Button type='submit'>Save</Button>
                </div>
            </form>
        </>
    )
}