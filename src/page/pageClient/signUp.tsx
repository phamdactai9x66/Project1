
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { RouteComponentProps, NavLink } from "react-router-dom";
import ApiUser from '../../api/ApiUser';
interface SignUp {
}
interface dataForm<T> {
    first_name: T,
    last_name: T,
    address: T,
    email: T,
    gender: number,
    userName: T,
    passWord: T,
    confirmPassWord: T
}

const resetForm = {
    userName: "",
    passWord: "",
    confirmPassWord: ""
}

const SignUp: React.FC<SignUp> = (props) => {
    const [stepForm, setstepForm,] = useState(1);
    let refForm = useRef<HTMLFormElement>(null)
    const { watch, register, formState: { errors, isValid }, reset, handleSubmit, clearErrors } = useForm<dataForm<string>>({
        mode: "onBlur",
        defaultValues: {},
        reValidateMode: "onBlur"
    })

    const createUser = async (data: dataForm<string>) => {
        try {
            let createForm = new FormData(refForm.current as any)
            createForm.set("gender", (parseInt(createForm.get("gender") as any)) as any)
            let getNewUser: any = await ApiUser.postOne(createForm);

            if (getNewUser.status == "successfully") {
                setstepForm(stepForm + 1)
            }
            throw getNewUser
        } catch (error) {
            console.log(error)
        }
    }
    const backStep = (e: Event | any) => {
        e.preventDefault();
        let saveDataForm = { ...watch() };

        delete (saveDataForm as any).userName;
        delete (saveDataForm as any).passWord;
        delete (saveDataForm as any).confirmPassWord;
        setstepForm(stepForm - 1)
        reset({ ...saveDataForm })
    }
    const displaybottom = () => {
        if (stepForm <= 1) {
            return (
                <div className="col-12">
                    <button type="submit" disabled={!isValid} onClick={() => { setstepForm(stepForm + 1) }} className="btn btn-primary">Next Step</button>
                </div>
            )
        } else if (stepForm == 2) {
            return (
                <div className="col-12">
                    <button type="submit" disabled={!isValid} onClick={handleSubmit(createUser)} className="btn btn-primary">Step Last</button>
                    <button type="submit" onClick={backStep} className="btn btn-primary">back</button>
                </div>
            )
        }
    }

    return (
        <>
            <form ref={refForm} style={{ maxWidth: 750, margin: "0 auto" }}>
                {JSON.stringify(watch())}
                {JSON.stringify(isValid)}
                {stepForm >= 1 &&
                    <section style={stepForm == 1 ? { display: "block" } : { display: "none" }}  >
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputemail4" className="form-label">First Name</label>
                                <input type="text"
                                    {...register("first_name", {
                                        required: { value: true, message: "You must provide value." },
                                        minLength: { value: 5, message: "min value 5" }
                                    })} className="form-control" id="inputemail4" />

                                <p>{errors.first_name && errors.first_name.message}</p>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputpassWord4" className="form-label">Last Name</label>
                                <input type="text"
                                    {...register("last_name", {
                                        required: { value: true, message: "You must provide value." }
                                    })} className="form-control" id="inputpassWord4" />

                                <p>{errors.last_name && errors.last_name.message}</p>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control"
                                {...register("address", {
                                    required: { value: true, message: "You must provide value." }
                                })} id="inputAddress" placeholder="1234 Main St" />
                            <p>{errors.address && errors.address.message}</p>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Email</label>
                            <input type="email" className="form-control" {...register("email", {
                                required: { value: true, message: "You must provide value." }
                            })} id="inputAddress" placeholder="1234 Main St" />
                            <p>{errors.email && errors.email.message}</p>
                        </div>
                        <section className="row g-3" >
                            <div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" {...register("gender", {
                                            required: { value: true, message: "You must provide value." },
                                            valueAsNumber: true
                                        })} value={0} checked={watch().gender == 0 && true} id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Female
                 </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" {...register("gender", {
                                            required: { value: true, message: "You must provide value." },
                                            valueAsNumber: true
                                        })} value={1} checked={watch().gender != 0 && true} id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Male
             </label>
                                    </div>
                                </div>
                                <p>{errors.gender && errors.gender.message}</p>
                            </div>
                        </section>
                    </section>}
                {/* step 2 */}
                {stepForm >= 2 &&
                    <section className="row g-3" style={stepForm == 2 ? { display: "block" } : { display: "none" }}>
                        <div className="col-12">
                            <label htmlFor="exampleInputemail1" className="form-label">Username</label>
                            <input type="text" className="form-control" {...register("userName", {
                                required: { value: true, message: "You must provide value." }
                            })} id="exampleInputemail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">{errors.userName && errors.userName.message}</div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="exampleInputpassWord1" className="form-label">passWord</label>
                            <input type="passWord" className="form-control" {...register("passWord", {
                                required: { value: true, message: "You must provide value." }
                            })} id="exampleInputpassWord1" />
                            <div id="emailHelp" className="form-text">{errors.passWord && errors.passWord.message}</div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="exampleInputpassWord1" className="form-label">Comfirm passWord</label>
                            <input type="passWord" className="form-control" {...register("confirmPassWord", {
                                validate: value => value == watch().passWord || "the confirmpassWord not match."
                            }
                            )} id="exampleInputpassWord1" />
                            <div id="emailHelp" className="form-text">{errors.confirmPassWord && errors.confirmPassWord.message}</div>
                        </div>
                    </section>
                }
                {stepForm >= 3 &&
                    <section className="row g-3" style={stepForm == 3 ? { display: "block" } : { display: "none" }}>
                        <div className="col-12">successfully</div>
                        <NavLink to={{ pathname: "/SignIn" }} className="btn btn-primary " style={{ margin: "0 5px" }}  >Go Back</NavLink>
                    </section>
                }


                {displaybottom()}

            </form>
        </>
    )
}

export default SignUp
