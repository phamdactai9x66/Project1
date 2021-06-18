import React, { useState, useEffect } from "react";

import apiCate from "../api/ApiCate";

export interface SelectcateProps {
    value?: any,
    resgiter?: any
}

const Selectcate: React.FC<SelectcateProps> = (props) => {
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState<object[]>([])
    useEffect(() => {
        let getData = async () => {
            let getCate = await apiCate.getAll();
            setdata(getCate);
            setloading(true)
        }
        getData()
        return () => {
            setloading(false);
        }
    }, [])
    const displayUl = () => {
        return (
            <select className="form-select"   {...props.resgiter} aria-label="Default select example">
                <option value="">Choose Category </option>
                {data.map((currenValue: any, index) => (
                    <option key={index} value={currenValue._id}>{currenValue.name}</option>
                ))
                }
            </select>
        )
    }

    return (<>

        {loading &&
            displayUl()
        }

    </>);
}

export default Selectcate;