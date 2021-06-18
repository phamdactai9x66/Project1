import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { host, imageDefault } from '../../component/methodCommon';
import { formmatTypeAction } from '../../redux/infoUser/actionUser';
import { TiUser, TiHome } from "react-icons/ti";
import { IconContext } from 'react-icons';



interface Header {

}

const Header: React.FC<Header> = (props) => {
    const [displayLeftSide, setdisplayLeftSide] = useState(0);
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>

    const displayLeft = (eventMouse: Event | any) => {
        eventMouse.preventDefault();
        return (pagrams: number) => {
            setdisplayLeftSide(pagrams);
        }
    }
    const displayImage = () => {

        if ((stateUser.dataUser as any).user.authType != "local") {
            return (stateUser.dataUser as any).user.avatar
        }
        return (stateUser.dataUser as any).user.avatar ? `${(stateUser.dataUser as any).user.avatar}` : imageDefault;
    }
    return (
        <>
            <div id="fix_full" onClick={() => { setdisplayLeftSide(0) }} style={displayLeftSide ? { width: "100%" } : { width: 0 }} ></div>

            <nav id="first_nav">
                <div>
                    <ul>
                        <li><NavLink to="" onClick={(e) => { displayLeft(e)(1) }} className="open_nav"><i className="fas fa-bars" /></NavLink></li>
                        <li><NavLink to="/">home</NavLink></li>
                        <li><NavLink to="/">contact</NavLink></li>
                    </ul>
                </div>
                <div className="image_aside_left">
                    <img src={displayImage()} alt="" />
                </div>
            </nav>

            <aside id="aside_left" style={displayLeftSide ? { width: 300 } : { width: 0 }}>
                <div className="image_aside_left">
                    <img src={`${host}/img/logo_white-e1592989810533.png`} alt="" />
                    <p>admin</p>
                    <div className="next" onClick={(e) => { displayLeft(e)(0) }} ><i className="fas fa-chevron-left" /></div>
                </div>
                <div className="image_aside_left">
                    <img src={displayImage()} alt="" />
                    <p>pham dac tai</p>
                </div>
                <ul className="element_bottom">
                    <IconContext.Provider value={{ size: "23" }}>
                        <li><NavLink to="/admin">
                            <TiHome />
                            Home</NavLink></li>
                        <li><NavLink to="/admin/category">
                            <i className="fab fa-product-hunt" />
                            Category</NavLink></li>
                        <li><NavLink to="/admin/product">
                            <i className="fas fa-cart-plus" />
                            Product</NavLink></li>
                        <li><NavLink to="/admin/comment">
                            <i className="fas fa-comments" />
                            Comment</NavLink></li>
                        {(stateUser.dataUser as any).user.role == 2 &&
                            <li><NavLink to="/admin/ManagerAccount">
                                <TiUser />Manager Account</NavLink></li>
                        }
                    </IconContext.Provider>
                </ul>
            </aside>
        </>
    )
}

export default Header
