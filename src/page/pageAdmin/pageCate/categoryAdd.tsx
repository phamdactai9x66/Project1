import { yupResolver } from "@hookform/resolvers/yup";
import react, { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import ApiCate from "../../../api/ApiCate";
import { VLDAddCate, AddCate } from "../../../component/validation";
import { formmatTypeAction } from "../../../redux/infoUser/actionUser";

interface Categoryadd extends RouteComponentProps {

}

const Categoryadd: React.FC<Categoryadd> = (props) => {
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "danger" })
    const refForm = useRef(null);
    let { register, formState: { errors }, handleSubmit, reset } = useForm<AddCate<string>>({
        mode: "onSubmit",
        defaultValues: {},
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDAddCate)
    })

    const submitbottom = async (data: AddCate<string>) => {
        let getFormData = new FormData(refForm.current as any);
        let { dataUser: { user: { role }, token } } = stateUser as any;
        let addcate: any = await ApiCate.postOne(getFormData, token);
        if (addcate.status == "successfully") {
            reset({ name: "" })
            setalertNoti({
                display: 1,
                style: "success",
                message: addcate.message
            })
        } else {
            setalertNoti({
                display: 1,
                style: "danger",
                message: addcate.message
            })

        }
    }
    return (
        <form onSubmit={handleSubmit(submitbottom)} ref={refForm} style={{ maxWidth: 800, margin: "0 auto" }}>
            {alertNoti.display &&
                <div className={`alert alert-${alertNoti.style}`} role="alert">
                    {alertNoti.message}
                </div>
            }

            <div className="mb-3" >
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1"
                    {...register("name")} />
                <div id="emailHelp" className="form-text">{errors.name && errors.name.message}</div>
            </div>

            <button type="submit" className="btn btn-primary" >Submit</button>
            <NavLink to={{ pathname: "/admin/category" }} className="btn btn-primary" >go Back</NavLink>
        </form>
    )
}

export default Categoryadd
