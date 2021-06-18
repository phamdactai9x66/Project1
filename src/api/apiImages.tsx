import react from "react";

import { createAxios as AxiosGet, createAxiosForm } from "./Apiclient";

class apiImage {

    getAll<T extends object>(params?: T): Promise<object[]> {
        let url = "/image";
        return AxiosGet.get(url, { params: { ...params } })
    }
    postOne<T extends object, Y extends string>(object: T, token: Y) {
        let url = `/image/add/${token}`;
        return createAxiosForm.post(url, object)
    }
    putOne<T extends object, Y extends number | string>(object: T, _id: Y, token: Y) {
        let url = `/image/${_id}/update/${token}`;
        return createAxiosForm.put(url, object)
    }
    deleteOne<T extends number | string>(id: T, token: T) {
        let url = `/image/${id}/${token}`;
        return AxiosGet.delete(url)
    }
}
export default new apiImage();