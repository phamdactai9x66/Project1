import React from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import { RouteComponentProps } from "react-router-dom"
interface notFoundPageProp extends RouteComponentProps {

}
const notFoundPage: React.FC<notFoundPageProp> = (props) => {
    return (
        <div>
            <h1> this notFoundPage admin:{props.match.path}</h1>

        </div>
    )
}

export default notFoundPage

