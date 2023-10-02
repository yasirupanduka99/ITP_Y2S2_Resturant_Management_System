// import React, { Component } from 'react';
// import dessert from '../Icons/MainCategory/dessert.png';
// import foods from '../Icons/MainCategory/foods.png';
// import drink from '../Icons/MainCategory/drink.png';
// import snack from '../Icons/MainCategory/snack.png';
// import package1 from '../Icons/MainCategory/package.png';
// import SubBar from '../Images/SubBar.png';

// import cakes from '../Icons/SubCategory/Dessert/cakes.png';
// import frozen from '../Icons/SubCategory/Dessert/frozen.png';
// import fruits from '../Icons/SubCategory/Dessert/fruits.png';
// import icecream from '../Icons/SubCategory/Dessert/icecream.png';

// import cold from '../Icons/SubCategory/Drinks/cold.png';
// import hot from '../Icons/SubCategory/Drinks/hot.png';

// import FamilyPack from '../Icons/SubCategory/FoodPackages/FamilyPack.png';
// import kidsPack from '../Icons/SubCategory/FoodPackages/kidsmeals.png';
// import PersonPack from '../Icons/SubCategory/FoodPackages/PersonMeals.png';

// import fish from '../Icons/SubCategory/Foods/fish.png';
// import egg from '../Icons/SubCategory/Foods/fried-egg.png';
// import chicken from '../Icons/SubCategory/Foods/roast-chicken.png';
// import seafood from '../Icons/SubCategory/Foods/seafood.png';
// import vegetable from '../Icons/SubCategory/Foods/vegetable.png';

// import AllSnacks from '../Icons/SubCategory/Snacks/snack.png';

// export default class CategoryBar extends Component {





//         openNavFoods() {
//             document.getElementById("FoodsBar_Container").style.width= "90px"
//             console.log('Clicked!!!!')
//         }
//         closeFoodNav() {
//             document.getElementById("FoodsBar_Container").style.width = "0px"
//             console.log('Clicked!!!!')
//         }


//         openNavDrinks() {
//           document.getElementById("DrinksBar_Container").style.width = "90px"
//           console.log('Clicked!!!!')
//         }
//         closeDrinksNav() {
//             document.getElementById("DrinksBar_Container").style.width = "0"
//             console.log('Clicked!!!!')
//         }


//         openNavSnacks() {
//           document.getElementById("SnacksBar_Container").style.width = "90px"
//           console.log('Clicked!!!!')
//         }
//         closeSnacksNav() {
//             document.getElementById("SnacksBar_Container").style.width = "0"
//             console.log('Clicked!!!!')
//         }


//         openNavDessert() {
//           document.getElementById("DessertBar_Container").style.width = "90px"
//           console.log('Clicked!!!!')
//         }
//         closeDessertNav() {
//             document.getElementById("DessertBar_Container").style.width = "0"
//             console.log('Clicked!!!!')
//         }
        


//         openNavPackages() {
//           document.getElementById("PackagesBar_Container").style.width = "90px"
//         }
//         closePackagesNav() {
//             document.getElementById("PackagesBar_Container").style.width = "0"
//             console.log('Clicked!!!!')
//         }

    








    
//     render() {
//     return (


//         <div>




//              <div className="categoryBar_Container">

//                 <div className="categoryDetails">
//                     <div>
//                         <button onClick={this.openNavFoods}><img alt="Drinks" src={foods}></img></button>
//                         <h1>Foods</h1>
//                     </div>
//                     <div>
//                         <button onClick={this.openNavDrinks}><img alt="Drinks" src={drink}></img></button>
//                         <h1>Drinks</h1>
//                     </div>
//                     <div>
//                         <button onClick={this.openNavSnacks}><img alt="Snacks" src={snack}></img></button>
//                         <h1>Snacks</h1>
//                     </div>
//                     <div>
//                         <button onClick={this.openNavDessert}><img alt="Dessert" src={dessert}></img></button>
//                         <h1>Dessert</h1>
//                     </div>
//                     <div>
//                         <button onClick={this.openNavPackages}><img alt="Packages" src={package1}></img></button>
//                         <h1>Packages</h1>
//                     </div>
                    
//                 </div>

//             </div> 



















//             {/*---------------- For Foods Button ----------------------*/}
//             <div id="FoodsBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
//                 <button className="closebtn" onClick={this.closeFoodNav}>X</button>


//                 <div className="containerBorder">
//                     <div>
//                         <button><img alt="Fish" src={fish}></img></button>
//                         <h1>Fish</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Egg" src={egg}></img></button>
//                         <h1>Egg</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Chicken" src={chicken}></img></button>
//                         <h1>Chicken</h1>
//                     </div>
//                     <div>
//                         <button><img alt="SeaFoods" src={seafood}></img></button>
//                         <h1>SeaFoods</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Vegetable" src={vegetable}></img></button>
//                         <h1>Vegetable</h1>
//                     </div>

//                     </div>
                    

//             </div>







//             {/* -------------------For Drinks Button-------------------------- */}
//             <div id="DrinksBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
//             <button className="closebtn" onClick={this.closeDrinksNav}>X</button>


//                 <div className="containerBorder">
//                     <div>
//                         <button><img alt="Cold" src={cold}></img></button>
//                         <h1>Cold</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Hot" src={hot}></img></button>
//                         <h1>Hot</h1>
//                     </div>
//                 </div>
                    

//             </div>








//             {/* -------------------For Snacks Button-------------------------- */}
//             <div id="SnacksBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
//                 <button className="closebtn" onClick={this.closeSnacksNav}>X</button>


//                 <div className="containerBorder">
//                     <div>
//                         <button><img alt="All" src={AllSnacks}></img></button>
//                         <h1>All</h1>
//                     </div>
//                 </div>
                    

//             </div>







//             {/* -------------------For Dessert Button-------------------------- */}
//             <div id="DessertBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
//                 <button className="closebtn" onClick={this.closeDessertNav}>X</button>


//                 <div className="containerBorder">
//                     <div>
//                         <button><img alt="Cakes" src={cakes}></img></button>
//                         <h1>Cakes</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Frozen" src={frozen}></img></button>
//                         <h1>Frozen</h1>
//                     </div>
//                     <div>
//                         <button><img alt="Fruits" src={fruits}></img></button>
//                         <h1>Fruits</h1>
//                     </div>
//                     <div>
//                         <button><img alt="IceCream" src={icecream}></img></button>
//                         <h1>Ice-Cream</h1>
//                     </div>
//                 </div>
                    

//             </div>






//             {/* -------------------For Packages Button-------------------------- */}
//             <div id="PackagesBar_Container" className="subContainer" style={{backgroundImage:'url('+SubBar+')', height: "max-content"}}>
//                 <button className="closebtn" onClick={this.closePackagesNav}>X</button>


//                 <div className="containerBorder">
//                     <div>
//                         <button><img alt="kidsPack" src={kidsPack}></img></button>
//                         <h1>kids Pack</h1>
//                     </div>
//                     <div>
//                         <button><img alt="PersonPack" src={PersonPack}></img></button>
//                         <h1>Person Pack</h1>
//                     </div>
//                     <div>
//                         <button><img alt="FamilyPack" src={FamilyPack}></img></button>
//                         <h1>Family Pack</h1>
//                     </div>
//                 </div>
                    

//             </div>




//         </div>

        

//     )
//   }
// }