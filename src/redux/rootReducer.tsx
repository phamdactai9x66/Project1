import react from "react";
import { combineReducers } from "redux";
import { reducerCar } from "./cart/reducerCart";
import { reducerUser } from "./infoUser/reducerUser";
const combiner = combineReducers({
    carts: reducerCar,
    users: reducerUser
})
export default combiner