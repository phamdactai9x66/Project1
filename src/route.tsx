import react from "react";
import { Route } from "react-router-dom";

import Home from "./page/pageClient/home";
import detailCarts from "./page/pageClient/detailCarts";
import detailProduct from "./page/pageClient/detailProduct";
import notFoundPageClient from "./page/pageClient/notFound";

import Profile from "./page/pageClient/editProfile";
import SignUp from "./page/pageClient/signUp";
import SignIn from "./page/pageClient/signIn";
import FindProduct from "./page/pageClient/findProduct";

import AdminHome from "./page/pageAdmin/home";


import Product from "./page/pageAdmin/pageProduct/product";
import ProductAdd from "./page/pageAdmin/pageProduct/productAdd";
import ProductUpdate from "./page/pageAdmin/pageProduct/productUpdate";

import Comment from "./page/pageAdmin/comment";
import CommentDetail from "./page/pageAdmin/detailComment";

import ManagerAccount from "./page/pageAdmin/managerAccount";

import Category from "./page/pageAdmin/pageCate/category";
import CategoryAdd from "./page/pageAdmin/pageCate/categoryAdd";
import CategoryUpdate from "./page/pageAdmin/pageCate/categoryUpdate";
import notFoundPage from "./page/pageAdmin/notFound";

const adminSide = [
    {
        path: "/admin",
        exact: true,
        component: AdminHome
    }, {
        path: "/admin/comment/detail/:nameProduct",
        exact: false,
        component: CommentDetail
    }, {
        path: "/admin/comment",
        exact: false,
        component: Comment
    },
    {
        path: "/admin/product/add",
        exact: false,
        component: ProductAdd
    }, {
        path: "/admin/product/update/:nameCate",
        exact: false,
        component: ProductUpdate
    },
    {
        path: "/admin/product",
        exact: false,
        component: Product
    },
    {
        path: "/admin/category/add",
        exact: false,
        component: CategoryAdd
    },
    {
        path: "/admin/category/update/:nameCate",
        exact: false,
        component: CategoryUpdate
    },
    {
        path: "/admin/category",
        exact: false,
        component: Category
    },

    {
        path: "/admin/:error",
        exact: false,
        component: notFoundPage
    }
]
const clientSide = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/findProduct/:nameProduct",
        exact: false,
        component: FindProduct
    }
    ,
    {
        path: "/EditProfile/:idUser",
        exact: false,
        component: Profile
    }
    , {
        path: "/SignUp",
        exact: false,
        component: SignUp
    },
    {
        path: "/SignIn",
        exact: false,
        component: SignIn
    }
    ,
    {
        path: "/detailCarts",
        exact: false,
        component: detailCarts
    },
    {
        path: "/detailProduct/:nameProduct",
        exact: false,
        component: detailProduct
    }
    ,
    {
        path: "/:error",
        exact: false,
        component: notFoundPageClient
    }

]
function creactRoute<T extends object[]>(listPage: T) {
    if (listPage.length <= 0) return null;

    return listPage.map((currenPage: any, index) => (
        <Route
            key={index}
            path={currenPage.path}
            exact={currenPage.exact}
            component={currenPage.component}>
        </Route>
    ))
}
export { adminSide, clientSide, creactRoute }