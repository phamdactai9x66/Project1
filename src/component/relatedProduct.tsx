import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { port } from '../api/Apiclient';
import ApiProduct from '../api/ApiProduct';
import { formatNumber } from './methodCommon';
import { RouteComponentProps, withRouter } from "react-router-dom"
interface RelatedProduct extends RouteComponentProps {
    idCate: any

}

const RelatedProduct: React.FC<RelatedProduct> = ({ idCate, history }) => {
    const [ProductRelated, setProductRelated] = useState<any>({ loading: false, data: [] });
    useEffect(() => {
        (async () => {

            let relatedProduct = await ApiProduct.getAll({ id_cate: idCate });
            setProductRelated({ loading: true, data: relatedProduct });
            let saveProduct = 3
            if (relatedProduct.length == 2) {
                saveProduct = 2
            } else if (relatedProduct.length == 1) {
                saveProduct = 1
            }

            ($(document) as any).ready(() => {
                ($('#test123') as any).slick({
                    infinite: true,
                    slidesToShow: saveProduct,
                    slidesToScroll: saveProduct
                });
                let getbuttonm = document.querySelector(".slick-prev"),
                    getButonNext = document.querySelector(".slick-next");
                if (getbuttonm && getButonNext) {
                    (document.querySelector(".slick-prev") as any).innerHTML = '<i class="fas fa-angle-left" style=" font-size: 2rem;"></i>';
                    (document.querySelector(".slick-next") as any).innerHTML = '<i class="fas fa-angle-right" style=" font-size: 2rem;"></i>';
                }

            })

        })()
        return () => {
            setProductRelated({ loading: false, data: [] })
        }
    }, [])
    return (
        <section className="related_product">
            <h1 style={{ textAlign: 'center', padding: '5px 0' }}>RELATED PRODUCTS</h1>
            <ul className="grid-bottom" id="test123" style={{ padding: 0 }}>
                {ProductRelated.data.length &&
                    ProductRelated.data.map((currenValue: any, index: any) => {
                        return (
                            <li key={index}>
                                <NavLink to={{
                                    pathname: `/detailProduct/${currenValue.name}`,
                                    state: {
                                        idProduct: currenValue._id
                                    }
                                }} >
                                    <img src={`${port}/${currenValue.image.name_file}`} alt="" />
                                    <h2>{currenValue.name}</h2>
                                    <p>{formatNumber(currenValue.price)}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }

            </ul>
        </section>
    )
}

export default withRouter(RelatedProduct)
