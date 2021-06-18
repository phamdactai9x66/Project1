import React, { useState } from 'react'
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { VLDUser } from '../../component/validation';
import { useRef } from 'react';
import ApiUser from '../../api/ApiUser';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../../redux/infoUser/actionUser';

interface ManagerAccountAdd extends RouteComponentProps {

}
interface constructure<T> {
    first_name: T,
    last_name: T,
    image: T,
    gender: T,
    email: T,
    address: T,
    userName: T,
    passWord: T,
    confirmPassWord: T,
    role: number
}

const ManagerAccountAdd: React.FC<ManagerAccountAdd> = (props) => {
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "" })
    const refFormData = useRef<any>(null);
    const stateUser: any = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>;
    const { watch, register, formState: { errors }, reset, handleSubmit } = useForm<constructure<string>>({
        mode: "onSubmit",
        defaultValues: { image: "" },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDUser)
    })

    const submitForm = async (data: constructure<string>) => {
        let { dataUser: { user: { role }, token } } = stateUser;
        let FormDataPost = new FormData(refFormData.current);
        let getResponseUser: any = await ApiUser.postOneAdmin(FormDataPost, token);
        if (getResponseUser.status == "successfully") {
            setalertNoti({ display: 1, message: getResponseUser.message, style: "success" })
            reset({ image: "" })
        } else {
            setalertNoti({ display: 1, message: getResponseUser.message, style: "danger" })
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} ref={refFormData} style={{ maxWidth: 800, margin: "0 auto" }} >
                {alertNoti.display &&
                    <div className={`alert alert-${alertNoti.style}`} role="alert">
                        {alertNoti.message}
                    </div>
                }
                {JSON.stringify(watch())}
                <div className="row g-3" style={{ marginBlock: 25 }}>
                    <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                        <input type="text" className="form-control"  {...register("first_name")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.first_name && errors.first_name.message}</div>
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                        <input type="text" className="form-control" {...register("last_name")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.last_name && errors.last_name.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control"{...register("email")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.email && errors.email.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                        <input type="text" className="form-control" {...register("address")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.address && errors.address.message}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">image</label>
                        <input type="file" className="form-control"  {...register("image")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.image && errors.image.message}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", }}>
                        <div className="form-check" style={{ marginRight: 10 }}>
                            <input className="form-check-input" {...register("gender")} type="radio" value="true" defaultChecked={true} id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">Female</label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" {...register("gender")} type="radio" value="false" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">Male</label>
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                        <input type="text" className="form-control" {...register("userName")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.userName && errors.userName.message}</div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                        <input type="password" className="form-control" {...register("passWord")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.passWord && errors.passWord.message}</div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Comfirm Password</label>
                        <input type="password" className="form-control"  {...register("confirmPassWord")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.confirmPassWord && errors.confirmPassWord.message}</div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", }}>
                        <div className="form-check" style={{ marginRight: 10 }}>
                            <input className="form-check-input" {...register("role")} type="radio" defaultChecked={true} value={1} id="role1" />
                            <label className="form-check-label" htmlFor="role1">Member</label>
                        </div>

                        <div className="form-check" style={{ marginRight: 10 }}>
                            <input className="form-check-input" {...register("role")} type="radio" value={0} id="role2" />
                            <label className="form-check-label" htmlFor="role2">Partner</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" {...register("role")} type="radio" value={0} id="role3" />
                            <label className="form-check-label" htmlFor="role3">Admin</label>
                        </div>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary" >Submit</button>
                <NavLink to={{ pathname: "/admin/ManagerAccount" }} className="btn btn-primary" >go Back</NavLink>
            </form>


        </>
    )
}

export default withRouter(ManagerAccountAdd)
