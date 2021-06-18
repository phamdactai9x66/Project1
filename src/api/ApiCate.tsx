import react from "react";

import { createAxios as AxiosGet, createAxiosForm } from "./Apiclient";

class apiCate {

    getAll<T extends object>(params?: T): Promise<object[]> {
        let url = "/category";
        return AxiosGet.get(url, { params: { ...params } })
    }
    getOne<T extends object>(_id?: T): Promise<object> {
        let url = `/category/${_id}`;
        return AxiosGet.get(url)
    }
    deleteOne<T extends string | number>(_id: T, token: T) {
        let url = `/category/${_id}/${token}`;
        return AxiosGet.delete(url);
    }
    postOne<T extends object, Y extends string | number>(object: T, token: Y) {
        let url = `/category/add/${token}`;
        return createAxiosForm.post(url, object)
    }
    UpdateOne<T extends string | number, Y extends object>(_id: T, object: Y, token: T) {
        let url = `/category/${_id}/update/${token}`;
        return createAxiosForm.put(url, object)
    }
}
export default new apiCate();