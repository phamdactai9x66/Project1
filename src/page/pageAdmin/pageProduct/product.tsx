import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import ApiProduct from '../../../api/ApiProduct';
import Pagination from "../../../component/paginationAdmin";
import { typeActionAdmin, reducerAdmin, formatNumber, checkRole } from "../../../component/methodCommon";
import { port } from '../../../api/Apiclient';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../../../redux/infoUser/actionUser';

interface Product {

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

const Product: React.FC<Product> = (props) => {
    const [state, dispatch] = useReducer(reducerAdmin, { ...initalStateCatogory });
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    useEffect(() => {
        (async () => {
            let savequery = { ...state.filter }
            let queryData = await ApiProduct.getAll({ ...savequery });
            delete savequery._page
            delete savequery._limit
            let dataStatic = await ApiProduct.getAll();
            let queryDatapart2 = await ApiProduct.getAll({ ...savequery });
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
            state.data.forEach(async (currenValue: any) => {
                if (currenValue.check) {
                    await ApiProduct.deleteOne(currenValue._id, token);
                }
            })
            dispatch({ type: typeActionAdmin.chooseDelete })
        } else {
            alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
        }


    }
    const findData = (e: Event | any) => {
        let getINput = (e.target as HTMLInputElement).value;

        if (e.keyCode == 13) {
            let checkString = (getINput as string).trim().toLowerCase();
            dispatch({ type: typeActionAdmin.findName, payload: { checkString } })

        }
    }
    const sortPrice = (e: Event | any) => {
        let getInput = (e.target as HTMLSelectElement).value;
        dispatch({ type: typeActionAdmin.sortPrice, payload: { valueSort: getInput } })
    }
    const deleteOne = (eventMouse: Event | any) => {
        eventMouse.preventDefault();
        eventMouse.stopPropagation()
        return async (_id: string) => {

            let { dataUser: { user: { role }, token } } = stateUser as any;
            if (role >= checkRole.partner) {
                await ApiProduct.deleteOne(_id, token)

                dispatch({ type: typeActionAdmin.deleteOne, payload: { _id } })

            } else {
                alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
            }

        }
    }
    return (
        <>
            <div className="list_something">
                <div className="searching_element">
                    <input type="text" id="searching" onKeyUp={findData} placeholder="searching" />
                    <select onChange={sortPrice}>
                        <option value="" >Default</option>
                        <option value="1" >Up Price</option>
                        <option value="2" >Down Price</option>
                    </select>
                </div>
                <table id="table_parent2">
                    <thead>
                        <tr>
                            <th><input type="checkbox" className="form-check-input" checked={state.checkAll}
                                onChange={() => {
                                    dispatch({ type: typeActionAdmin.checkAll })
                                }} /> all</th>
                            <th>name</th>
                            <th>image</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>status</th>
                            <th>handle</th>

                        </tr>
                    </thead>
                    <tbody>
                        {!(state.loading) ?
                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
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

                                    <td>{currenValue.name}</td>
                                    <td><img src={`${port}/${currenValue.image.name_file}`} style={{ width: 50, height: 50 }} alt="" /></td>
                                    <td>{currenValue.quantity}</td>
                                    <td>{formatNumber(currenValue.price)}</td>
                                    <td>{currenValue.status ? "active" : "disable"}</td>

                                    <td style={{ textAlign: 'left' }}>
                                        <NavLink to="" className="delete_element"
                                            onClick={(e) => { deleteOne(e)(currenValue._id) }}
                                        >delete</NavLink>

                                        <NavLink to={{
                                            pathname: `/admin/product/update/${currenValue.name}`,
                                            state: { dataProduct: currenValue }
                                        }} className="edit_element">Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {(state.loading) && <Pagination dataPagination={state.pagination} dispatch={dispatch} />}
                <button type="button" onClick={chooseDelete} className="btn btn-primary">delete</button>
                <NavLink to={{ pathname: "/admin/product/add" }} className="btn btn-primary">add product</NavLink>
            </div>
        </>
    )
}

export default Product
