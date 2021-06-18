import React from 'react'
import { typeActionAdmin } from "../component/methodCommon";
interface PaginationAdmin {
    dataPagination: any,
    dispatch: any
}
const PaginationAdmin: React.FC<PaginationAdmin> = ({ dataPagination, dispatch }) => {
    let { _page, countRows, _limit } = dataPagination;
    let maxPage = Math.ceil(countRows / _limit)
    const displayList = () => {
        let saveArray = [];
        for (let index = 1; index <= maxPage; index++) {
            saveArray.push(index)
        }
        return saveArray.map((curren: any, index: any) => (
            <li className="page-item" key={index}>
                <button className="page-link"
                    onClick={(e) => { movePage(e)(curren) }}>{curren}</button></li>
        ))
    }
    const movePage = (e: Event | any) => {
        e.preventDefault();
        return (page_now: number) => {
            dispatch({ type: typeActionAdmin.movePage, payload: { newPage: page_now } })
        }
    }
    return (
        <div style={{ marginTop: 10, display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" disabled={_page <= 1}
                            onClick={(e) => { movePage(e)(_page - 1) }}
                        >Previous</button></li>
                    {displayList()}
                    <li className="page-item">
                        <button className="page-link" disabled={_page >= maxPage}
                            onClick={(e) => { movePage(e)(_page + 1) }}
                        >Next</button>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default PaginationAdmin
