import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatNitialCart } from "../../redux/cart/reducerCart";
import { port } from "../../api/Apiclient";
import { formatNumber } from "../../component/methodCommon";
import { ActionCart, typeAction } from "../../redux/cart/actionCart";
interface detailCarts {

}

const DetailCarts: React.FC<detailCarts> = (props) => {
    const stateCart = useSelector<{ carts: any }>(state => state.carts) as formatNitialCart<string>;

    const dispatch = useDispatch();
    const sumall = (): number => {
        return stateCart.dataCart.reduce((accumylator: any, currenValue: any) => {
            return accumylator + (currenValue.quantityCart * currenValue.price);
        }, 0)
    }
    const deleteProduct = (idProduct: string) => {
        dispatch(ActionCart(typeAction.deleteOne, { idP: idProduct }))
    }
    const changeQuantity = (quantity: number, idProduct: string): void => {
        dispatch(ActionCart(typeAction.changeQuantity, { quantityP: quantity, idP: idProduct }))
    }
    return (
        <>
            <section className="main-center">
                <div className="list_detail_bill" style={{ marginTop: '50px' }}>
                    <form method="post">
                        <table>
                            <thead>
                                <tr>
                                    <th />
                                    <th />
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>SUM</th>
                                </tr>
                            </thead>
                            <tbody className="display_list_product_in_cart">
                                {stateCart.dataCart.map((currenValue: any, index: any) => {
                                    let sum = currenValue.price * currenValue.quantityCart
                                    return (
                                        <tr key={index}>
                                            <td className="delete_product3" onClick={() => { deleteProduct(currenValue._id) }} ><i className="fas fa-times" ></i></td>
                                            <td><img src={`${port}/${currenValue.image.name_file}`} alt="" /></td>
                                            <td><label>{currenValue.name}</label></td>
                                            <td>{formatNumber<number>(currenValue.price)}</td>
                                            <td>
                                                <span style={{ cursor: "pointer" }} onClick={() => {

                                                    changeQuantity(currenValue.quantityCart - 1, currenValue._id)

                                                }}><i className="fas fa-angle-left" /></span>
                                                <span style={{ margin: "0 10px" }}>{currenValue.quantityCart}</span>
                                                <span style={{ cursor: "pointer" }} onClick={() => {

                                                    changeQuantity(currenValue.quantityCart + 1, currenValue._id)

                                                }}><i className="fas fa-angle-right" /></span>
                                            </td>
                                            <td className="sum_price">{formatNumber<number>(sum)}</td>

                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </form>
                    <div className="buy_now">
                        <h1>CART TOTALS</h1>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody><tr>
                                <td>Subtotal</td>
                                <td className="total_price3">${formatNumber<number>(sumall())}</td>
                            </tr>
                                <tr style={{ borderBottom: '1px solid black' }}>
                                    <td>Code Discount:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td className="total_price2">${formatNumber<number>(sumall())}</td>
                                </tr>
                            </tbody></table>
                        <NavLink to="/#/check_out">proceed to checkout</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DetailCarts
