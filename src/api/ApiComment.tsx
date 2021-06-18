import react from "react";

import { createAxios as AxiosGet, createAxiosForm } from "./Apiclient";

class apiComment {

    getAll<T extends object>(params?: T): Promise<object[]> {
        let url = "/comment";
        return AxiosGet.get(url, { params: { ...params } })
    }
    getOne<T extends number | string>(id: T): Promise<object> {
        let url = `/comment/${id}`;
        return AxiosGet.get(url)
    }
    deleteOne<T extends number | string>(id: T, token: T): Promise<object> {
        let url = `/comment/${id}/${token}`;
        return AxiosGet.delete(url)
    }
    creactOne<T extends string>(formData: FormData, token: T): Promise<object> {
        let url = `/comment/add/${token}`;
        return createAxiosForm.post(url, formData)
    }
    updateOne<Y extends string>(formData: object, _id: Y, token: Y): Promise<object> {
        let url = `/comment/${_id}/update/${token}`;
        return createAxiosForm.put(url, formData)
    }
}
export default new apiComment();