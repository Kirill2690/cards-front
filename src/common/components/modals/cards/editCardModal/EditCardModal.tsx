import React from "react";
import {useAppDispatch} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import {updateCardsTC} from "../../../../../features/cards/cards-reducer";
import s from "../../packs/addPackModal/AddNewPackModal.module.css";
import {SuperInputText} from "../../../superInput/SuperInputText";
import {BasicModal} from "../../basicModal/BasicModal";

type PropsType={
    closeModal:()=>void
    cardId:string
    answer:string
    question: string
    title:string
    openModal: boolean


}
type EditModalType = {
    answer?: string
    question?: string
}
export const EditCardModal = ({closeModal,cardId,answer,question,title,openModal}: PropsType) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            answer:answer,
            question:question

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

        },
    })

    const saveHandler = () => {
        dispatch(updateCardsTC({_id:cardId,question:formik.values.question,answer:formik.values.answer}))
        closeModal()
        formik.resetForm()
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <div className={s.input_wrapper}>
                    <SuperInputText
                        placeholder={'Question'}
                        {...formik.getFieldProps('question')}
                    />
                    {formik.touched.answer && formik.errors.answer &&
                        <div className={s.error} style={{color:'red'}}>{formik.errors.answer}</div>}
                </div>
                <div className={s.input_wrapper}>
                    <SuperInputText
                        placeholder={'Answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    {formik.touched.answer && formik.errors.answer &&
                        <div className={s.error} style={{color: 'red'}}>{formik.errors.answer}</div>}
                </div>

                <div className={s.button_wrapper}>
                    <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                    <button className={s.button_save} onClick={saveHandler}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
}