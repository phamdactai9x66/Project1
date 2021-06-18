import react from "react";
import { checkAuth } from "./index";
import { Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";

interface protectRoute extends RouteComponentProps {
    Component?: any,
    path?: any,
    exact?: any
}
const protextRoute: react.FC<protectRoute> = ({ children, location, ...rest }) => {
    return (
        <Route {...rest}>
            {checkAuth() && checkAuth().user.role >= 2 ? children :
                <Redirect to={{ pathname: "/admin" }} />}
        </Route>
    )
}

export default withRouter(protextRoute)
