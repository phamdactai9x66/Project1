import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import ApiProduct from '../../api/ApiProduct';
import Pagination from "../../component/paginationAdmin";
import { typeActionAdmin, reducerAdmin, formatNumber, checkRole } from "../../component/methodCommon";
import { port } from '../../api/Apiclient';
import { RouteComponentProps } from "react-router-dom";
import ApiComment from '../../api/ApiComment';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../../redux/infoUser/actionUser';
interface DetailComment extends RouteComponentProps {

}
export const initalStateCatogory = {
    data: [],
    defaultData: [],
    loading: false,
    staticData: [],
    checkAll: false,
    pagination: {
        _page: 1,
        _limit: 5,
        countRows: 1
    },
    filter: {
        _page: 1,
        _limit: 5,
    }
}

const DetailComment: React.FC<DetailComment> = (props) => {
    const [state, dispatch] = useReducer(reducerAdmin, { ...initalStateCatogory });
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    useEffect(() => {
        (async () => {
            let { idProduct } = props.location.state as any
            let savequery = { ...state.filter, idProduct }
            let queryData = await ApiComment.getAll({ ...savequery });
            delete savequery._page
            delete savequery._limit
            let dataStatic = await ApiComment.getAll();
            let queryDatapart2 = await ApiComment.getAll({ ...savequery });
            let checkpagrams = Object.entries({ ...savequery }).length;

            setTimeout(() => {
                dispatch({
                    type: typeActionAdmin.getData, payload: {
                        queryData,
                        dataStatic: checkpagrams >= 1 ? queryDatapart2 : dataStatic,
                        nowPage: state.filter._page
                    }
                })
            }, 1000);
        })()
        return () => {
            dispatch({ type: typeActionAdmin.unMount })
        }
    }, [state.filter])
    const chooseDelete = (e: Event | any) => {
        e.preventDefault();

        let { dataUser: { user: { role }, token } } = stateUser as any;

        if (role >= checkRole.partner) {
            dispatch({ type: typeActionAdmin.chooseDelete })
            state.data.forEach(async (currenValue: any) => {
                if (currenValue.check) {
                    await ApiComment.deleteOne(currenValue._id, token);
                }
            })

        } else {
            alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
        }



    }
    const deleteOneComment = (e: Event | any) => {
        e.preventDefault();
        return async (_id: string) => {
            let { dataUser: { user: { role }, token } } = stateUser as any;

            if (role >= checkRole.partner) {
                dispatch({ type: typeActionAdmin.deleteOne, payload: { _id } })
                await ApiComment.deleteOne(_id, token);


            } else {
                alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
            }



        }
    }
    const changeStatus = async (_id: string) => {
        if (_id == null) return;
        let { dataUser: { user: { role }, token } } = stateUser as any;
        if (role >= checkRole.partner) {
            let findImage: any = await ApiComment.getAll({ _id });
            findImage[0].status = findImage[0].status == 0 ? 1 : 0

            let newFormData = new FormData()
            newFormData.append("id_Product", findImage[0].id_Product)
            newFormData.append("id_User", findImage[0].id_User)
            newFormData.append("title", findImage[0].title)
            newFormData.append("comment", findImage[0].comment)
            newFormData.append("status", findImage[0].status)
            let saveCommen = await ApiComment.updateOne(newFormData, _id, token);
        } else {
            alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
        }
    }

    return (
        <>
            <div className="list_something">

                <table id="table_parent2">
                    <thead>
                        <tr>
                            <th><input type="checkbox" className="form-check-input" checked={state.checkAll}
                                onChange={() => {
                                    dispatch({ type: typeActionAdmin.checkAll })
                                }} /> all</th>
                            <th>Title</th>
                            <th>Commen</th>
                            <th>Date Post</th>
                            <th>Status</th>
                            <th>handle</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!(state.loading) ?
                            <tr >
                                <td></td>

                                <td colSpan={2}></td>
                                <td style={{
                                    height: 200, display: "flex",
                                    justifyContent: "center", alignItems: "center"
                                }}><div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> </td>

                                <td></td>
                                <td></td>
                                <td ></td>
                            </tr> :
                            state.data.map((currenValue: any, index: any) => (
                                <tr key={index}>
                                    <td> <input className="form-check-input" checked={currenValue.check}
                                        onChange={() => {
                                            dispatch({ type: typeActionAdmin.checkElement, payload: { idCate: currenValue._id } })
                                        }}
                                        type="checkbox" id="flexCheckDefault" /> {index}</td>

                                    <td>{currenValue.title}</td>
                                    <td>{currenValue.comment}</td>
                                    <td>{currenValue.updatedAt}</td>
                                    <td> <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" onChange={() => { changeStatus(currenValue._id) }}
                                            defaultChecked={currenValue.status == 0 ? true : false} id="flexSwitchCheckDefault" />

                                    </div></td>
                                    <td style={{ textAlign: 'left' }}><NavLink to="" className="delete_element"
                                        onClick={(e) => { deleteOneComment(e)(currenValue._id) }}
                                    >delete</NavLink>
                                    </td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {(state.loading) && <Pagination dataPagination={state.pagination} dispatch={dispatch} />}
                <button type="button" onClick={chooseDelete} className="btn btn-primary">delete</button>
                <NavLink to={{ pathname: "/admin/comment" }} className="btn btn-primary">Go Back</NavLink>
            </div>
        </>
    )
}

export default DetailComment
