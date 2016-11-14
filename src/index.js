import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './js/pages/Layout'
import './index.css'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
        </Route>
    </Router>,
    document.getElementById('root')
)
