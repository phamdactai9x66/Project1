import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import ApiProduct from '../../api/ApiProduct';
import Pagination from "../../component/paginationAdmin";
import { typeActionAdmin, reducerAdmin, formatNumber } from "../../component/methodCommon";
import { port } from '../../api/Apiclient';
import ApiComment from '../../api/ApiComment';

interface Comment {

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

const Comment: React.FC<Comment> = (props) => {
    const [state, dispatch] = useReducer(reducerAdmin, { ...initalStateCatogory });
    useEffect(() => {
        (async () => {
            let savequery = { ...state.filter }
            let queryData = await ApiProduct.getAll({ ...savequery });
            let queryData2 = queryData.map(async (currenValue: any) => {
                let findComment = await ApiComment.getAll({ idProduct: currenValue._id });
                let countReviewer = findComment.length;
                let countStart = findComment.reduce((accumolator: any, currenValue2: any) => accumolator + currenValue2.rangeStart, 0);
                let checkQuantity = (countStart / countReviewer);
                return { ...currenValue, countReviewer, averageReview: checkQuantity ? checkQuantity : 0 };
            })
            let savequery3 = await Promise.all([...queryData2])
            delete savequery._page
            delete savequery._limit
            let dataStatic = await ApiProduct.getAll();
            let queryDatapart2 = await ApiProduct.getAll({ ...savequery });
            let checkpagrams = Object.entries({ ...savequery }).length;

            setTimeout(() => {
                dispatch({
                    type: typeActionAdmin.getData, payload: {
                        queryData: savequery3,
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
                            <th>#</th>
                            <th>name</th>
                            <th>image</th>
                            <th>reviewer</th>
                            <th>average review</th>

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
                                <td ></td>
                            </tr> :
                            state.data.map((currenValue: any, index: any) => (
                                <tr key={index}>
                                    <td>{index}</td>

                                    <td>{currenValue.name}</td>
                                    <td><img src={`${port}/${currenValue.image.name_file}`} style={{ width: 50, height: 50 }} alt="" /></td>
                                    <td>{currenValue.countReviewer}</td>
                                    <td>{(currenValue.averageReview as number).toFixed(2)}</td>
                                    <td style={{ textAlign: 'left' }}>
                                        <NavLink to={{
                                            pathname: `/admin/comment/detail/${currenValue.name}`,
                                            state: { idProduct: currenValue._id }
                                        }} className="edit_element">Edit</NavLink>
                                    </td>


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {(state.loading) && <Pagination dataPagination={state.pagination} dispatch={dispatch} />}

                <NavLink to={{ pathname: "/admin/product/add" }} className="btn btn-primary">add product</NavLink>
            </div>
        </>
    )
}

export default Comment
