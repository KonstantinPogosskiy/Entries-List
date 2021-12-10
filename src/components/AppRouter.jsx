import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);
            if (isAuth) {
               return <Switch>
                    {privateRoutes.map(route =>
                        <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
                    )}
                    <Redirect to="/posts"/>
                </Switch>
            } else {
               return <Switch>
                    {publicRoutes.map(route =>
                        <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
                    )}
                    <Redirect to="/login"/>
                </Switch>
            }
};

export default AppRouter;