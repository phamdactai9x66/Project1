import { yupResolver } from "@hookform/resolvers/yup";
import react, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps } from "react-router-dom";
import FormImagesUpdate from "../../../component/formImageUpdate";
import Selectcate from "../../../component/select";
import { AddCate, VLDUpdateProduct } from "../../../component/validation";
import ApiProduct from "../../../api/ApiProduct";
import apiImages from "../../../api/apiImages";
import { port } from "../../../api/Apiclient";
import { useSelector } from "react-redux";
import { formmatTypeAction } from "../../../redux/infoUser/actionUser";


interface ProductUpdate extends RouteComponentProps {

}
const ProductUpdate: React.FC<ProductUpdate> = (props) => {
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "danger" })
    const [datacate, setdata] = useState((props.location.state as any).dataProduct) as any
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const [listImage, setlistImage] = useState([]) as any;
    const [displayImage, setdisplayImage] = useState({ url: datacate.image.name_file })
    const refForm = useRef(null);
    let { watch, register, formState: { errors }, handleSubmit, reset } = useForm<AddCate<string>>({
        mode: "onSubmit",
        defaultValues: { ...datacate, image: '' },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDUpdateProduct)
    })
    const saveImages = (data: any, change: number = 1) => {

        if (change) {
            setlistImage([...listImage, data])
        } else {
            setlistImage([...data])
        }
    }
    const submitbottom = async (data: AddCate<string>) => {
        let getFormData = new FormData(refForm.current as any);

        getFormData.set("status", String((data.status as any)))
        let { dataUser: { user: { role }, token } } = stateUser as any;
        let addcate: any = await ApiProduct.putOne(getFormData, datacate._id, token);
        if (addcate.status == "successfully") {

            setdisplayImage({ url: addcate.data[0].image.name_file })

            props.history.push(`/admin/product/update/${addcate.data[0].name}`, {
                dataProduct: { ...addcate.data[0] }
            })
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
        <>
            <form onSubmit={handleSubmit(submitbottom)} ref={refForm} style={{ maxWidth: 800, margin: "0 auto" }}>
                {alertNoti.display ?
                    <div className={`alert alert-${alertNoti.style}`} role="alert">
                        {alertNoti.message}
                    </div>
                    : ""

                }
                {JSON.stringify(watch())}
                <img src={`${port}/${displayImage.url}`} alt=""
                    style={{ width: 100, height: 100, objectFit: "cover" }} />
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name product</label>
                        <input type="text" className="form-control" {...register("name")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.name && errors.name.message}</div>
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
                        <input type="number" className="form-control" {...register("price")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.price && errors.price.message}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Quantity</label>
                        <input type="number" className="form-control" {...register("quantity")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.quantity && errors.quantity.message}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                        <input type="file" className="form-control" {...register("image")} id="exampleFormControlInput1" />
                        <div style={{ color: "red" }}>{errors.image && errors.image.message}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Category</label>
                        <Selectcate resgiter={{ ...register("id_cate") }} />

                        <div style={{ color: "red" }}>{errors.id_cate && errors.id_cate.message}</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Status</label>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" {...register("status")} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">  <div style={{ color: "red" }}>{errors.status && errors.status.message}</div></label>
                        </div>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Describe</label>
                        <textarea className="form-control" {...register("describe")} id="exampleFormControlTextarea1" rows={3} />
                        <div style={{ color: "red" }}>{errors.describe && errors.describe.message}</div>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary" >Submit</button>
                <NavLink to={{ pathname: "/admin/product" }} className="btn btn-primary" >go Back</NavLink>
            </form>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <FormImagesUpdate dataFormImage={saveImages} listImages={listImage} />

            </div>

        </>
    )
}

export default ProductUpdate
