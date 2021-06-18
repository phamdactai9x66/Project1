import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import ApiCate from '../../../api/ApiCate';
import Pagination from "../../../component/paginationAdmin";
import { typeActionAdmin, reducerAdmin, checkRole } from "../../../component/methodCommon";
import ApiProduct from '../../../api/ApiProduct';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../../../redux/infoUser/actionUser';
interface CategoryProp {

}

const initalStateCatogory = {
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
const Category: React.FC<CategoryProp> = (props) => {
    const [state, dispatch] = useReducer(reducerAdmin, { ...initalStateCatogory });
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    useEffect(() => {
        (async () => {
            let savequery = { ...state.filter }
            let queryData = await ApiCate.getAll({ ...savequery });
            delete savequery._page
            delete savequery._limit
            let dataStatic = await ApiCate.getAll();
            let queryDatapart2 = await ApiCate.getAll({ ...savequery });
            let checkpagrams = Object.entries({ ...savequery }).length;

            setTimeout(() => {
                dispatch({
                    type: typeActionAdmin.getData, payload: {
                        queryData,
                        dataStatic: checkpagrams >= 1 ? queryDatapart2 : dataStatic,
                        nowPage: state.filter._page
                    }
                })
            }, 0);
        })()
        return () => {
            dispatch({ type: typeActionAdmin.unMount })
        }
    }, [state.filter])
    const chooseDelete = (e: Event | any) => {
        e.preventDefault();

        let { dataUser: { user: { role }, token } } = stateUser as any;
        if (role >= checkRole.partner) {

            state.data.forEach(async (currenValue: any) => {
                if (currenValue.check) {
                    await ApiCate.deleteOne(currenValue._id, token);
                }
            })
            dispatch({ type: typeActionAdmin.chooseDelete })

        } else {
            alert(`You can't use this function, You have to role ${checkRole.admin}!`)
        }


    }
    const deleteOne = (e: Event | any) => {
        e.preventDefault()
        return async (_id: number) => {

            let { dataUser: { user: { role }, token } } = stateUser as any;
            if (role >= checkRole.partner) {
                let getRespone = await ApiCate.deleteOne(_id, token);

                dispatch({ type: typeActionAdmin.deleteOne, payload: { _id } });
                let getProductCate = await ApiProduct.getAll({ id_cate: _id });

                if (getProductCate.length) {
                    getProductCate.forEach(async (currenValue: any) => {
                        await ApiProduct.deleteOne(currenValue._id, token);
                    })
                }

            } else {
                alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
            }


        }
    }
    const findData = (e: Event | any) => {
        let getINput = (e.target as HTMLInputElement).value;

        if (e.keyCode == 13) {
            let checkString = (getINput as string).trim().toLowerCase();
            dispatch({ type: typeActionAdmin.findName, payload: { checkString } })

        }
    }
    return (
        <>
            <div className="list_something">
                <div className="searching_element">
                    <input type="text" id="searching" onKeyUp={findData} placeholder="searching" />
                </div>
                <table id="table_parent2">
                    <thead>
                        <tr>
                            <th><input type="checkbox" className="form-check-input" checked={state.checkAll}
                                onChange={() => {
                                    dispatch({ type: typeActionAdmin.checkAll })
                                }} /> all</th>
                            <th>name</th>
                            <th>handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!(state.loading) ?
                            <tr >
                                <td></td>
                                <td style={{
                                    height: 200, display: "flex",
                                    justifyContent: "center", alignItems: "center"
                                }}><div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> </td>
                                <td ></td>
                            </tr>
                            :
                            state.data.map((currenValue: any, index: any) => (
                                <tr key={index}>
                                    <td> <input className="form-check-input" checked={currenValue.check}
                                        onChange={() => {
                                            dispatch({ type: typeActionAdmin.checkElement, payload: { idCate: currenValue._id } })
                                        }}
                                        type="checkbox" id="flexCheckDefault" /> {index}</td>
                                    <td>{currenValue.name}</td>
                                    <td style={{ textAlign: 'left' }}><NavLink to="" className="delete_element"
                                        onClick={(e) => { deleteOne(e)(currenValue._id) }}
                                    >delete</NavLink>
                                        <NavLink to={{
                                            pathname: `/admin/category/update/${currenValue.name}`,
                                            state: { dataCate: currenValue }
                                        }} className="edit_element">Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
                {(state.loading) && <Pagination dataPagination={state.pagination} dispatch={dispatch} />}
                <button type="button" onClick={chooseDelete} className="btn btn-primary">delete</button>
                <NavLink to={{ pathname: "/admin/category/add" }} className="btn btn-primary">add category</NavLink>
            </div>
        </>
    )
}

export default Category

