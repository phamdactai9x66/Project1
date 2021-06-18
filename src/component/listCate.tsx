import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter, Route, NavLink } from "react-router-dom"
import ApiCate from "../api/ApiCate";
import { typeAction } from "../page/pageClient/home"
interface ListCate extends RouteComponentProps {
    dispatch: any,
    state: any
}

const ListCate: React.FC<ListCate> = ({ dispatch, state, location }) => {
    const [getCate, setgetCate] = useState<any>({ loading: false, data: [] });
    useEffect(() => {

        (async () => {
            let getCate = await ApiCate.getAll();
            console.log(getCate);
            setgetCate({ loading: true, data: [...getCate] })
        })()
        return () => {
            setgetCate({ ...getCate, loading: false })
        }
    }, [])
    const filterProduct = (idCate: any) => {


        dispatch({ type: typeAction.relatedProduct, payload: { idCate: idCate, previosState: state } })

    }
    return (
        <nav className="find_cate">
            <li className="cate" ><NavLink to="" onClick={(e) => { e.preventDefault(); filterProduct("all") }} >all</NavLink></li>
            {getCate.loading &&
                getCate.data.map((currenValue: any, index: any) => (
                    <li className="cate" key={index}><NavLink to="" onClick={(e) => { e.preventDefault(); filterProduct(currenValue._id) }} >{currenValue.name}</NavLink></li>
                ))
            }
        </nav>
    )
}

export default withRouter(ListCate)
