import { yupResolver } from "@hookform/resolvers/yup";
import react, { useEffect, useRef, useState } from "react";
import { firebase } from "../../../component/firebase";
import { useForm } from "react-hook-form";
import { NavLink, RouteComponentProps } from "react-router-dom";
import FormImages from "../../../component/formImages";
import Selectcate from "../../../component/select";
import { VLDAddCate, AddCate, VLDAddProduct } from "../../../component/validation";
import ApiProduct from "../../../api/ApiProduct";
import apiImages from "../../../api/apiImages";
import { useSelector } from "react-redux";
import { formmatTypeAction } from "../../../redux/infoUser/actionUser";


interface Productadd extends RouteComponentProps {

}
const Productadd: React.FC<Productadd> = (props) => {
    const [alertNoti, setalertNoti] = useState({ display: 0, message: "adawd aw adad ", style: "danger" })
    const [listImage, setlistImage] = useState([]) as any
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    const refForm = useRef(null);
    let { watch, register, formState: { errors }, handleSubmit, reset } = useForm<AddCate<string>>({
        mode: "onSubmit",
        defaultValues: { image: "", status: true },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLDAddProduct)
    })
    const saveImages = (data: any, change: number = 1) => {
        if (change) {
            setlistImage([...listImage, { ...data, image: data.image[0] }])
        } else {
            setlistImage([...data])
        }

    }
    const submitbottom = async (data: AddCate<string>) => {
        let getFormData = new FormData(refForm.current as any);
        getFormData.set("status", String((data.status as any)))

        let { dataUser: { user: { role }, token } } = stateUser as any;

        let addcate: any = await ApiProduct.postOne(getFormData, token);
        if (addcate.status == "successfully") {
            reset({ image: "", status: true })
            setalertNoti({
                display: 1,
                style: "success",
                message: addcate.message
            })
            if (listImage.length >= 1) {
                let saveListImage = listImage.map((currenValue: any) => {
                    return {
                        title: currenValue.title,
                        image: currenValue.image,
                        idProduct: addcate.data._id
                    }
                })
                saveListImage.forEach(async (currenValue: any) => {
                    let images = new FormData();
                    images.append("title", currenValue.title)
                    images.append("image", currenValue.image)
                    images.append("idProduct", currenValue.idProduct)

                    await apiImages.postOne<object, string>(images, token)
                })
            }
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
                {alertNoti.display &&
                    <div className={`alert alert-${alertNoti.style}`} role="alert">
                        {alertNoti.message}
                    </div>
                }
                {JSON.stringify(watch())}
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
                        <Selectcate resgiter={register("id_cate")} />
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
                <FormImages dataFormImage={saveImages} listImages={listImage} />

            </div>

        </>
    )
}

export default Productadd
