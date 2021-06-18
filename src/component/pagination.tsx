import React from 'react'
import { typeAction } from "../page/pageClient/home"
interface pagination {
    state?: any;
    dispatch?: any
}

const pagination: React.FC<pagination> = ({ state, dispatch }) => {

    let { _limit, _page, countRows } = state.paginaiton;

    const countPage = Math.ceil(countRows / _limit)
    let savePage: number[] = [];
    for (let index = 1; index <= countPage; index += 1) {
        savePage = [...savePage, index]
    }
    const movePage = (currenValue: any) => {
        return (e: Event | any) => {
            e.preventDefault();
            dispatch({ type: typeAction.navigationPage, payload: { _page: currenValue } })
        }
    }
    return (
        <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "center" }}>
            <ul className="pagination">
                <li className="page-item"><button className="page-link" disabled={_page <= 1} style={{ color: "black" }}
                    onClick={() => {
                        dispatch({ type: typeAction.navigationPage, payload: { _page: _page - 1 } })
                    }} >Previous</button></li>
                {
                    savePage.map((currenValue) => (
                        <li className="page-item" key={currenValue}><button className="page-link"
                            onClick={movePage(currenValue)}
                            style={{ color: "black" }} disabled={currenValue == _page} >{currenValue}</button></li>
                    ))
                }
                <li className="page-item"><button className="page-link" disabled={_page >= countPage} style={{ color: "black" }}
                    onClick={() => {
                        dispatch({ type: typeAction.navigationPage, payload: { _page: _page + 1 } })
                    }} >Next</button></li>
            </ul>
        </nav>
    )
}

export default pagination
