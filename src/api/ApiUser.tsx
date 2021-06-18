import react from "react";

import { createAxios as AxiosGet, createAxiosForm } from "./Apiclient";

class apiUser {

    getAll<T extends object>(params?: T): Promise<object[]> {
        let url = "/user";
        return AxiosGet.get(url, { params: { ...params } })
    }
    getOne<T extends number | string>(id: T): Promise<object> {
        let url = `/user/${id}`;
        return AxiosGet.get(url)
    }
    deleteOne<T extends number | string>(id: T, token: T): Promise<object> {
        let url = `/user/${id}/${token}`;
        return AxiosGet.delete(url)
    }
    postOne<T extends object>(object: T) {
        let url = `/user/sign_up`;
        return createAxiosForm.post(url, object)
    }
    postOneAdmin<T extends object, Y extends string>(object: T, token: Y) {
        let url = `/user/sign_upAdmin/${token}`;
        return createAxiosForm.post(url, object)
    }
    signIn<T extends object>(object: T) {
        let url = `/user/sign_in`;
        return createAxiosForm.post(url, object)
    }
    editProfile<T extends FormData, Y extends string>(data: T, token: Y): Promise<any> {
        let url = `/user/Account/${token}`;
        return createAxiosForm.put(url, data)
    }
    editUser<T extends FormData, Y extends string>(data: T, idUser: Y, token: Y): Promise<any> {
        let url = `/user/Account/UpdateByAdmin/${idUser}/${token}`;
        return createAxiosForm.put(url, data)
    }
}
export default new apiUser();