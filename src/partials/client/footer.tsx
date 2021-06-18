import React from 'react'
import { host } from "../../component/methodCommon";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";

interface FooterProps extends RouteComponentProps {

}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <>
            <footer style={{ marginTop: '80px' }}>
                <section className="footer-top">
                    <div className="content-footer">
                        <div className="box box1-footer">
                            <div className="flex-service-text2">
                                <h1>Delightful Experience</h1>
                                <p className="tag_p">Nesting close by to our Tiroran Estate, these legendary birds are the inspiration behind our
                  family-owned Whitetail brand. Just like its namesake,</p>
                                <div>
                                    <img src={`${host}/img/signature-1-e1592385747477.png`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="box box2-footer" />
                        <div id="brand-footer">
                            <img src={`${host}/img/since_1997.png`} alt="" />
                        </div>
                    </div>
                    <section className="footer-center">
                        <div className="content-footer-center">
                            <div>
                                <div className="image-footer-center part1">
                                    <div>
                                        <img src={`${host}/img/icon_vintage_compass.png`} alt="" />
                                        <p><label>Openning Hours</label><br />11.30AM – 2.30PM</p>
                                    </div>
                                </div>
                                <div className="image-footer-center  part2">
                                    <div>
                                        <img src={`${host}/img/icon_vintage_phone.png`} alt="" />
                                        <p><label>Openning Hours</label><br />11.30AM – 2.30PM</p>
                                    </div>
                                </div>
                                <div className="image-footer-center part3">
                                    <div>
                                        <i className="fab fa-facebook" />
                                        <i className="fab fa-instagram-square" />
                                        <i className="fab fa-twitter" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section></footer>
        </>
    )
}

export default withRouter(Footer)
