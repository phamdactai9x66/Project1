import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import ApiCate from '../../../api/ApiCate';
import { handleAnalysisMonth } from "../../../component/methodCommon"

interface AnalysisCate {

}

const AnalysisCate: React.FC<AnalysisCate> = (props) => {
    const [analysis, setanalysis] = useState({ loading: false, data: [...handleAnalysisMonth()] })

    useEffect(() => {
        (async () => {
            let getCate = await ApiCate.getAll();
            let saveAna = analysis.data.map((currenValue: any) => {

                let filter = getCate.filter((currenValue2: any) => {
                    let findMonth = new Date(currenValue2.createdAt).getMonth() + 1;
                    return findMonth == currenValue.month
                })
                return { ...currenValue, quantity: filter.length }
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
            <div style={{ position: "absolute", top: 20, right: 20 }}>Analysis Cate</div>
        </div>
    )
}

export default AnalysisCate
