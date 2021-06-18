import React, { useState, useEffect, useReducer } from 'react'
import ApiProduct from "../../api/ApiProduct";
import ListProduct from "../../component/listProduct";
import NavCate from "../../component/listCate";
import Pagination from "../../component/pagination";
import { reducer, typeState } from "../../component/methodCommon"
import { useSelector, useDispatch } from "react-redux"
import { typeAction as typeActionCart, ActionCart } from "../../redux/cart/actionCart"
import ApiComment from '../../api/ApiComment';
import { formatNitialUser } from '../../redux/infoUser/reducerUser';
import { NavLink } from 'react-router-dom';
import { authenticate, checkAuth } from '../../auth';
interface HomeProp {

}

export const typeAction = {
    getData: "getData",
    removeData: "removeData",
    navigationPage: "navigationPage",
    relatedProduct: "relatedProduct",
    sortPrice: "sortPrice",
    rangePrice: "rangePrice"
}
const initialState = {
    loading: false,
    queryproduct: "",
    data: [],
    staticData: [],
    paginaiton: {
        _limit: 6,
        _page: 1,
        countRows: 0
    },
    filter: {
        _limit: 6,
        _page: 1
    }
}


const Home: React.FC<HomeProp> = (props) => {
    const { welcomeUser, dataUser: { user } } = useSelector<{ users: any }>(state => state.users) as formatNitialUser<string>
    const [state, dispatch] = useReducer<React.Reducer<typeState, any>>(reducer, { ...initialState }, undefined)
    const [rangePrice, setrangePrice] = useState({ minPrice: 0, maxPrice: 0 })
    const dispatchCart = useDispatch()

    useEffect(() => {
        (async () => {
            let save1 = { ...state.filter }

            let getProducts = await ApiProduct.getAll({ ...save1 });

            let saveAgainProduct = getProducts.map(async (currenValue: any) => {
                let findCommentProduct = await ApiComment.getAll({ idProduct: currenValue._id });
                return { ...currenValue, dataComment: findCommentProduct }
            })
            let save2 = await Promise.all([...saveAgainProduct])
            delete (save1 as any)._limit
            delete (save1 as any)._page;


            let queryStatic = await ApiProduct.getAll({ ...save1 });

            let getStatic = await ApiProduct.getAll();
            let saveidCate = Object.entries(save1).length;
            dispatchCart(ActionCart(typeActionCart.staticProduct, { data: getStatic }))
            setTimeout(() => {
               
                dispatch({
                    type: typeAction.getData,
                    payload: {
                        data: save2,
                        staticProduct: saveidCate >= 1 ? queryStatic : getStatic,
                        staticData: getStatic,
                        nowPage: state.filter._page
                    }
                })
            }, 1000);
        })()
        return () => {
            dispatch({ type: typeAction.removeData })
        }
    }, [state.filter])
    return (
        <>
            {welcomeUser &&
                <NavLink className="NotificationUser" to={{
                    pathname: `/EditProfile/${user._id}?nameUser=${user.first_name + " " + user.last_name}`,
                    state: { idUser: user._id }
                }} >Go in your profile</NavLink>
            }
            <div>
                <div className="heade-main">
                    <h1>
                        shop
                    </h1>
                    <NavCate dispatch={dispatch} state={state} />
                </div>
                <div>
                    <div className="flex-mindle" style={{ padding: '10px 0' }}>
                        <div>
                            <input type="number" min={0} value={rangePrice.minPrice} onChange={(e) => {

                                setrangePrice({ ...rangePrice, minPrice: (e.target as any).value })
                            }} placeholder="0" />-
                            <input type="number" min={0} value={rangePrice.maxPrice} onChange={(e) => {

                                setrangePrice({ ...rangePrice, maxPrice: (e.target as any).value })
                            }} placeholder="0" />
                            <button style={{ border: "1px solid black", height: 28, marginLeft: 5, padding: "0 5px" }}
                                onClick={() => { dispatch({ type: typeAction.rangePrice, payload: { theRangePrice: rangePrice } }) }}
                            >Apply</button>
                        </div>
                        <p>result_searching <label id="result_searching">...</label> </p>

                        <p>
                            <select className="form-select" id="count_product" onChange={(e) => {

                                dispatch({ type: typeAction.sortPrice, payload: { valueSort: e.target.value } })
                            }} style={
                                { width: "auto", marginLeft: "auto" }}>
                                <option value={0}>Default Sort Price</option>
                                <option value={1}>Up Price</option>
                                <option value={2}>Down Price</option>
                            </select>
                        </p>
                    </div>
                </div>
                <ul className="grid-bottom" style={{ padding: 0 }}>
                    {state.loading ? <ListProduct dataProduct={state.data} /> :
                        <div style={{ gridColumn: 2, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}

                </ul>

                <Pagination state={state} dispatch={dispatch} />


                <p style={{ textAlign: "right" }}>Showing all <label id="count_product">{state.data.length}</label> results</p>
            </div>
        </>
    )
}

export default Home

