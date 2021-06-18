
import React from 'react'
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatNitialCart } from "../redux/cart/reducerCart";
import { port } from "../api/Apiclient";
import { formatNumber } from "./methodCommon";
import { ActionCart, typeAction } from "../redux/cart/actionCart";

interface Carts {

}

const Carts: React.FC<Carts> = (props) => {
    const stateReducer = useSelector<{ carts: any }>(state => state.carts) as formatNitialCart<string>;
    const dispatch = useDispatch()

    const countProduct = (): { countProductInC: any, sumAll?: any } => {
        return {
            countProductInC: stateReducer.dataCart.reduce((accumylator: any, currenValue: any) => {
                return accumylator + currenValue.quantityCart;
            }, 0),
            sumAll: stateReducer.dataCart.reduce((accumylator: any, currenValue: any) => {
                return accumylator + (currenValue.quantityCart * currenValue.price);
            }, 0)
        }
    }
    const changeQuantity = (quantity: number, idProduct: string): void => {
        dispatch(ActionCart(typeAction.changeQuantity, { quantityP: quantity, idP: idProduct }))
    }
    return (
        <>
            <div id="count_bill"><i className="fas fa-shopping-cart" />
                <div className="count_Value">{countProduct().countProductInC}</div>
                <div className="cart">
                    <div className="name_cart">CART</div>
                    <div className="list_cart" style={{ width: "100%", minWidth: 250 }}>
                        {
                            stateReducer.dataCart.map((currenValue: any, index: any) => (
                                <div className="product_cart" key={index} >
                                    <img src={`${port}/${currenValue.image.name_file}`} alt="" />
                                    <div> <span>{currenValue.name}</span> <br />
                                        <span>{formatNumber<number>(currenValue.price)}</span> <br />
                                        <button onClick={() => {
                                            dispatch(ActionCart(typeAction.deleteOne, { idP: currenValue._id }))
                                        }}>remove</button>
                                    </div>
                                    <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                                        <div> <span onClick={() => {
                                            changeQuantity(currenValue.quantityCart + 1, currenValue._id)
                                        }}><i className="fas fa-angle-up" /></span> <br />
                                            <span style={{ paddingLeft: '2.5px' }}>{currenValue.quantityCart}</span> <br />
                                            <span onClick={() => {
                                                changeQuantity(currenValue.quantityCart - 1, currenValue._id)
                                            }}>
                                                <i className="fas fa-angle-down" /></span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="total" style={{ textAlign: 'center', margin: 0 }}>
                        <div><span>your total:</span> <span id="total_price">{formatNumber(countProduct().sumAll)}</span> </div>
                        {/* <button class="clear_cart">clear cart</button> */}
                        <NavLink to="/#/detail_cart">detail cart</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carts
