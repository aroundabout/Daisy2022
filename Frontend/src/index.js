import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes/index'
//import { adminRoutes } from './routes/index'
import AdminIndex from './pages/admin/adminIndex'
import PersonalSpace from './pages/personal/personalSpace'
ReactDOM.render(
  <Router>
    <Switch>
      <Route
        path="/admin"
        component={(routeProps) =>
          true ? <AdminIndex {...routeProps} /> : <Redirect to="/login" />
        }
      />
      <Route path="/personal/account=:account" component={PersonalSpace} />
      {mainRoutes.map((route) => {
        return <Route key={route.path} {...route} />
      })}
      <Redirect to="/home" />
    </Switch>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
