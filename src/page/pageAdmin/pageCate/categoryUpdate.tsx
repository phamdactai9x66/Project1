import { yupResolver } from "@hookform/resolvers/yup";
import react, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import ApiCate from "../../../api/ApiCate";
import ApiProduct from "../../../api/ApiProduct";
import { VLDAddCate, AddCate } from "../../../component/validation";
import { formmatTypeAction } from "../../../redux/infoUser/actionUser";

interface CategoryUpdate extends RouteComponentProps {

}

const CategoryUpdate: React.FC<CategoryUpdate> = (props) => {
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "danger" })
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const [datacate, setdata] = useState((props.location.state as any).dataCate) as any
    const refForm = useRef(null);
    let { register, formState: { errors }, handleSubmit } = useForm<AddCate<string>>({
        mode: "onSubmit",
        defaultValues: { ...datacate },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDAddCate)
    })

    const submitbottom = async (data: AddCate<string>) => {
        let getFormData = new FormData(refForm.current as any);
        let { dataUser: { user: { role }, token } } = stateUser as any;

        let addcate: any = await ApiCate.UpdateOne(datacate._id, getFormData, token);
        if (addcate.status == "successfully") {

            setalertNoti({
                display: 1,
                style: "success",
                message: addcate.message
            })
            props.history.push(`/admin/category/update/${addcate.data.name}`, {
                dataCate: { ...addcate.data }
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

export default CategoryUpdate
