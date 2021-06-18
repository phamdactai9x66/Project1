import react from "react"
import { typeAction } from "../page/pageClient/home"


export const host = window.location.origin;

export const imageDefault = 'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png';

export const checkRole = {
    member: 0,
    partner: 1,
    admin: 2
}

export function handleAnalysisMonth(newOption: any = {}) {
    let anialysis: any[] = [];
    for (let index = 1; index <= 12; index++) {
        anialysis = [...anialysis, {
            month: index,
            quantity: 0,
            ...newOption
        }]
    }
    return anialysis;
}

export interface typeState {
    loading: boolean,
    data: any,
    queryproduct: any,
    staticData: any,
    paginaiton: {
        _limit: number,
        _page: number,
        countRows: number
    },
    filter: {
        _limit: number,
        _page: number,
    }
}
export function formatNumber<T extends number>(OldNumber: T) {
    return new Intl.NumberFormat("vn", {
        style: "currency",
        currency: "VND"
    }).format(OldNumber)
}


export function reducer(state: typeState, action: any) {
    switch (action.type) {
        case typeAction.getData:
            let { data, staticProduct, nowPage } = action.payload;
            return {
                ...state,
                loading: true,
                data: [...data],
                queryproduct: staticProduct,
                staticData: data.map((currenValue: any, index: any) => ({ ...currenValue, indexElement: index })),
                paginaiton: { ...state.paginaiton, _page: nowPage, countRows: staticProduct.length }
            }
        case typeAction.removeData:
            return { ...state, loading: false }
        case typeAction.navigationPage:
            let { _page: changePage } = action.payload;

            return { ...state, filter: { ...state.filter, _page: changePage } }
        case typeAction.relatedProduct:
            let { idCate, previosState } = action.payload;
            if (idCate != "all") {
                return {
                    ...state,
                    filter: { ...state.filter, id_cate: idCate }
                }
            }
            return { ...state, filter: { _limit: 6, _page: 1 } }
        case typeAction.sortPrice: {
            let { valueSort } = action.payload;
            let { staticData, data: dataProduct } = state;
            if (valueSort != "0") {
                return {
                    ...state,
                    data: staticData.sort((value1: any, vlaue2: any) => {
                        return valueSort == 1 ? vlaue2.price - value1.price : value1.price - vlaue2.price
                    }),
                }
            } else {
                return {
                    ...state,
                    data: staticData.sort((value1: any, vlaue2: any) => value1.indexElement - vlaue2.indexElement)
                }
            }
        }

        case typeAction.rangePrice: {
            let { theRangePrice } = action.payload;
            let checkRange = Object.entries(theRangePrice).every((currenValue: any) => currenValue[1] == "");
            if (!checkRange) {
                return {
                    ...state,
                    filter: { _limit: 6, _page: 1, ...theRangePrice }
                }
            }
            return {
                ...state,
                filter: { _limit: 6, _page: 1 }
            }
        }
        default:
            return state
    }
}


export const typeActionAdmin = {
    getData: "getData",
    unMount: "unMount",
    movePage: "movePage",
    checkElement: "checkElement",
    checkAll: "checkAll",
    chooseDelete: "chooseDelete",
    findName: "findName",
    deleteOne: "deleteOne",
    sortPrice: "sortPrice",
    findNameUser: "findNameUser",
    filterRole: "filterRole"
}

export function reducerAdmin(state: any, action: { type: any, payload?: any }) {
    switch (action.type) {
        case typeActionAdmin.getData: {
            let { queryData, dataStatic, nowPage } = action.payload;
            let addCheck = queryData.map((currenValue: any) => ({ ...currenValue, check: false }));
            return {
                ...state,
                data: [...addCheck],
                defaultData: [...addCheck],
                pagination: {
                    ...state.pagination,
                    _page: nowPage,
                    countRows: dataStatic.length
                },
                staticData: [...dataStatic]
                ,
                loading: true
            }
        }
        case typeAction.sortPrice: {
            let { valueSort } = action.payload;
            let { defaultData, data: dataProduct } = state;
            if (valueSort != "0") {
                return {
                    ...state,
                    data: defaultData.sort((value1: any, vlaue2: any) => {
                        return valueSort == 1 ? vlaue2.price - value1.price : value1.price - vlaue2.price
                    }),
                }
            } else {
                return {
                    ...state,
                    data: defaultData.sort((value1: any, vlaue2: any) => value1.indexElement - vlaue2.indexElement)
                }
            }

        }
        case typeActionAdmin.unMount: {
            return { ...state, loading: false }
        }
        case typeActionAdmin.movePage: {
            let { newPage } = action.payload;
            console.log(newPage);
            return {
                ...state,
                filter: {
                    ...state.filter,
                    _page: newPage
                }
            }
        }
        case typeActionAdmin.checkElement: {
            let { idCate } = action.payload;
            let findCheck = state.data.map((currenValue: any) => {
                if (currenValue._id == idCate) {
                    return { ...currenValue, check: !currenValue.check }
                }
                return currenValue
            })
            return {
                ...state,
                data: [...findCheck]
            }
        }
        case typeActionAdmin.checkAll: {
            let wrapBoolean = !(state.checkAll);
            let findCheck = state.data.map((currenValue: any) => ({ ...currenValue, check: wrapBoolean }))
            return {
                ...state,
                checkAll: wrapBoolean,
                data: [...findCheck]
            }
        }
        case typeActionAdmin.chooseDelete: {
            let filterData = state.data.filter((currenValue: any) => currenValue.check == false);
            return {
                ...state,
                data: filterData,
                checkAll: false
            };
        }
        case typeActionAdmin.findName: {
            let { checkString, findNameU } = action.payload;


            return {
                ...state,
                filter: {
                    ...state.filter,
                    name: checkString ? checkString : findNameU
                }
            }
        }
        case typeActionAdmin.deleteOne: {
            let { _id } = action.payload;
            let filterData = state.data.filter((currenValue: any) => (currenValue._id != _id));
            return {
                ...state,
                data: [...filterData]
            }
        }
        case typeActionAdmin.filterRole: {
            let { role } = action.payload;
            return {
                ...state,
                filter: {
                    ...state.filter,
                    _page: 1,
                    _limit: 5,
                    role
                }
            };
        }
        default: {
            return state;
        }

    }
}
