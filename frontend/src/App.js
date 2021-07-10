import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import RegisterUser from './components/register-user.component'
import Login from './components/login-user.component'
import Vendor from './components/vendor.component'
import Customer from './components/customer.component'
import Vendor_add from './components/add_vendor.component'
import Vendor_product from './components/product_vendor.component'
import Vendor_dispatch from './components/dispatch_vendor.component'
import Vendor_dispatched from './components/dispatched_vendor.component'
import Customer_search from './components/customer_search.component'
import Customer_list from './components/customer_list.component'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/register" component={RegisterUser}/>
        <Route path="/login" component={Login}/>
        <Route path="/vendor/:id" component={Vendor}/>
        <Route path="/customer/:id" component={Customer}/>
        <Route path="/vendor/add/:id" component={Vendor_add}/>
        <Route path="/vendor/product/:id" component={Vendor_product}/>
        <Route path="/vendor/dispatch/:id" component={Vendor_dispatch}/>
        <Route path="/vendor/dispatched/:id" component={Vendor_dispatched}/>
        <Route path="/customer/search/:id" component={Customer_search}/>
        <Route path="/customer/list/:id" component={Customer_list}/>
      </div>
    </Router>
  );
}

export default App;
