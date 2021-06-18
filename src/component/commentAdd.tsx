import react, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { formatNitialUser } from '../redux/infoUser/reducerUser';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ApiComment from "../api/ApiComment";
import { checkRole } from "./methodCommon";
interface CommentAdd extends RouteComponentProps {
    renderAgain: any
}

interface typeForm {
    title: any,
    comment: any
}

const CommentAdd: react.FC<CommentAdd> = (props) => {
    const stateUser = useSelector<{ users: any }>(state => state.users) as formatNitialUser<string>

    const refForm = useRef(null);
    const [countStart, setcountStart] = useState(5);
    const { watch, register, formState: { errors }, handleSubmit } = useForm<typeForm>({
        mode: "onSubmit",
        defaultValues: {},
        reValidateMode: "onSubmit",

    })
    const displayStart = () => {
        let saveStart: any[] = []
        for (let index = 1; index <= 5; index += 1) {
            saveStart.push(<button key={index}
                style={{
                    margin: '0 3px',
                    border: "1px solid white",
                    background: "#ff000000",
                    color: countStart == index ? "red" : "black"
                }}
                onClick={(e) => {
                    e.preventDefault();
                    setcountStart(index)
                }}

            ><i style={{ cursor: "pointer" }} className="far fa-star"></i></button>)
        }
        return saveStart;
    }
    const addComment = async (data: typeForm) => {
        if (!(stateUser.dataUser) && (!(props.location.state as any).idProduct)) {
            return
        }
        let { dataUser: { user: { role }, token } } = stateUser as any;
        if (role >= checkRole.member) {
            let formData = new FormData(refForm.current as any);
            formData.append("rangeStart", countStart as any);
            formData.append("id_Product", (props.location.state as any).idProduct);
            formData.append("id_User", stateUser.dataUser.user._id);
            let getNewComment = await ApiComment.creactOne<string>(formData, token);
            props.renderAgain()
        } else {
            alert(`You can't use this functional, You have to role ${checkRole.member}!`)
        }


    }
    const roleComment = () => {
        if (!(stateUser.dataUser)) return ""
        let RoleUser = stateUser.dataUser.user.role
        return RoleUser >= 0 &&
            <div className="create_comment" style={{ textAlign: "left" }}>
                <p>Add a comment</p>
                <form onSubmit={handleSubmit(addComment)} ref={refForm} method="post">
                    {JSON.stringify(watch())}
                    <div>
                        <label >add Stars</label>
                        <div>
                            {displayStart().map((currenStarts: any) => (currenStarts))}
                            <span style={{
                                position: "relative",
                                top: 1
                            }} >/ {countStart}</span>
                        </div>

                    </div>
                    <div >
                        <label >Title</label>
                        <textarea id="comment_textarea" {...register("title")} />
                        <label >{errors.title && errors.title.message}</label>
                    </div>
                    <div>
                        <label >Comment</label>
                        <textarea id="comment_textarea" {...register("comment")} />
                    </div>
                    <input type="submit" defaultValue="SUBMIT" />
                </form>
            </div>
    }
    return (
        <>
            {roleComment()}
        </>
    )
}

export default withRouter(CommentAdd)
