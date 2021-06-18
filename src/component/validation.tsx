import react from "react"
import * as yup from "yup"

const VLDSignIn = yup.object().shape({
    userName: yup.string().trim().required("You must provide value."),
    passWord: yup.string().trim().required("You must provide value."),
})
export interface AddCate<T> {
    name: T,
    quantity: number,
    price: number,
    image: T,
    id_cate: T,
    status: boolean,
    describe: T,
}
const VLdEditProfile = yup.object().shape({
    first_name: yup.string().trim().required("You must provide value.")
        .min(2, "the value provide must longer 2"),
    last_name: yup.string().trim().required("You must provide value.")
        .min(2, "the value provide must longer 2"),
    address: yup.string().trim().required("You must provide value."),

    image: yup.mixed().test("checkTypeImage", "We only allow type image", (value) => {
        let image = [...value];
        let checkExtension = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
        if (image.length >= 1) {
            return (checkExtension.includes(image[0].type))
        } else {
            return true;
        }
    })

})
const VLDAddCate = yup.object().shape({
    name: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5")
})
const VLdImages = yup.object().shape({
    title: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    image: yup.mixed().test("addImage", "Image required", (value) => value ? true : false)
        .test("checkTypeImage", "We only allow type image", (value) => {
            let images = [...value]
            let typeImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            return images.length >= 1 && typeImage.includes(value[0].type)
        })
})
const VLdImagesUpdate = yup.object().shape({
    title: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    image: yup.mixed().test("checkTypeImage", "We only allow type image", (value) => {
        let image = [...value];
        let checkExtension = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
        if (image.length >= 1) {
            return (checkExtension.includes(image[0].type))
        } else {
            return true;
        }
    })
})
const VLDAddProduct = yup.object().shape({
    name: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    price: yup.number().positive().min(1, "min price 1").required("You must provide value."),
    quantity: yup.number().positive().integer().min(1, "min price 1").required("You must provide value."),
    image: yup.mixed().test("addImage", "Image required", (value) => value ? true : false)
        .test("checkTypeImage", "We only allow type image", (value) => {
            let images = [...value]
            let typeImage = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            return images.length >= 1 && typeImage.includes(value[0].type)
        }),
    id_cate: yup.string().required("You must provide value."),
    describe: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5")
})
const VLDUpdateProduct = yup.object().shape({
    name: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    price: yup.number().positive().min(1, "min price 1").required("You must provide value."),
    quantity: yup.number().positive().integer().min(1, "min price 1").required("You must provide value."),
    image: yup.mixed().test("checkTypeImage", "We only allow type image", (value) => {
        let image = [...value];
        let checkExtension = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
        if (image.length >= 1) {
            return (checkExtension.includes(image[0].type))
        } else {
            return true;
        }
    }),
    id_cate: yup.string().required("You must provide value."),
    describe: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5")
})

const VLDUser = yup.object().shape({
    first_name: yup.string().trim().required("You must provide value.")
        .min(3, "the value provide must longer 5"),
    last_name: yup.string().trim().required("You must provide value.")
        .min(2, "the value provide must longer 2"),
    image: yup.mixed().test("checkTypeImage", "We only allow type image", (value) => {
        let image = [...value];
        let checkExtension = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
        if (image.length >= 1) {
            return (checkExtension.includes(image[0].type))
        } else {
            return false;
        }
    }),
    email: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    address: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    userName: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    passWord: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    confirmPassWord: yup.string().oneOf([yup.ref("passWord")], "confirmPassword not match")
})

const VLDChangePassword = yup.object().shape({
    userName: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    passWord: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    confirmPassWord: yup.string().oneOf([yup.ref("passWord")], "confirmPassword not match")
})
const VLDUserUpdate = yup.object().shape({
    first_name: yup.string().trim().required("You must provide value.")
        .min(3, "the value provide must longer 5"),
    last_name: yup.string().trim().required("You must provide value.")
        .min(2, "the value provide must longer 2"),
    image: yup.mixed().test("checkTypeImage", "We only allow type image", (value) => {
        let image = [...value];
        let checkExtension = ["image/jpeg", "image/png", "image/gif", "image/jpg"]
        if (image.length >= 1) {
            return (checkExtension.includes(image[0].type))
        } else {
            return true;
        }
    }),
    email: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),
    address: yup.string().trim().required("You must provide value.")
        .min(5, "the value provide must longer 5"),

})

export {
    VLDSignIn, VLDAddCate, VLDAddProduct, VLdImages,
    VLdImagesUpdate, VLDUpdateProduct, VLdEditProfile, VLDUser, VLDUserUpdate, VLDChangePassword
}

