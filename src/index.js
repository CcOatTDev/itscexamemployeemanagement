import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/app/App';
import AddEmp from './component/AddEmp';
import * as serviceWorker from './serviceWorker';
import {Route  , BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Route exact  path ="/" component={App} />
        <Route exact  path ="/Home" component={App} />
        <Route exact  path ="/AddEmployee" component={AddEmp} />
    </BrowserRouter>
    , document.getElementById('root')
);
serviceWorker.unregister();
