import react from "react";
import { checkAuth } from "./index";
import { Route, withRouter, RouteComponentProps, Redirect } from "react-router-dom";

interface protectRoute extends RouteComponentProps {
    Component?: any,
    path?: any
}
const protextRoute: react.FC<protectRoute> = ({ children, location, ...rest }) => {
    return (
        <Route {...rest}>
            {checkAuth() && checkAuth().user.role >= 1 ? children :
                <Redirect to={{ pathname: "/", state: { from: location.pathname } }} />}
        </Route>
    )
}

export default withRouter(protextRoute)
