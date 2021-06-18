import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { firebase } from "../component/firebase";
import { VLdImages } from './validation';
interface FormImages {
    dataFormImage: any,
    listImages: any
}
export interface formState {
    title: string,
    image: string,
    _id: any
}

const FormImages: React.FC<FormImages> = (props) => {
    const [listImage, setlistImage] = useState([]) as any;
    const [displayImage1, setdisplayImage1] = useState<any>([])
    const { watch, register, handleSubmit, formState: { errors, isValidating }, reset } = useForm<formState>({
        mode: "onSubmit",
        defaultValues: { image: "", _id: Date.now() },
        reValidateMode: "onSubmit",
        resolver: yupResolver(VLdImages)
    })
    const submitForm = (data: formState) => {

        props.dataFormImage(data, 1)
        displayImage()
        setlistImage([...listImage, { ...data }])
        reset({ image: "", _id: Date.now() })
    }
    const displayImage = async () => {


        let saveData = { ...(watch() as any) }
        let storageImage = firebase.storage().ref(`test2/${saveData.image[0].name}`);
        let putIn = await storageImage.put(saveData.image[0]).then(() => storageImage.getDownloadURL());

        saveData = { ...saveData, image: putIn, checkElement: false }
        setdisplayImage1([...displayImage1, { ...saveData }])


    }
    const deleteProduct = (e: Event | any) => {
        e.preventDefault();
        return (_id: number) => {
            // console.log(_id);
            let filterImages = displayImage1.filter((currenImages: any) => (currenImages._id != _id));
            setdisplayImage1([...filterImages])
            setlistImage([...filterImages])
            let filterImagesAdd = props.listImages.filter((currenImages: any) => (currenImages._id != _id));
            props.dataFormImage(filterImagesAdd, 0)
        }
    }

    return (
        <div  >
            <p>list Image</p>
            {JSON.stringify(watch())}
            {JSON.stringify(isValidating)}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">title</th>
                        <th scope="col">UpLoad Image</th>

                        <th scope="col">Image</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {displayImage1.length &&
                        displayImage1.map((currenValue: any, index: any) => {
                            return (
                                <tr key={index}>
                                    <td scope="row">
                                        <input type="text" className="form-control" value={currenValue.title} disabled id="exampleFormControlInput1" />
                                    </td>
                                    <td></td>
                                    <td><img src={currenValue.image} style={{ width: 50, height: 50 }} alt="" /></td>
                                    <td><button onClick={(e) => { deleteProduct(e)(currenValue._id) }}>delete</button></td>
                                </tr>
                            )
                        })}
                    <tr>
                        <td scope="row">
                            <input type="text" className="form-control" {...register("title")} id="exampleFormControlInput1" />
                            <p>{errors.title && errors.title.message}</p>
                        </td>
                        <td> <input type="file" className="form-control" {...register("image")} id="exampleFormControlInput1" />
                            <p>{errors.image && errors.image.message}</p>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
            <button type="submit" className="btn btn-primary" style={{ margin: 20 }}
                onClick={handleSubmit(submitForm)} >add Image</button>
        </div>
    )
}

export default FormImages
