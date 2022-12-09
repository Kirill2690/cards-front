import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import {updateCardsTC} from "../../../../../features/cards/cards-reducer";
import s from "../../packs/addPackModal/AddNewPackModal.module.css";
import {SuperInputText} from "../../../superInput/SuperInputText";
import {BasicModal} from "../../basicModal/BasicModal";
import noImage from './../../../../../assets/images/noImage.jpg'
import {InputFile} from "../../../inputFile/InputFile";
import {Button} from "@mui/material";
import {setAppErrorAC} from "../../../../../app/app-reducer";

type PropsType = {
    closeModal: () => void
    cardId: string
    answer: string
    question: string
    title: string
    openModal: boolean


}
type EditModalType = {
    answer?: string
    question?: string
}
export const EditCardModal = React.memo(({closeModal, cardId, answer, question, title, openModal}: PropsType) => {
    const dispatch = useAppDispatch()

    let questionFormat: string;
    if (question.slice(0, 10) === 'data:image') {
        questionFormat = 'image'
    } else {
        questionFormat = 'text'
    }


    const [newCardAnswer, setNewCardAnswer] = useState(answer);
    const [questionImg, setQuestionImg] = useState(question.slice(0, 10) === 'data:image' ? question : noImage)
    const [isImageBroken, setIsImageBroken] = useState(false)

    const formik = useFormik({
        initialValues: {
            answer: answer,
            question: question

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
        onSubmit: values => {

        },
    })


    const saveHandler = () => {

        if (cardId && (questionFormat === 'text')) {
            dispatch(updateCardsTC({_id: cardId, question: formik.values.question, answer: formik.values.answer}))
        }
        if (cardId && (questionFormat === 'image')) {
            dispatch(updateCardsTC({_id: cardId, question: questionImg, answer: newCardAnswer}))
        }
        closeModal()
        formik.resetForm()
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    useEffect(() => {
        setNewCardAnswer(answer)
        setQuestionImg(question.slice(0, 10) === 'data:image' ? question : noImage)
    }, [question, answer, setQuestionImg])

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                {(questionFormat === 'text') &&
                    <div>
                        <div className={s.input_wrapper}>
                            <SuperInputText
                                placeholder={'Question'}
                                {...formik.getFieldProps('question')}
                            />
                            {formik.touched.answer && formik.errors.answer &&
                                <div className={s.error} style={{color: 'red'}}>{formik.errors.answer}</div>}
                        </div>
                        <div className={s.input_wrapper}>
                            <SuperInputText
                                placeholder={'Answer'}
                                {...formik.getFieldProps('answer')}
                            />
                            {formik.touched.answer && formik.errors.answer &&
                                <div className={s.error} style={{color: 'red'}}>{formik.errors.answer}</div>}
                        </div>
                    </div>}
                {(questionFormat === 'image') &&
                    <div>
                        <p className={s.title_question}>Question image preview:</p>
                        <img
                            src={isImageBroken ? noImage : questionImg}
                            className={s.image}
                            onError={errorHandler}
                            alt="img"
                        />
                        <InputFile uploadImage={(image: string) => setQuestionImg(image)}
                                   children={<Button variant="text" component="span" className={s.uploadButton}>
                                       ✍ Change cover
                                   </Button>}/>
                        <SuperInputText id="standard-basic"
                                        style={{width: '347px'}}
                                        placeholder="✍ Enter Answer"
                                        value={newCardAnswer}
                                        onChange={(e) => setNewCardAnswer(e.currentTarget.value)}
                        />
                    </div>}


                <div className={s.button_wrapper}>
                    <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                    <button className={s.button_save} onClick={saveHandler}>Save</button>
                </div>
            </form>
        </BasicModal>
    )
})