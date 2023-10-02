//In here we are create Browser routers

import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import FoodItemHome from './components/FoodItemHome';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import FoodItemDetails from './components/FoodItemDetails';
import FoodItemEdit from './components/FoodItemEdit';
import DashBoard from './components/DashBoard';
import Discount from './components/Discount';
import UpdateDiscount from './components/UpdateDiscount';
import DiscountDetails from './components/DiscountDetails';
import CostingManage from './components/CostingManage';
import CostEdit from './components/CostEdit';
import CostDetails from './components/CostDetails';
import InventryHome from './components/InventryHome';
import InventryEdit from './components/InventryEdit';
import CustomerManage from './components/CustomerManage';
import CustomerEdit from './components/CustomerEdit';
import CustomerDetails from './components/CustomerDetails';
import Developers from './components/Developers';
import EmployeeUpdate from "./components/EmployeeUpdate";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeesManage from "./components/EmployeesManage";
import PaymentManage from "./components/PaymentManage";
import PaymentUpdate from "./components/PaymentUpdate";

export default class App extends Component {                     // <--------------this APP class we extends using Component class
  render() {
    return (

      <BrowserRouter>
        <Route path="/developers" exact component = {Developers}></Route>
        <div className="container1">
          <SideBar/>
          
          <Route path="/" exact component = {DashBoard}></Route>
          

          <Route path="/FoodItems/edit/:id" component = {FoodItemEdit}></Route>
          <Route path="/FoodItems" exact component = {FoodItemHome}></Route>
          <Route path="/FoodItems/Details/:id" component = {FoodItemDetails}></Route>

          <Route path="/discount" exact component={Discount}></Route>
          <Route path="/editDiscount/:id" component={UpdateDiscount}></Route>
          <Route path="/discountDetails/:id" component={DiscountDetails}></Route>

          <Route path='/costing' exact component={CostingManage}></Route>
          <Route path='/costing/edit/:id' exact component={CostEdit}></Route>
          <Route path='/costing/details/:id' exact component={CostDetails}></Route>

          <Route path= "/Inventry" exact component={InventryHome}></Route>
          <Route path="/Inventry/edit/:id" component={InventryEdit}></Route>

          <Route path="/customer" exact component={CustomerManage}></Route>
          <Route path="/customer/edit/:id" component={CustomerEdit}></Route>
          <Route path="/customer/details/:id" component={CustomerDetails}></Route>

          <Route path = "/Employee/" exact component = { EmployeesManage }/>
          <Route path = "/edit/:id" component = { EmployeeUpdate }/>
          {/* <Route path = "/Empolyee/add"component = { EmployeeAdd }/> */}

          <Route path = "/Payments/" exact component = { PaymentManage }></Route>
          <Route path = "/Payment/Edit/:id" component = { PaymentUpdate }></Route>
          
        </div>
        <Footer/>
      </BrowserRouter>

    )
  }
}