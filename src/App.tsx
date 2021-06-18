import React from 'react';

import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./reducer";

import ClientSide from "./page/pageClient/clientSide";
import AdminSide from "./page/pageAdmin/adminSide";
import ProtectRoute from "./auth/protectRoute";
import ProtectAdmin from './auth/protectAdmin';

import PageAdmin from "./page/pageAdmin/managerAccount"
import PageAdminAdd from "./page/pageAdmin/managerAccountAdd"
import PageAdminUpdate from "./page/pageAdmin/managerAccountUpdate"
import ChangePassword from "./page/pageAdmin/managerAcccountChangePass"
import { adminSide, clientSide, creactRoute } from "./route";
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>

            <ProtectRoute path="/admin"  >
              <AdminSide>

                <Switch>
                  <ProtectAdmin path="/admin/ManagerAccount/update/:nameUser/changePassWord" exact={false}><ChangePassword /></ProtectAdmin>
                  <ProtectAdmin path="/admin/ManagerAccount/update/:nameUser" exact={false}><PageAdminUpdate /></ProtectAdmin>
                  <ProtectAdmin path="/admin/ManagerAccount/add" exact={false}><PageAdminAdd /></ProtectAdmin>
                  <ProtectAdmin path="/admin/ManagerAccount" exact={false}><PageAdmin /></ProtectAdmin>
                  {creactRoute<object[]>(adminSide)}

                </Switch>
              </AdminSide>
            </ProtectRoute>

            <Route path="/">
              <ClientSide>
                <Switch>
                  {creactRoute<object[]>(clientSide)}
                </Switch>
              </ClientSide>
            </Route>
          </Switch>

        </Router>
      </Provider>
    </>

  );
}



export default App;
