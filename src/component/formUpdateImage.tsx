import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VLdImagesUpdate } from './validation';
import { formState } from "./formImages"
import { RouteComponentProps, withRouter } from "react-router-dom";
import apiImages from '../api/apiImages';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../redux/infoUser/actionUser';
import { checkRole } from './methodCommon';

interface FormUpdateImage extends RouteComponentProps {
    renderAgain: any,
    dataImage: any,
    deleteEdit: any
}

const FormUpdateImage: React.FC<FormUpdateImage> = (props) => {
    const refForm = useRef(null)
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const { watch, register, handleSubmit, formState: { errors, isValidating }, reset } = useForm<formState>({
        mode: "onSubmit",
        defaultValues: { ...props.dataImage, image: "" },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLdImagesUpdate)
    })

    const submitForm = async (data: formState) => {

        let { dataUser: { user: { role }, token } } = stateUser as any;
        if (role >= checkRole.partner) {
            let { dataProduct: { _id: idProduct } } = props.location.state as any;
            let configForm = new FormData(refForm.current as any);

            configForm.set("idProduct", idProduct)
            let saveImage = await apiImages.putOne(configForm, props.dataImage._id, token)
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
                onClick={handleSubmit(submitForm)} >update Image</button>
            <button type="submit" className="btn btn-primary" style={{}}
                onClick={props.deleteEdit} >Hidden Update</button>
        </>
    )
}

export default withRouter(FormUpdateImage)
