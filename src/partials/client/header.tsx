import React, { useEffect, useRef, useState } from 'react'
import Carts from "../../component/carts";
import { host } from "../../component/methodCommon";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import { checkAuth } from '../../auth';
import { useDispatch, useSelector } from "react-redux";
import { typeAction, formmatTypeAction, ActionUser } from '../../redux/infoUser/actionUser';
import { useForm } from "react-hook-form";
interface headerProps extends RouteComponentProps {

}
let checkDisplayFindName: any = {
    hidden: {
        visibility: "hidden",
        transform: "scale(0.9)",
        opacity: "0"
    },
    VisibilityElement: {
        visibility: "visible",
        transform: "scale(1)",
        opacity: "1"
    }
}
interface formData {
    name: string
}

const Header: React.FC<headerProps> = (props) => {
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>;
    const [displayFindName, setstate] = useState(0)
    const refForm = useRef<HTMLDivElement>(null)
    const dispatchUser = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit } = useForm<formData>({
        mode: "onSubmit",
        defaultValues: {},
        reValidateMode: "onSubmit"
    })


    useEffect(() => {
        window.onclick = (eventMouse: Event) => {
            if (eventMouse.target == refForm.current) {
                setstate(0)
            }

        }
    }, [])
    const signOut = (e: Event | any) => {
        e.preventDefault();
        props.history.push("/SignIn")
        dispatchUser(ActionUser(typeAction.signOut))
    }
    const displayul = (): JSX.Element => {
        let saveUL: any = "";
        if (stateUser.dataUser) {
            let checkRole = (stateUser.dataUser as any).user.role
            let { first_name, last_name, _id } = (stateUser.dataUser as any).user;
            let nameUser = first_name + last_name;
            let saveSignin = (
                <>
                    <li><NavLink to="" onClick={signOut}>Sign Out</NavLink></li>
                    <li><NavLink to={{
                        pathname: `/EditProfile/${_id}?nameUser=${nameUser}`,
                        state: { idUser: _id }
                    }}>Edit Profile</NavLink></li>
                </>
            )
            saveUL = (
                <> {saveSignin} </>
            )
            if (checkRole >= 1) {
                saveUL = (
                    <>
                        {saveSignin}
                        <li><NavLink to="/admin">Admin</NavLink></li>
                    </>)
            }

        } else {
            saveUL = (
                <>
                    <li><NavLink to="#">Forget Password</NavLink></li>
                    <li><NavLink to="/SignIn">Sign In</NavLink></li>
                </>
            )
        }
        return saveUL;
    }
    const findNameProduct = (data: formData) => {
        let formatString = (data.name as string).trim().toLowerCase();
        reset({})
        props.history.replace(`/findProduct/${formatString}`, {
            nameProduct: formatString
        })
        setstate(0)
    }


    return (
        <>
            <div className="search_full_screen" ref={refForm}
                style={displayFindName ? checkDisplayFindName.VisibilityElement : checkDisplayFindName.hidden}>
                <form method="post" className="form_search" onSubmit={handleSubmit(findNameProduct)}>
                    <div>
                        <input type="text" {...register("name", {
                            required: true, minLength: 2
                        })} placeholder="Searching product" />
                        <button name="submit"><i className="fas fa-search" /></button>
                    </div>
                </form>
            </div>
            <section className="top-header">
                <div className="flex-top-header">
                    <div className="box1 genaral"><img src={`${host}/img/logo-e1592989828631.png`} alt="" /></div>
                    <div className="box2 genaral"> <i className="far fa-clock" /> OPENNING HOURS 11.30AM – 2.30PM</div>
                    <ul className="box3 genaral" style={{ height: "100%" }}>
                        <li><NavLink to="/">home</NavLink></li>
                        <li><NavLink to="/detailCarts">cart</NavLink></li>
                        <li><NavLink to="/">contact</NavLink></li>
                        <li className="menu_home11" >
                            <NavLink to="#">menu</NavLink><i className="fas fa-angle-down" />
                            <div className="menu-home">
                                <div className="category">
                                    <div className="parent_1">
                                        <div className="row">
                                            <header>home site</header>
                                            <ul className="link_row">
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="row">
                                            <header>home site</header>
                                            <ul className="link_row">
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="row">
                                            <header>home site</header>
                                            <ul className="link_row">
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                                <li>
                                                    <img src="./img/58db701349cb48738069e8c912e2b3ac_result-150x150.jpg" alt="" />
                                                    <h2>cafe americano ... <span>$9</span><span>$9</span>
                                                        <label className="font_size_text">the content it under</label></h2>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="box4 genaral">
                        <div id="parent_account"><i className="fas fa-user-circle" />
                            <ul className="acount_for_user" style={{ padding: 0 }}>
                                {displayul()}
                            </ul>
                        </div>
                        <Carts />
                        <NavLink to="#"> <i className="fab fa-instagram-square" /></NavLink>
                        <div className="searching_form" onClick={() => { setstate(1) }}><i className="fas fa-search" /></div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default withRouter(Header)
