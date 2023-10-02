import React, { Component } from 'react';
import axios from 'axios';                       // <---------------import axios from axios method, this is used for comunicate with frontend with backend
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import DiscountCashier from '../Images/DiscountCashier.png';
import CartLogo from '../Icons/cart_FI.png';


import dessert from '../Icons/MainCategory/dessert.png';
import foods from '../Icons/MainCategory/foods.png';
import drink from '../Icons/MainCategory/drink.png';
import snack from '../Icons/MainCategory/snack.png';
import package1 from '../Icons/MainCategory/package.png';
import Refresh from '../Icons/MainCategory/refresh.png';

import SubBar from '../Images/SubBar.png';
import carthead from '../Images/carthead.png';

import cakes from '../Icons/SubCategory/Dessert/cakes.png';
import frozen from '../Icons/SubCategory/Dessert/frozen.png';
import fruits from '../Icons/SubCategory/Dessert/fruits.png';
import icecream from '../Icons/SubCategory/Dessert/icecream.png';

import cold from '../Icons/SubCategory/Drinks/cold.png';
import hot from '../Icons/SubCategory/Drinks/hot.png';

import FamilyPack from '../Icons/SubCategory/FoodPackages/FamilyPack.png';
import kidsPack from '../Icons/SubCategory/FoodPackages/kidsmeals.png';
import PersonPack from '../Icons/SubCategory/FoodPackages/PersonMeals.png';

import fish from '../Icons/SubCategory/Foods/fish.png';
import egg from '../Icons/SubCategory/Foods/fried-egg.png';
import chicken from '../Icons/SubCategory/Foods/roast-chicken.png';
import seafood from '../Icons/SubCategory/Foods/seafood.png';
import vegetable from '../Icons/SubCategory/Foods/vegetable.png';

import AllSnacks from '../Icons/SubCategory/Snacks/snack.png';


export default class CashierHome extends Component {
    constructor(props){                              // <-------------- create constructor from Component class
      super(props);
  
      this.state={
        posts:[]                                     // <-------------- this.state = post[] is use for, when we request crud by using frontend then that request go to backend and do perticular calculations and it call back to here as response, so we have to catch those data using array.
      };
    }
  
  
    componentDidMount(){                             // <-------------- this method is one of react method and this is use to when our all components render to homepage or some frontend page, then this will running, this is use to call retrievePost() method after all components are render. retrievePost() method is implementing after this method you can see in down. and also you can see rendor() method on bottom
      this.retrievePost();
      this.retrievePost();
    }
  
  
    //create  method for retrieving data
    retrievePost(){
      axios.get("/FoodItems/get").then(res => {
        if(res.data.success){                        // <--------------- you can see success in get method of backend > routes > posts.js, go and see it!, in that point we code success=true, thats mean in here we call success and backend take it as true, then we can retrive data from backend//

          this.setState({
            posts:res.data.existingPosts             // <--------------- you can see this existingPosts key in get method of backend > routes > posts.js, we retriving data by this to here
          });
  
          console.log(this.state.posts);             // <--------------- this is implementing for just see this method working correctly or not in  browser console           
  
        }
  
      });
    }






            //------------------------ Harshana Rajapaksha - Discount Check

        retrievePosts(){
            axios.get("/discounts").then(res =>{
            if(res.data.success){
                this.setState({
                posts:res.data.existingPosts
                });
            console.log(this.state.posts);
            }
            });
        }
      
    
  
  

  
  
          //------------------------ Harshana Rajapaksha - Discount Check







    filterData(posts,searchKey){

      const result = posts.filter((post) =>
          post.ItemName.toLowerCase().includes(searchKey)||
          post.MCategory.toLowerCase().includes(searchKey)||
          post.SubCategory.toLowerCase().includes(searchKey)
      )
  
          this.setState({posts:result})
  
  }
  
  handleSearchArea = (e) =>{
  
      const searchKey = e.currentTarget.value;
  
      axios.get("/FoodItems/get").then(res => {
          if(res.data.success){                        // <--------------- you can see success in get method of backend > routes > posts.js, go and see it!, in that point we code success=true, thats mean in here we call success and backend take it as true, then we can retrive data from backend//
    
            this.filterData(res.data.existingPosts,searchKey)
    
          }
    
        });
  
  }








         /*--------------------------------- ADD Cart to DB Start -----------------------------*/


         handleInputChange = (e) =>{
            const {name,value} = e.target;

            this.setState({
              ...this.state,
              [name]:value
            })

            }

            onSubmit = (e) =>{
            e.preventDefault();

            const {name,secname,unitprice,secunitprice,subtotal,discounts,total} = this.state;

            const data ={
              name:name,
              secname:secname,
              unitprice:unitprice,
              secunitprice:secunitprice,
              subtotal:subtotal,
              discounts:discounts,
              total:total
            }

            console.log(data)

            axios.post("/cart/save",data).then((res) =>{
              if(res.data.success){
                window.location.replace('/Payment/add/');

                this.setState(
                  {
                    name:"",
                    secname:"",
                    unitprice:"",
                    secunitprice:"",
                    subtotal:"",
                    discounts:"",
                    total:"",
                  }
                )
              }
            })
            }

/*--------------------------------- ADD Cart to DB End -----------------------------*/








  // <------------------------------------------------------------CategoryBar Methods --------*/

  openNavFoods() {
    document.getElementById("FoodsBar_Container").style.width= "90px"
    console.log('Clicked!!!!')
}
closeFoodNav() {
    document.getElementById("FoodsBar_Container").style.width = "0px"
    console.log('Clicked!!!!')
}


openNavDrinks() {
  document.getElementById("DrinksBar_Container").style.width = "90px"
  console.log('Clicked!!!!')
}
closeDrinksNav() {
    document.getElementById("DrinksBar_Container").style.width = "0"
    console.log('Clicked!!!!')
}


openNavSnacks() {
  document.getElementById("SnacksBar_Container").style.width = "90px"
  console.log('Clicked!!!!')
}
closeSnacksNav() {
    document.getElementById("SnacksBar_Container").style.width = "0"
    console.log('Clicked!!!!')
}


openNavDessert() {
  document.getElementById("DessertBar_Container").style.width = "90px"
  console.log('Clicked!!!!')
}
closeDessertNav() {
    document.getElementById("DessertBar_Container").style.width = "0"
    console.log('Clicked!!!!')
}



openNavPackages() {
  document.getElementById("PackagesBar_Container").style.width = "90px"
}
closePackagesNav() {
    document.getElementById("PackagesBar_Container").style.width = "0"
    console.log('Clicked!!!!')
}









    render() {
        return (

          <div className="container1">



{/* -----------------------------------------------------------------Start of the Header -------------------------------------------------*/}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
  
                  <a className="navbar-brand" href="/" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
  
  
                  
  
              </div>
          </nav>
{/* -----------------------------------------------------------------End of the Header -----------------------------------------------*/}





{/* -----------------------------------------------------------------Start of the Search -----------------------------------------------*/}

          <div className="searchContainer">

              <div className="searchBox">
                <input id="searchNav" className="form-control me-2" type="search" placeholder="Search......" aria-label="Search" onChange={this.handleSearchArea}/>
              </div>

          </div>

{/* -----------------------------------------------------------------End of the search -----------------------------------------------*/}





{/* -----------------------------------------------------------------Start of the Regular Customer Button Home -----------------------------------------------*/}

          <div className="RegularCustomerBtn">
          <a href="/Cahier_Home/addUser" style={{textDecoration:'none',color:'white'}}><button>ADD REGULAR CUSTOMER</button></a>
          </div>
          

{/* -----------------------------------------------------------------End of the Regular Customer Button Home -----------------------------------------------*/}


  
  


  
{/* -----------------------------------------------------------------Start of the Cahier Home -----------------------------------------------*/}

          <div className="cashierContainer">

                    <div className="cashierItemBox">
                        
                        {this.state.posts.map((posts,index) => (

                            <div className="detail_box">

                                <img alt="ItemImage" className="ImgContainerH" src={posts.ItemImg}/>

                                <br/>

                              <div className="detailBox">
                                <h1>{posts.ItemName}</h1>
                                <h2>{posts.MCategory}</h2>
                                <h2>{posts.SubCategory}</h2>

                                <div id="price_And_CartBtn">
                                  <h2>Rs.{posts.ItemUnitPrice}/=</h2>

                                  <div id="cartBtn_Container">
                                    <button id="cartBtn"> <img alt="Add To Cart" src={CartLogo} /> </button>
                                  </div>
                                </div>

                                
                                
                              </div>

                            </div>
                        ))}
                            
                        
                    </div>

          </div>

{/* ------------------------------------------------------------------Start of the Cahier Home -----------------------------------------------*/}









{/*--------------------------------- CHECK DISCOUNT POPUP -----------------------------*/}
<div className="DiscountcontainerPopup">

  {/* Modal */}
  <div className="modal fade" id="addDisModal" role="dialog">
    <div className="modal-dialog">
    
       {/* Modal content */}
      <div className="modal-content" id="pop">
        <div className="addDisPopcloseBtn">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">

          <div className="addDisImg">
          <img src={DiscountCashier} alt="Add Discount"/>
          </div>

          <form className="needs-validation" id = "formID" noValidate >

                
            {/* <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Subtotal (Rs.)</label>
              <input type="text"
              required="required"
              className="form-control"
              name="subTotal"
              value = {this.state.subTotal}
              />
            </div> */}

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Discount Name</label>
              <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                  <option value="#" id = "selectDis">-Select Discount-</option>
                  {this.state.posts.map((posts) => (
                      <option value="disName">
                        {posts.discountName}{posts.percentage}
                        </option>
                  ))}

              </select>
              
            </div>
            {/* <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Discount Name</label>
              <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                  <option value="#" id = "selectDis">-Select Discount-</option>
                  {this.state.posts.map((posts) => (
                      <option value="disName">{posts.percentage}</option>
                  ))}

              </select>
              
            </div> */}

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Percentage</label>
              <input type="text"
              className="form-control"
              name="percentage"
              value = {this.state.percentage}
              />
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Discount Amount (Rs.)</label>
              <input type="text"
              className="form-control"
              name="discountAmount"/>
            </div>


            <div className = "btnInline">

            <button className="btn btn-success" id="checkbtn" type="submit" >
                &nbsp; Check Discount
              </button>

              <button className="btn btn-success" id="nextbtn" type="submit">
                &nbsp; NEXT
              </button>
             

            </div>

            
           
          </form>
          


        </div>
        {/* <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div> */}
      </div>
      
    </div>
  </div>
  
</div>
{/*---------------------------------  CHECK DISCOUNT POPUP -----------------------------*/}












{/* -----------------------------------------------------------------Start of the Cart Container -----------------------------------------------*/}

          <div className="Cart_ContainerH">

            <div className="cart_container_DataH" style={{backgroundImage:'url('+carthead+')', height: "max-content"}}>
                <h1>CART</h1>
            </div>

            <div id="cartform">
                <form>
                <div className="addItem_form_group">
                        <label>Item Name</label>
                        <input type="text"
                        className="addItem_input"
                        name="name"
                        placeholder="Enter New Item Name"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    </div>
                    

                    <div className="addItem_form_group">
                        <label>Item Unit Price(Rs.)</label>
                        <input type="text"
                        className="addItem_input"
                        name="unitprice"
                        placeholder="Enter New Item Unit Price"
                        value={this.state.unitprice}
                        onChange={this.handleInputChange} />
                    </div>

                    <hr/>

                    <div className="addItem_form_group">
                        <label>Item Name</label>
                        <input type="text"
                        className="addItem_input"
                        name="secname"
                        placeholder="Enter New Item Name"
                        value={this.state.secname}
                        onChange={this.handleInputChange} />
                    </div>
                    

                    <div className="addItem_form_group">
                        <label>Item Unit Price(Rs.)</label>
                        <input type="text"
                        className="addItem_input"
                        name="secunitprice"
                        placeholder="Enter New Item Unit Price"
                        value={this.state.secunitprice}
                        onChange={this.handleInputChange} />
                    </div>



                </form>
            </div>

            <div id="TotalContainer">

                <div id="SubTotal">
                    <h1>SubTotal (Rs.)</h1>
                    <input type="text"
                        className="addItem_input"
                        placeholder="SUBTOTAL"
                        name="subtotal"
                        value={this.state.subtotal = +this.state.unitprice + +this.state.secunitprice}
                        onChange={this.handleInputChange} readOnly/>
                </div>
                <div id="SubTota2">
                    <button className="CheckDisBtn" data-toggle="modal" data-target="#addDisModal">
                        <i class="fas fa-tags" id="checkDIS"></i>
                    &nbsp;</button>
                    <h1>Discounts (%)</h1>
                    <input type="text"
                        className="addItem_input"
                        placeholder="Discounts"
                        name="discounts"
                        value={this.state.discounts}
                        onChange={this.handleInputChange}/>
                </div>

                
                  
                <div id="SubTota3">
                    <h1>Total (Rs.)</h1>
                    <input type="text"
                        className="addItem_input"
                        placeholder="TOTAL"
                        name="total"
                        value={this.state.total = +this.state.subtotal - +((this.state.subtotal * +this.state.discounts) / 100)}
                        onChange={this.handleInputChange} readOnly/>
                </div>

                

                <div id = "CheckoutBtn">
                    <button type="submit" onClick={this.onSubmit}>Checkout</button>
                </div>

            </div>

            

        </div>

{/* -----------------------------------------------------------------End of the Cart Container -----------------------------------------------*/}



















{/*------------------------------------------------------------------CategoryBar Start*/}



















{/*------------------------------------------------------------------CategoryBar Start*/}

              <div className="categoryBar_Container">

              <div className="categoryDetails">
                  <div>
                      <button onClick={this.openNavFoods}><img alt="Drinks" src={foods}></img></button>
                      <h1>Foods</h1>
                  </div>
                  <div>
                      <button onClick={this.openNavDrinks}><img alt="Drinks" src={drink}></img></button>
                      <h1>Drinks</h1>
                  </div>
                  <div>
                      <button onClick={this.openNavSnacks}><img alt="Snacks" src={snack}></img></button>
                      <h1>Snacks</h1>
                  </div>
                  <div>
                      <button onClick={this.openNavDessert}><img alt="Dessert" src={dessert}></img></button>
                      <h1>Dessert</h1>
                  </div>
                  <div>
                      <button onClick={this.openNavPackages}><img alt="Packages" src={package1}></img></button>
                      <h1>Packages</h1>
                  </div>
                  <div>
                      <button value="" onClick={this.handleSearchArea}><img alt="Packages" src={Refresh}></img></button>
                      <h1>Refresh</h1>
                  </div>
                  
              </div>

              </div> 












              {/*---------------- For Foods Button ----------------------*/}
              <div id="FoodsBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
              <button className="closebtn" onClick={this.closeFoodNav}>X</button>


              <div className="containerBorder">
                  <div>
                      <button value="fish" onClick={this.handleSearchArea}><img alt="Fish" src={fish}></img></button>
                      <h1>Fish</h1>
                  </div>
                  <div>
                      <button value="egg" onClick={this.handleSearchArea}><img alt="Egg" src={egg}></img></button>
                      <h1>Egg</h1>
                  </div>
                  <div>
                      <button value="chicken" onClick={this.handleSearchArea}><img alt="Chicken" src={chicken}></img></button>
                      <h1>Chicken</h1>
                  </div>
                  <div>
                      <button value="sea-foods/mix" onClick={this.handleSearchArea}><img alt="SeaFoods" src={seafood}></img></button>
                      <h1>SeaFoods</h1>
                  </div>
                  <div>
                      <button value="vegetable" onClick={this.handleSearchArea}><img alt="Vegetable" src={vegetable}></img></button>
                      <h1>Vegetable</h1>
                  </div>

                  </div>
                  

              </div>







              {/* -------------------For Drinks Button-------------------------- */}
              <div id="DrinksBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
              <button className="closebtn" onClick={this.closeDrinksNav}>X</button>


              <div className="containerBorder">
                  <div>
                      <button value="cold" onClick={this.handleSearchArea}><img alt="Cold" src={cold}></img></button>
                      <h1>Cold</h1>
                  </div>
                  <div>
                      <button value="hot" onClick={this.handleSearchArea}><img alt="Hot" src={hot}></img></button>
                      <h1>Hot</h1>
                  </div>
              </div>
                  

              </div>








              {/* -------------------For Snacks Button-------------------------- */}
              <div id="SnacksBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
              <button className="closebtn" onClick={this.closeSnacksNav}>X</button>


              <div className="containerBorder">
                  <div>
                      <button value="snacks" onClick={this.handleSearchArea}><img alt="All" src={AllSnacks}></img></button>
                      <h1>All</h1>
                  </div>
              </div>
                  

              </div>







              {/* -------------------For Dessert Button-------------------------- */}
              <div id="DessertBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
              <button className="closebtn" onClick={this.closeDessertNav}>X</button>


              <div className="containerBorder">
                  <div>
                      <button value="cakes" onClick={this.handleSearchArea}><img alt="Cakes" src={cakes}></img></button>
                      <h1>Cakes</h1>
                  </div>
                  <div>
                      <button value="frozen" onClick={this.handleSearchArea}><img alt="Frozen" src={frozen}></img></button>
                      <h1>Frozen</h1>
                  </div>
                  <div>
                      <button value="fruits" onClick={this.handleSearchArea}><img alt="Fruits" src={fruits}></img></button>
                      <h1>Fruits</h1>
                  </div>
                  <div>
                      <button value="ice-cream" onClick={this.handleSearchArea}><img alt="IceCream" src={icecream}></img></button>
                      <h1>Ice-Cream</h1>
                  </div>
              </div>
                  

              </div>







              {/* -------------------For Packages Button-------------------------- */}
              <div id="PackagesBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
              <button className="closebtn" onClick={this.closePackagesNav}>X</button>


              <div className="containerBorder">
                  <div>
                      <button value="kids-pack" onClick={this.handleSearchArea}><img alt="kidsPack" src={kidsPack}></img></button>
                      <h1>kids Pack</h1>
                  </div>
                  <div>
                      <button value="person-pack" onClick={this.handleSearchArea}><img alt="PersonPack" src={PersonPack}></img></button>
                      <h1>Person Pack</h1>
                  </div>
                  <div>
                      <button value="family-pack" onClick={this.handleSearchArea}><img alt="FamilyPack" src={FamilyPack}></img></button>
                      <h1>Family Pack</h1>
                  </div>
              </div>
                  

              </div>
          
        </div>
            

        )
      }

}