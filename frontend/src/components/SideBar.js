import React, { Component } from 'react';

export default class SideBar extends Component {




  render() {
    return (

                
              <div className="dash_container">	
                <div className="dashbtnbox">
                    <p id="date"></p>
                    <a style={{textDecoration:'none', color:'white'}} href="/"><button type="button" className="dashbtn01">Dashboard</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/Inventry"><button type="button" className="dashbtn02">Inventory Control</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/FoodItems"><button type="button" className="dashbtn03">Food Items</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/discount"><button type="button" className="dashbtn04">Discount/Offers</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/costing"><button type="button" className="dashbtn05">Costing</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/customer"><button type="button" className="dashbtn06">Customer Accounts</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/Employee/"><button type="button" className="dashbtn07">Staff</button></a>
                    <a style={{textDecoration:'none', color:'white'}} href="/Payments/"><button type="button" className="dashbtn08">Payment</button></a>
                    {/* <button type="button" className="dashbtn09">Order</button> */}
                    <h1>Welcome!!</h1>
                </div>
              </div>

    )
  }
}