
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import ApiUser from '../../api/ApiUser';
import { VLDChangePassword, VLdImages } from '../../component/validation';
import { formmatTypeAction } from '../../redux/infoUser/actionUser';

interface ManagerAcccountChangePass extends RouteComponentProps {

}
interface changePassWord<T> {
    userName: T,
    passWord: T,
    confirmPassWord: T
}

const ManagerAcccountChangePass: React.FC<ManagerAcccountChangePass> = ({ location: { state: stateLocal } }) => {
    const [alertResponse, setalertResponse] = useState({ display: 0, message: "", icon: "" });
    const refFormData = useRef<HTMLFormElement | any>(null);
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>;
    const { watch, register, formState: { errors }, handleSubmit, reset } = useForm<changePassWord<string>>({
        mode: "onSubmit",
        defaultValues: { userName: (stateLocal as any).dataUserUpdate.userName },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDChangePassword)
    })
    const submitForm = async (data: changePassWord<string>) => {
        let { dataUserUpdate: { _id } } = (stateLocal as any);
        let { token } = stateUser.dataUser as any;
        let createForm = new FormData(refFormData.current);

        let getResponseUser = await ApiUser.editUser(createForm, _id, token);
        if (getResponseUser.status == "successfully") {
            setalertResponse({ display: 1, message: getResponseUser.message, icon: "success" })
            return reset({ userName: (stateLocal as any).dataUserUpdate.userName })
        }
        setalertResponse({ display: 1, message: getResponseUser.message, icon: "danger" })
    }
    return (
        <form style={{ maxWidth: 750, margin: "0 auto" }} ref={refFormData} onSubmit={handleSubmit(submitForm)}>
            {/* {JSON.stringify(watch())}
        {JSON.stringify(isValid)} */}
            {
                alertResponse.display ?
                    <div className={`alert alert-${alertResponse.icon}`} role="alert">
                        {alertResponse.message}
                    </div> : ""

            }

            <section className="row g-3" >
                <div className="col-12">
                    <label htmlFor="exampleInputemail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputemail1" {...register("userName")} readOnly aria-describedby="emailHelp" />
                    <div style={{ color: "red" }}>{errors.userName && errors.userName.message}</div>
                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputpassWord1" className="form-label">passWord</label>
                    <input type="passWord" className="form-control" {...register("passWord")} id="exampleInputpassWord1" />
                    <div style={{ color: "red" }}>{errors.passWord && errors.passWord.message}</div>
                </div>
                <div className="col-12">
                    <label htmlFor="exampleInputpassWord1" className="form-label">Comfirm passWord</label>
                    <input type="passWord" className="form-control" {...register("confirmPassWord")} id="exampleInputpassWord1" />
                    <div style={{ color: "red" }}>{errors.confirmPassWord && errors.confirmPassWord.message}</div>
                </div>
            </section>
            <button type="submit" className="btn btn-primary" >Submit</button>
            <NavLink to={{ pathname: "/admin/ManagerAccount" }} className="btn btn-primary" >go Back</NavLink>

        </form>
    )
}

export default withRouter(ManagerAcccountChangePass)
