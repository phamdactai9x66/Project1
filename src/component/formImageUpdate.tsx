import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router-dom"
import { port } from '../api/Apiclient';
import apiImages from '../api/apiImages';
import { formmatTypeAction } from '../redux/infoUser/actionUser';
import FormaddImage from './formaddImage';
import FormUpdateImage from './formUpdateImage';
import { checkRole } from './methodCommon';
interface FormImagesUpdate extends RouteComponentProps {
    dataFormImage: any,
    listImages: any
}
interface formState {
    title: string,
    image: string,
    _id: any
}

const FormImagesUpdate: React.FC<FormImagesUpdate> = (props) => {
    const [listImage, setlistImage] = useState({ loading: false, data: [] }) as any;
    const [renderAgain, setrenderAgain] = useState(0);
    const [displayedit, setdisplayedit] = useState({ display: 0, data: {} })
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    useEffect(() => {
        (async () => {
            let { dataProduct: { _id: IdPro } } = props.location.state as any;

            let findImages = await apiImages.getAll({ idProduct: IdPro })
            setlistImage({ loading: true, data: [...findImages] })
        })()
        return () => {
            setlistImage({ loading: false })
        }
    }, [renderAgain])
    const deleteImages = (e: Event | any) => {
        e.preventDefault();
        return async (_id: number) => {

            let { dataUser: { user: { role }, token } } = stateUser as any;
            if (role >= checkRole.partner) {
                await apiImages.deleteOne(_id, token);
                setdisplayedit({ display: 0, data: {} })
                renderImages()

            } else {
                alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
            }

        }
    }
    const editeImages = (e: Event | any) => {
        e.preventDefault();
        return (data: any) => {
            setdisplayedit({ display: 1, data: { ...data } })
            // renderImages()
        }
    }
    const deleteEditImage = () => {
        setdisplayedit({ display: 0, data: {} })
    }

    const displayImage = (): JSX.Element => {
        return listImage.data.map((currenValue: any, index: any) => {
            return (
                <tr key={index}>
                    <td scope="row">
                        <input type="text" className="form-control" value={currenValue.title} disabled id="exampleFormControlInput1" />
                    </td>
                    <td></td>
                    <td><img src={`${port}/${currenValue.url}`} style={{ width: 50, height: 50 }} alt="" /></td>
                    <td><button onClick={(e) => { deleteImages(e)(currenValue._id) }}>delete</button></td>
                    <td><button onClick={(e) => { editeImages(e)(currenValue) }}>Edite</button></td>
                </tr>
            )
        })
    }
    const renderImages = () => {
        setrenderAgain(renderAgain + 1)
    }
    return (
        <div >
            <p>list Image</p>

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
                    {listImage.loading &&
                        displayImage()
                    }

                </tbody>
            </table>
            <div>
                <FormaddImage renderAgain={renderImages} />
                {displayedit.display &&
                    <FormUpdateImage renderAgain={renderImages} dataImage={displayedit.data} deleteEdit={deleteEditImage} />}

            </div>
        </div>
    )
}

export default withRouter(FormImagesUpdate)
