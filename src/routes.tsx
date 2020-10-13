import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing';
import OrphanatMap from './pages/OrphanageMap';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/orphanat" component={OrphanatMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;