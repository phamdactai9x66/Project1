import react from "react";



export interface formmatTypeAction<T> {
    getCart: T,
    staticProduct: T
}

export const typeAction = {
    pustInCart: "pustInCart",
    staticProduct: "staticProduct",
    changeQuantity: "changeQuantity",
    deleteOne: "deleteOne"
}

export function ActionCart(nameType: any, params?: any) {
    return {
        type: nameType,
        payload: { ...params }
    }
}

