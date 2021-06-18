import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VLdImages } from './validation';
import { formState } from "./formImages"
import { RouteComponentProps, withRouter } from "react-router-dom";
import apiImages from '../api/apiImages';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../redux/infoUser/actionUser';
import { checkRole } from './methodCommon';

interface FormaddImage extends RouteComponentProps {
    renderAgain: any
}

const FormaddImage: React.FC<FormaddImage> = (props) => {
    const refForm = useRef(null)
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const { watch, register, handleSubmit, formState: { errors, isValidating }, reset } = useForm<formState>({
        mode: "onSubmit",
        defaultValues: { image: "" },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLdImages)
    })
    const submitForm = async (data: formState) => {
        // console.log(refForm.current)
        let { dataUser: { user: { role }, token } } = stateUser as any;

        if (role >= checkRole.partner) {
            let { dataProduct: { _id: idProduct } } = props.location.state as any;
            let configForm = new FormData(refForm.current as any);
            configForm.set("idProduct", idProduct)

            let saveImage = await apiImages.postOne(configForm, token)
            props.renderAgain()
            reset({ image: "" })
        } else {
            alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
        }


    }
    return (
        <>
            <form ref={refForm}>
                <table className="table" >
                    <tr>
                        <td scope="row">
                            <input type="text" className="form-control" {...register("title")} id="exampleFormControlInput1" />
                            <p>{errors.title && errors.title.message}</p>
                        </td>
                        <td> <input type="file" className="form-control" {...register("image")} id="exampleFormControlInput1" />
                            <p>{errors.image && errors.image.message}</p>
                        </td>

                        <td> </td>
                        <td> </td>
                    </tr>
                </table>
            </form>
            <button type="submit" className="btn btn-primary" style={{}}
                onClick={handleSubmit(submitForm)} >add Image</button>
        </>
    )
}

export default withRouter(FormaddImage)
