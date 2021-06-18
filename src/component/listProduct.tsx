import React from 'react'
import { formatNumber } from "../component/methodCommon";
import { port } from "../api/Apiclient"
import { useSelector, useDispatch } from "react-redux"
import { typeAction, ActionCart } from "../redux/cart/actionCart"
import { NavLink } from "react-router-dom"
interface ListProduct {
    dataProduct: any
}

const ListProduct: React.FC<ListProduct> = ({ dataProduct }) => {
    const acitonCart = useDispatch()
    const displayStart = (dataProduct: any) => {
        let handleComment = dataProduct.filter((currenValue: any) => (currenValue.status == 0));

        let getStart = handleComment.reduce((accumulator: any, currenValue: any) => {
            return accumulator + currenValue.rangeStart;
        }, 0)
        let save = (getStart / handleComment.length);
        let getStars = save ? save.toFixed(1) : 0;
        let ReviewsStars = []

        if (save) {
            let countStart = Math.round(save)
            for (let index = 1; index <= countStart; index++) {
                ReviewsStars.push(<i key={index} style={{ color: "black" }} className="far fa-star"></i>)
            }
        } else {
            for (let index = 1; index <= 5; index++) {
                ReviewsStars.push(<i key={index} style={{ color: "black" }} className="far fa-star"></i>)
            }
        }
        return {
            ReviewsStars,
            getStars,
            countComment: handleComment.length

        }
    }
    return (
        <>
            {dataProduct.length >= 1 &&
                dataProduct.map((currenValue: any, index: any) => {
                    return (
                        <li key={index}>
                            <NavLink to={{
                                pathname: `/detailProduct/${currenValue.name}`,
                                state: { idProduct: currenValue._id }
                            }}>
                                <img src={port + "/" + currenValue.image.name_file} alt="" />
                                <h2>{currenValue.name}</h2>
                                <p> {displayStart(currenValue.dataComment).ReviewsStars.map((currenValue, index) => currenValue)}
                                    <label >(<span style={{ position: "relative", top: 2 }}>
                                        {displayStart(currenValue.dataComment).countComment}
                                    </span>)</label> </p>
                                <p><label >{formatNumber<number>(currenValue.price)}</label>
                                </p>
                            </NavLink>

                            {currenValue.status == true ?
                                <button className="buttom_to_cart" id="hello" onClick={(e) => {
                                    e.preventDefault();
                                    acitonCart(ActionCart(typeAction.pustInCart, { idProduct: currenValue._id }))
                                }}>ADD TO CART</button> :

                                <button className="buttom_to_cart" id="hello" onClick={(e) => {
                                    e.preventDefault();
                                }}
                                    disabled={!currenValue.status}>DISABLE PRODUCT</button>
                            }

                        </li>
                    )
                })

            }
        </>

    )
}

export default ListProduct
