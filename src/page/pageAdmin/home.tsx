import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import ApiUser from '../../api/ApiUser';
import { handleAnalysisMonth } from '../../component/methodCommon';
import AnalysisPro from "./mapHome/analysisProduct";
import AnalyCate from "./mapHome/analysisCate";
interface HomeProp {

}


const Home: React.FC<HomeProp> = (props) => {
    const [analysis, setanalysis] =
        useState({
            loading: false, data: [...handleAnalysisMonth()]
        })


    useEffect(() => {
        (async () => {
            let getUser = await ApiUser.getAll();
            // console.log(getUser)
            let saveAna = analysis.data.map((currenValue: any) => {
                let getRole = {
                    admin: 0,
                    partner: 0,
                    member: 0
                }
                let filter = getUser.filter((currenValue2: any) => {
                    let findMonth = new Date(currenValue2.createdAt).getMonth() + 1;
                    return findMonth == currenValue.month
                })
                filter.forEach((currenValue2: any) => {
                    if (currenValue2.role == 2) return getRole.admin++
                    if (currenValue2.role == 1) return getRole.partner++
                    if (!currenValue2.role) return getRole.member++
                })
                return {
                    ...currenValue,
                    quantity: filter.length,
                    ...getRole
                }
            })
            setanalysis({ loading: true, data: [...saveAna] })

        })()
        return () => {
            setanalysis({ loading: false, data: [] })
        }
    }, [])
    return (
        <>

            {analysis.loading ?
                <div style={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2,300px)", height: "auto", width: 1200 }}>
                    <div style={{ gridColumn: "1/3", gridRow: "1/3", position: "relative" }}>

                        <ResponsiveContainer minWidth={300} minHeight={500}>
                            <LineChart data={analysis.data}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey="month" />
                                <YAxis dataKey="quantity" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="admin"
                                    stroke="#641369"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="partner"
                                    stroke="#2c2188"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="member"
                                    stroke="#21884f"
                                    activeDot={{ r: 8 }}
                                />

                                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                            </LineChart>
                        </ResponsiveContainer>
                        <div style={{ position: "absolute", top: 20, right: 20 }}>Analysis User</div>
                    </div>
                    <AnalysisPro />

                    <AnalyCate />
                </div> :
                ""
            }
        </>
    )
}

export default Home

