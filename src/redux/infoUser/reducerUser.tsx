import react from "react";
import { authenticate, checkAuth } from "../../auth";
import { typeAction } from "./actionUser";


export interface formatNitialUser<T> {
    dataUser: any,
    welcomeUser: any
}
const nitialUser: formatNitialUser<string> = {
    dataUser: checkAuth() ? checkAuth() : false,
    welcomeUser: false
}


export function reducerUser(intialUser = nitialUser, action: { type: any, payload: any }) {
    switch (action.type) {
        case typeAction.dataUser: {
            let { dataUser } = action.payload;
            return { ...intialUser, dataUser, welcomeUser: true }
        }
        case typeAction.signOut: {
            localStorage.removeItem("Jsx")
            return { welcomeUser: false, dataUser: false };
        }
        case typeAction.editInfoUser: {
            let { newUser } = action.payload;

            authenticate({
                user: { ...newUser.data },
                token: newUser.token
            }, () => { })


            return {
                ...intialUser,
                dataUser: {
                    user: { ...newUser.data },
                    token: newUser.token
                }
            }

        }
        default: {
            return intialUser
        }
    }

}