import React, {ChangeEvent, useState} from 'react';
import {addCardTC} from "../../../../../features/cards/cards-reducer";
import {useAppDispatch} from "../../../../hooks/hooks";
import {useFormik} from "formik";
import {BasicModal} from "../../basicModal/BasicModal";
import s from '../../packs/addPackModal/AddNewPackModal.module.css'
import {SuperInputText} from "../../../superInput/SuperInputText";
import {Button, NativeSelect, TextField} from "@mui/material";
import {InputFile} from "../../../inputFile/InputFile";
import InputLabel from "@mui/material/InputLabel";
import noImage from './../../../../../assets/images/noImage.jpg'
import {setAppErrorAC} from "../../../../../app/app-reducer";

type AddNewCardModalPropsType = {
    closeModal: () => void
    title: string
    openModal: boolean
    id: string
}
type  EditModalType = {
    question?: string
    answer?: string,


}

export const AddNewCardModal = React.memo(({title, closeModal, openModal, id}: AddNewCardModalPropsType) => {

    const dispatch = useAppDispatch()

    const [questionFormat, setQuestionFormat] = useState<'text' | 'image'>('text')
    const [questionImg, setQuestionImg] = useState(noImage)
    const [newCardAnswer, setNewCardAnswer] = useState('')
    const [isImageBroken, setIsImageBroken] = useState(false)


    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setQuestionFormat(event.target.value as 'text' | 'image');
    };


    const formik = useFormik({
        initialValues: {
            answer: '',
            question: ''
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
        if (id && (questionFormat === 'text')) {
            dispatch(addCardTC({
                cardsPack_id: id,
                question: formik.values.question,
                answer: formik.values.answer
            }))
        }

        if (id && (questionFormat === 'image')) {
            dispatch(addCardTC({
                cardsPack_id: id, question:questionImg, answer: newCardAnswer
            }))

        }

        setNewCardAnswer('');
        setQuestionImg(noImage)
        closeModal()
        formik.resetForm()
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    return (
        <BasicModal title={title} openModal={openModal} closeHandler={closeModal}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Choose question format
                </InputLabel>
                <NativeSelect
                    defaultValue={questionFormat}
                    onChange={handleChange}
                >
                    <option value={'text'}>Text</option>
                    <option value={'image'}>Picture</option>
                </NativeSelect>
                {questionFormat === 'text' &&
                    <>
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
                    </>}
            </form>

                {questionFormat === 'image' &&
                    <>
                    <div className={s.previewTitle}>
                        Question image preview
                    </div>
                    <div className={s.frame}>
                        <img
                            src={isImageBroken ? noImage : questionImg}
                            className={s.image}
                            onError={errorHandler}
                            alt="img"
                        />
                    </div>
                        <InputFile uploadImage={(image: string) => setQuestionImg(image)}>
                            <Button variant="text" component="span" className={s.uploadButton}>
                                📷 Change cover
                            </Button>
                        </InputFile>
                        <TextField id="standard-basic"
                                   fullWidth
                                   label="Enter Answer"
                                   variant="standard"
                                   value={newCardAnswer}
                                   onChange={(e) => setNewCardAnswer(e.currentTarget.value)}
                        />
                    </>
                    }
                    <div className={s.button_wrapper}>
                        <button onClick={closeModal} className={s.button_cancel}>Cancel</button>
                        <button className={s.button_save}
                                onClick={saveHandler}>Save
                        </button>
                    </div>

                    </BasicModal>
                    )
                })