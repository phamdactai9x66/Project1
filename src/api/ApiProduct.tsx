import react from "react";

import { createAxios as AxiosGet, createAxiosForm } from "./Apiclient";

class apiProduct {

    getAll<T extends object>(params?: T): Promise<object[]> {
        let url = "/product";
        return AxiosGet.get(url, { params: { ...params } })
    }
    getOne<T extends number | string>(id: T): Promise<object> {
        let url = `/product/${id}`;
        return AxiosGet.get(url)
    }
    deleteOne<T extends number | string>(id: T, token: T) {
        let url = `/product/${id}/${token}`;
        return AxiosGet.delete(url)
    }
    postOne<T extends object, Y extends number | string>(object: T, token: Y) {
        let url = `/product/add/${token}`;
        return createAxiosForm.post(url, object)
    }
    putOne<T extends object, Y extends string | number>(object: T, _id: Y, token: Y) {
        let url = `/product/${_id}/update/${token}`;
        return createAxiosForm.put(url, object)
    }
}
export default new apiProduct();