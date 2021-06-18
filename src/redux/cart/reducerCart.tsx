import react from "react";
import { typeAction } from "./actionCart";

let getCartLocal = JSON.parse(localStorage.getItem("cart") as any)
///getCartLocal ? [...getCartLocal] : []

export interface formatNitialCart<T> {
    dataCart: any,
    dataStatic: any
}
const nitialCart: formatNitialCart<string> = {
    dataCart: getCartLocal ? getCartLocal : [],
    dataStatic: []
}

export function reducerCar(state = nitialCart, action: { type: any, payload: any }) {
    switch (action.type) {
        case typeAction.staticProduct: {
            let { data } = action.payload;
            return {
                ...state,
                dataStatic: data
            }
        }
        case typeAction.pustInCart: {
            let { idProduct, newQuantity } = action.payload;
            let checkExProduct = state.dataCart.find((currenValue: any) => (currenValue._id == idProduct))

            let saveCart: any = []

            if (idProduct.length <= 0) return state

            if (checkExProduct) {
                let filterOut = state.dataCart.map((currenValue: any) => {
                    if (currenValue._id == idProduct && currenValue.quantity > currenValue.quantityCart) {
                        if (newQuantity && currenValue.quantity > currenValue.quantityCart) {
                            return { ...currenValue, quantityCart: parseInt(currenValue.quantityCart) + parseInt(newQuantity) }
                        }
                        return { ...currenValue, quantityCart: currenValue.quantityCart + 1 }
                    }
                    return currenValue
                })
                saveCart = [...filterOut]
            } else {
                let findProduct = state.dataStatic.find((currenValue: any) => (currenValue._id == idProduct))

                saveCart = newQuantity ? [...state.dataCart, { ...findProduct, quantityCart: parseInt(newQuantity) }] :
                    [...state.dataCart, { ...findProduct, quantityCart: 1 }]


            }

            localStorage.setItem("cart", JSON.stringify([...saveCart]))
            return {
                ...state,
                dataCart: [...saveCart]
            };

        }
        case typeAction.changeQuantity: {
            let { dataCart } = state;
            let { quantityP, idP } = action.payload;
            let changePrice = dataCart.map((currenValue: any) => {
                if (currenValue._id == idP) {
                    if (quantityP > currenValue.quantity) {
                        return currenValue;
                    }
                    if (quantityP <= 1) {
                        return { ...currenValue, quantityCart: 1 }
                    }
                    return { ...currenValue, quantityCart: quantityP }
                }
                return currenValue;
            })
            localStorage.setItem("cart", JSON.stringify([...changePrice]))
            return {
                ...state,
                dataCart: changePrice
            }
        }
        case typeAction.deleteOne: {
            let { idP } = action.payload;
            let { dataCart } = state;
            let filter = dataCart.filter((currenValue: any) => (currenValue._id != idP));
            localStorage.setItem("cart", JSON.stringify([...filter]))
            return {
                ...state,
                dataCart: filter
            }
        }
        default: {
            return state
        }

    }
}