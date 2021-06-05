import React from "react";
import { BrowserRouter, Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { ShopNavbar } from "./components/navbar"


export const HomeScreen = () => {
    let { path, url } = useRouteMatch();
    console.log('home:', path, url);
    return (
        <div className="w-100 vh-100" style={{ backgroundImage: "url('https://images3.alphacoders.com/621/621682.jpg')", height: '100vh', backgroundSize: 'cover' }}>
            <ShopNavbar />
            <h1 className='display-1'>HOMEPAGE</h1>
            <button className="btn-lg btn btn-dark">Login</button>
            <Switch>
                <Route path={`${path}/:topicId`} component={Topic} >
                </Route>
            </Switch>
            
        </div>
    )
}

export function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams<{ topicId: string }>();
    console.log("IDDDDDDDD --->", topicId);
    //let topicId  = "shit";

    return (
        <div className="w-25 v-25 bg-danger">
            <h1>Topics</h1>
            <h3>{topicId}</h3>
        </div>
    );
}