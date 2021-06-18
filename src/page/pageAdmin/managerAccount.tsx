import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import ApiProduct from '../../api/ApiProduct';
import Pagination from "../../component/paginationAdmin";
import { typeActionAdmin, reducerAdmin, formatNumber, checkRole } from "../../component/methodCommon";
import { port } from '../../api/Apiclient';
import { useSelector } from 'react-redux';
import { formmatTypeAction } from '../../redux/infoUser/actionUser';
import { initalStateCatogory } from './pageProduct/product';
import ApiUser from '../../api/ApiUser';
import { string } from 'yup/lib/locale';


interface ManagerAccount {

}

const ManagerAccount: React.FC<ManagerAccount> = (props) => {
    const [state, dispatch] = useReducer(reducerAdmin, { ...initalStateCatogory });
    const stateUser = useSelector<{ users: any }>(state => state.users) as formmatTypeAction<string>
    useEffect(() => {
        (async () => {
            let savequery = { ...state.filter }
            let queryData = await ApiUser.getAll({ ...savequery });
            delete savequery._page
            delete savequery._limit
            let dataStatic = await ApiUser.getAll();
            let queryDatapart2 = await ApiUser.getAll({ ...savequery });
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

    function combineName<T extends string>(firstName: T, lastName: T): string {
        if (firstName == null || lastName == null) return "";
        return `${firstName} ${lastName}`

    }
    const chooseDelete = (e: Event | any) => {
        e.preventDefault();
        let { dataUser: { user: { role }, token } } = stateUser as any;

        if (role >= checkRole.admin) {
            state.data.forEach(async (currenValue: any) => {
                if (currenValue.check) {
                    await ApiUser.deleteOne(currenValue._id, token);
                }
            })
            dispatch({ type: typeActionAdmin.chooseDelete })
        } else {
            alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
        }


    }
    const deleteOne = (eventMouse: Event | any) => {
        eventMouse.preventDefault();
        eventMouse.stopPropagation()
        return async (_id: string) => {

            let { dataUser: { user: { role }, token } } = stateUser as any;
            if (role >= checkRole.admin) {
                await ApiProduct.deleteOne(_id, token)

                dispatch({ type: typeActionAdmin.deleteOne, payload: { _id } })

            } else {
                alert(`You can't use this functional, You have to role ${checkRole.admin}!`)
            }

        }
    }
    const findData = (e: Event | any) => {
        let getINput = (e.target as HTMLInputElement).value;

        if (e.keyCode == 13) {
            let checkString = (getINput as string).trim().toLowerCase();
            dispatch({ type: typeActionAdmin.findName, payload: { checkString: "", findNameU: checkString } })
        }
    }
    const changeNameRole = (Role: string) => {
        if (Role == null) return "";

        if (Role == "0") return "Members";
        if (Role == "1") return "Partner";
        if (Role == "2") return "Admin";
    }
    return (
        <div className="list_something">
            <div className="searching_element">
                <input type="text" id="searching" placeholder="searching" onKeyUp={findData} />
                <select onChange={(e) => {
                    dispatch({ type: typeActionAdmin.filterRole, payload: { role: e.target.value } })
                }}>
                    <option value="" >All</option>
                    <option value={0} >Member</option>
                    <option value={1} >Partner</option>
                    <option value={2} >Admin</option>
                </select>
            </div>
            <table id="table_parent2">
                <thead>
                    <tr>
                        <th><input type="checkbox" className="form-check-input"
                            checked={state.checkAll}
                            onChange={(() => {
                                dispatch({ type: typeActionAdmin.checkAll })
                            })}
                        /> all</th>
                        <th>Image</th>
                        <th>name</th>
                        <th>role</th>
                        <th>handle</th>

                    </tr>
                </thead>
                <tbody>
                    {!(state.loading) ?
                        <tr >
                            <td></td>
                            <td></td>

                            <td style={{
                                height: 200, display: "flex",
                                justifyContent: "center", alignItems: "center"
                            }}><div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> </td>
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
                                <td><img src={`${currenValue.avatar}`} style={{ width: 50, height: 50 }} alt="" /></td>
                                <td>{combineName<string>(currenValue.first_name, currenValue.last_name)}</td>
                                <td>{changeNameRole(currenValue.role)}</td>
                                <td style={{ textAlign: 'left' }}>
                                    <NavLink to="" className="delete_element"
                                        onClick={(e) => { deleteOne(e)(currenValue._id) }}
                                    >delete</NavLink>

                                    <NavLink to={{
                                        pathname: `/admin/ManagerAccount/update/${combineName<string>(currenValue.first_name, currenValue.last_name)}`,
                                        state: { dataUserUpdate: currenValue }
                                    }} className="edit_element">Edit</NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {(state.loading) && <Pagination dataPagination={state.pagination} dispatch={dispatch} />}
            <button type="button" onClick={chooseDelete} className="btn btn-primary">delete</button>
            <NavLink to={{ pathname: "/admin/ManagerAccount/add" }} className="btn btn-primary">add User</NavLink>

        </div>
    )
}

export default ManagerAccount
