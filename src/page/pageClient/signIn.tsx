
import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { VLDSignIn } from "../../component/validation";
import ApiUser from '../../api/ApiUser';
import { authenticate, checkAuth } from '../../auth';
import { useDispatch, useSelector } from "react-redux";
import { typeAction, ActionUser } from '../../redux/infoUser/actionUser';
import { GoogleLogin, GoogleLogout } from "react-google-login"
import axios from "axios"
interface Signin extends RouteComponentProps {

}
interface dadaForm {
    userName: any,
    passWord: any,
}

const Signin: React.FC<Signin> = (props) => {
    const dispatchUser = useDispatch();
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "danger" })
    const refForm = useRef(null);
    const { watch, register, formState: { errors }, handleSubmit } = useForm<dadaForm>({
        mode: "onSubmit",
        defaultValues: {},
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDSignIn)
    })
    const submitForm = async (data: dadaForm) => {
        // console.log(data);
        let formSignIn = new FormData(refForm.current as any);
        let SignIn: any = await ApiUser.signIn(formSignIn);

        if (SignIn.status != "failed") {

            let saveResponse = SignIn
            delete saveResponse.status;

            authenticate(saveResponse, () => {
                dispatchUser(ActionUser(typeAction.dataUser, { dataUser: checkAuth() }))
                props.history.push("/")
            })
        } else {
            setalertNoti({
                display: 1,
                style: "danger",
                message: SignIn.message
            })
        }


    }
    const responseGoogle = (response: any) => {
        axios({
            method: "POST",
            url: "http://localhost:5000/user/user/testsign_in",
            data: { token: response.tokenId }
        }).then(response => {
            if (response.data.status != "failed") {
                // authenticate
                delete response.data.status;

                authenticate(response.data, () => {

                    dispatchUser(ActionUser(typeAction.dataUser, { dataUser: checkAuth() }))
                    props.history.push("/")
                })
            } else {
                console.log(response.data)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <>

            <form ref={refForm} onSubmit={handleSubmit(submitForm)} style={{ maxWidth: 750, margin: "0 auto" }}>
                {alertNoti.display ?
                    <div className={`alert alert-${alertNoti.style}`} role="alert">
                        {alertNoti.message}
                    </div> : ""
                }
                {/* {JSON.stringify(watch())} */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" {...register("userName")} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">{errors.userName && errors.userName.message}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("passWord")} id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text">{errors.passWord && errors.passWord.message}</div>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
                <NavLink to={{ pathname: "/SignUp" }} className="btn btn-primary " style={{ margin: "0 5px" }}  >Sign Up</NavLink>

                <GoogleLogin
                    clientId="600015660380-qhdnj20hloeapcl0tphsg9r3a30tam2u.apps.googleusercontent.com"

                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>



        </>
    )
}

export default Signin