
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatNitialUser } from '../../redux/infoUser/reducerUser'
import { RouteComponentProps } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { port } from '../../api/Apiclient';
import { yupResolver } from '@hookform/resolvers/yup';
import { VLdEditProfile, VLdImages } from '../../component/validation';
import { checkAuth } from '../../auth';
import ApiUser from '../../api/ApiUser';
import { ActionUser, typeAction } from '../../redux/infoUser/actionUser';
interface EditProfile<T> extends RouteComponentProps {

}
interface editProfile<T> {
    first_name: T,
    last_name: T,
    address: T,
    gender: T,
    image: T
}

const EditProfile: React.FC<EditProfile<string>> = (props) => {
    const { dataUser: { user } } = useSelector<{ users: any }>(state => state.users) as formatNitialUser<string>;
    const refForm = useRef(null);
    const dispatch = useDispatch()
    const { watch, register, formState: { errors }, handleSubmit } = useForm<editProfile<string>>({
        mode: "onSubmit",
        defaultValues: { ...user, image: "" },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLdEditProfile)
    })
    const displayImageUser = (): JSX.Element => {
        return (
            user.authType != "local" ?
                <img className="rounded-circle mt-5" width="150px" style={{ objectFit: "cover" }} src={user.avatar} alt="" /> :
                <img className="rounded-circle mt-5" width="150px" style={{ objectFit: "cover" }} src={`${user.avatar}`} alt="" />
        )
    }
    const getData = async (dataform: formatNitialUser<string>) => {
        let creactFormData = new FormData(refForm.current as any);
        creactFormData.set("image", watch().image[0])
        creactFormData.set("role", user.role);
        let { data, token } = await ApiUser.editProfile<FormData, string>(creactFormData, checkAuth().token) as any
        let getQuery = {
            data,
            token
        }

        dispatch(ActionUser(typeAction.editInfoUser, { newUser: { ...getQuery } }))
        // console.log(getNewProduct);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        {displayImageUser()}
                        <span className="font-weight-bold">{user.first_name + " " + user.last_name}</span><span className="text-black-50">{user.email}</span><span> </span></div>
                    <div className="mb-3">

                        <input className="form-control" type="file" {...register("image")} id="formFile" />

                        <p>{errors.image && errors.image.message}</p>
                    </div>

                </div>
                <form className="col-md-5 border-right" ref={refForm} onSubmit={handleSubmit(getData)}>

                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">First Name</label>
                                <input type="text" className="form-control" {...register("first_name")} placeholder="first name" />
                                <p>{errors.first_name && errors.first_name.message}</p>
                            </div>
                            <div className="col-md-6"><label className="labels">Last Name</label>
                                <input type="text" className="form-control" {...register("last_name")} placeholder="surname" />
                                <p>{errors.last_name && errors.last_name.message}</p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Address</label>
                                <input type="text" className="form-control"  {...register("address")} placeholder="enter phone number" />
                                <p>{errors.address && errors.address.message}</p>
                            </div>

                            <div className="col-md-12">
                                <label className="labels">Gender</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"  {...register("gender")} value="true" defaultChecked={user.gender && true} id="flexRadioDefault1" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Female
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" {...register("gender")} value="false" defaultChecked={user.gender != true && true} id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Male
                                    </label>
                                </div>
                            </div>
                            {/* <div className="col-md-12"><label className="labels">Email</label>
                                <input type="text" className="form-control" {...register("email")} placeholder="enter address line 2" />
                                <p>{errors.email && errors.email.message}</p>
                            </div> */}
                        </div>

                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                    </div>
                </form>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div><br />
                        <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" /></div> <br />
                        <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile
