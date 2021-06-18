import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter, Route } from "react-router-dom"
import apiProduct from "../../api/ApiProduct";
import { typeAction, ActionCart } from "../../redux/cart/actionCart";
import { port } from "../../api/Apiclient"
import { formatNumber } from "../../component/methodCommon";
import Comment from "../../component/comment";
import ApiComment from '../../api/ApiComment';
import ApiUser from '../../api/ApiUser';
import RelatedProduct from "../../component/relatedProduct";

interface DetailProduct extends RouteComponentProps {

}
const DetailProduct: React.FC<DetailProduct> = (props) => {
    const [findProduct, setfindProduct] = useState<any>({ loading: false, data: [] });
    const [commentProduct, setcommentProduct] = useState<object[]>([]);
    const refInput = useRef<any>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            })
            try {
                let getIdProduct = (props.location.state as any).idProduct;
                let getOne: any = await apiProduct.getOne<string>(getIdProduct)
                let getAll: any = await apiProduct.getAll();

                let getAllComment: any = await ApiComment.getAll({ idProduct: getIdProduct });
                let getFindUser = getAllComment.filter((currenValue: any) => (currenValue.status == 0))
                setcommentProduct([...getFindUser])
                dispatch(ActionCart(typeAction.staticProduct, { data: getAll }))
                setfindProduct({ loading: true, data: getOne })
            } catch (error) {
                props.history.goBack()
            }
        })()
        return () => {
            setfindProduct({ loading: false, data: [] })
        }
    }, [props.location.state])


    const displayStart = () => {
        let getStart = commentProduct.reduce((accumulator: any, currenValue: any) => {
            return accumulator + currenValue.rangeStart;
        }, 0)
        let save = (getStart / commentProduct.length);
        let getStars = save ? save.toFixed(1) : 0;
        let ReviewsStars = []
        if (save) {
            let countStart = Math.round(save)
            for (let index = 1; index <= countStart; index++) {
                ReviewsStars.push(<i className="far fa-star"></i>)
            }
        } else {
            for (let index = 1; index <= 5; index++) {
                ReviewsStars.push(<i style={{ color: "black" }} className="far fa-star"></i>)
            }
        }
        return {
            ReviewsStars,
            getStars,
            countComment: commentProduct.length

        }
    }

    const changeQuantity = (e: Event | any) => {
        e.preventDefault()
        let saveValueInput = (refInput as any).current.value;
        if (saveValueInput > findProduct.data.quantity) {
            (refInput as any).current.value = findProduct.data.quantity;
            return
        }
        if (saveValueInput <= 1) {
            (refInput as any).current.value = 1;
            return
        }
    }

    return (
        <>
            <section className="main-center">

                {findProduct.loading && <article>
                    <div className="image-left">
                        <img src={`${port}/${findProduct.data.image.name_file}`} id="image_origin1" alt="san ppham 12" />
                    </div>
                    <div className="content-right">
                        <div>

                            <h2>{findProduct.data.name}</h2>
                            <h3>{formatNumber(findProduct.data.price)}</h3>
                            <p style={{ margin: 0, padding: 0 }}>


                                {displayStart().ReviewsStars.map((curren, index: any) => <i key={index} className="far fa-star"></i>)}
                                <span style={{ position: "relative", top: 2 }}>  Amount Reviewers({displayStart().countComment})</span>
                            </p>
                            <p>{findProduct.data.describe}</p>
                            <form method="post">
                                <input type="number" ref={refInput} onChange={changeQuantity} id="quantity123" defaultValue={1} />

                                {findProduct.data.status == true ?
                                    <button onClick={(e) => {
                                        e.preventDefault();

                                        dispatch(ActionCart(typeAction.pustInCart, {
                                            idProduct: findProduct.data._id,
                                            newQuantity: (refInput as any).current.value
                                        }))
                                    }}
                                        disabled={!findProduct.data.status}
                                    >Add to cart</button> :
                                    <button className="buttom_to_cart" id="hello" onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                        disabled={!findProduct.data.status}>DISABLE PRODUCT</button>
                                }


                            </form>
                        </div>
                    </div>
                </article>}
            </section>
            {findProduct.loading && <Comment handleStart={displayStart} />
            }
            {findProduct.loading && <RelatedProduct idCate={findProduct.data.id_cate} />}


        </>
    )
}

export default DetailProduct
