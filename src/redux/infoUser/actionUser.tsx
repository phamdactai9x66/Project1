import react from "react";



export interface formmatTypeAction<T> {
    dataUser: T
}

export const typeAction = {
    dataUser: "dataUser",
    signOut: "signOut",
    editInfoUser: "editInfoUser"
}

export function ActionUser(nameType: any, params?: any) {
    return {
        type: nameType,
        payload: { ...params }
    }
}
