import React, { useEffect, useState } from 'react'
import { port } from '../api/Apiclient';
import ApiComment from '../api/ApiComment';
import CommentAdd from "./commentAdd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ApiUser from '../api/ApiUser';

interface Comment extends RouteComponentProps {
    handleStart: any
}

const Comment: React.FC<Comment> = (props) => {
    const [displayCOmment1, setdisplayCOmment] = useState({ loading: false, data: [] }) as any;
    const [stateRender, setstateRender] = useState(0)
    useEffect(() => {
        (async () => {
            let getIdProduct = (props.location.state as any).idProduct;
            let getAllComment: any = await ApiComment.getAll({ idProduct: getIdProduct });
            let getFindUser = () => {
                return getAllComment.filter((currenValue: any) => (currenValue.status == 0))
                    .map(async (currenValue: any) => {

                        let findUser = await ApiUser.getOne(currenValue.id_User);
                        return { ...currenValue, UserComment: findUser }
                    })
            }

            setTimeout(async () => {
                setdisplayCOmment({ loading: true, data: await Promise.all([...(await getFindUser())]) })
            }, 1000);
        })()
        return () => {
            setdisplayCOmment({ loading: false, data: [] })
        }
    }, [stateRender])

    const countStars = (numberStart: number) => {
        let saveStart: any = []
        for (let index = 1; index <= numberStart; index += 1) {
            saveStart.push(<i key={index} className="far fa-star"></i>)
        }
        return saveStart;
    }
    const renderAgain = () => {
        setstateRender(stateRender + 1)
    }

    const displayComment = () => {
        if (!displayCOmment1.data.length) return ""

        return displayCOmment1.data.map((currrenValue: any, index: any) => {
            let { UserComment } = currrenValue;

            return (
                <div className="list_comment" key={index} style={{ margin: 0 }} >
                    {UserComment.authType != "local" ?

                        <img style={{ objectFit: "cover" }} src={UserComment.avatar} alt="" /> :

                        <img style={{ objectFit: "cover" }} src={UserComment.avatar} alt="" />}

                    <p style={{ display: "flex", flexDirection: "column" }}><span style={{ textAlign: "left" }}>{UserComment.userName}
                        <span style={{ marginLeft: 5 }}>
                            {countStars(currrenValue.rangeStart)}
                        </span>
                    </span>
                        {<label style={{ textAlign: "left", padding: 0 }}>title:{currrenValue.title}</label>}
                        {<label style={{ textAlign: "left", padding: 0 }}>comment:{currrenValue.comment}</label>}
                    </p>
                </div>)
        })
    }

    return (
        <>
            <section className="comment-user">
                <div className="heade-main">
                    <nav>
                        <li><a href="#">comment</a></li>
                    </nav>
                    <h4 style={{ textAlign: "left", marginBottom: 10 }}>
                        <span >Star Reviewers( {props.handleStart().getStars} / 5 ) <i className="far fa-star"></i></span>
                    </h4>
                    <div className="list_comment_parent" >
                        {displayCOmment1.loading ? displayComment() :
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </div>

                    <CommentAdd renderAgain={renderAgain} />
                </div>
            </section>
        </>
    )
}

export default withRouter(Comment)
