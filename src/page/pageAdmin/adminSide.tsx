import React, { useState } from 'react'
import "./cssAdmin.css"
import Header from "../../partials/admin/header"
import Footer from "../../partials/admin/footer";
import { RouteComponentProps, withRouter } from "react-router-dom";
interface AdminSideProp extends RouteComponentProps {

}
const AdminSide: React.FC<AdminSideProp> = (props) => {

    return (
        <div>
            <Header />
            <main className="main_center">
                <div className="brand_web">
                    {props.location.pathname}
                </div>
                <div className="row_analysis">
                    <div>
                        <div className="flex_row_analysis">
                            <span className="box1"><i className="far fa-comments" /></span>
                            <p><label >comment</label> <br />
                                <label className="font_ad"><span>10</span><span>%</span></label>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex_row_analysis">
                            <span className="box2"><i className="far fa-eye" /></span>
                            <p><label >view</label> <br />
                                <label className="font_ad"><span>10</span><span>%</span></label>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex_row_analysis">
                            <span className="box3"><i className="fas fa-shopping-cart" /></span>
                            <p><label >cart</label> <br />
                                <label className="font_ad"><span>10</span><span>%</span></label>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex_row_analysis">
                            <span className="box4"><i className=" fas fa-users" /></span>
                            <p><label >users</label> <br />
                                <label className="font_ad"><span>10</span><span>%</span></label>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="main_ad">

                    {props.children}

                    {/* listProduct */}

                </div>
            </main>
            <Footer />

        </div>
    )
}

export default withRouter(AdminSide)

