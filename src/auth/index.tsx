import react from "react";

const authenticate = (data: any, next?: any) => {
    if (typeof window !== "undefined") {

        try {
            let encode = btoa(JSON.stringify(data))
            console.log(encode);
            localStorage.setItem("Jsx", btoa(JSON.stringify(data)));
            next()
        } catch (error) {
            console.log(error)
        }
    }

}
const checkAuth = () => {
    // debugger
    if (!(typeof window !== "undefined")) return false;
    if (localStorage.getItem("Jsx")) {
        return JSON.parse(atob(localStorage.getItem("Jsx") as any))
    }
    return false
}

export { authenticate, checkAuth };

