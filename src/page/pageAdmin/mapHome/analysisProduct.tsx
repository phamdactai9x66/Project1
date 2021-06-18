import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { handleAnalysisMonth } from '../../../component/methodCommon';
import ApiProduct from '../../../api/ApiProduct';

interface AnalysisUser {

}

const AnalysisUser: React.FC<AnalysisUser> = () => {
    const [analysis, setanalysis] = useState({ loading: false, data: [...handleAnalysisMonth()] })

    useEffect(() => {
        (async () => {
            let getproduct = await ApiProduct.getAll();
            let saveAna = analysis.data.map((currenValue: any) => {

                let filter = getproduct.filter((currenValue2: any) => {
                    let findMonth = new Date(currenValue2.createdAt).getMonth() + 1;
                    return findMonth == currenValue.month
                }).reduce((previousValue: any, currenValue2: any) => {
                    return previousValue + currenValue2.quantity;
                }, 0)
                return { ...currenValue, quantity: filter }
            })
            setanalysis({ loading: true, data: [...saveAna] })

        })()
        return () => {
            setanalysis({ loading: false, data: [] })
        }
    }, [])
    return (
        <div style={{ position: "relative" }} >

            <ResponsiveContainer minWidth={300} minHeight={300}>
                <LineChart data={analysis.data}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="quantity" />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="quantity"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />

                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", top: 20, right: 20 }}>Analysis Product</div>
        </div>
    )
}

export default AnalysisUser
