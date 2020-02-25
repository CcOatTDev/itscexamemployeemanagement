import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/app/App';
import EmpManage from './component/EmpManage';
import * as serviceWorker from './serviceWorker';
import {Route  , BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Route exact  path ="/" component={App} />
        <Route exact  path ="/Home" component={App} />
        <Route exact  path ="/Employee/:type" component={EmpManage} />
        <Route exact  path ="/Employee/:userID/:type" component={EmpManage} />
    </BrowserRouter>
    , document.getElementById('root')
);
serviceWorker.unregister();
