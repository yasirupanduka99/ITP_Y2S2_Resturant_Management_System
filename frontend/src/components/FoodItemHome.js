//In here we create which page see client firstly when he open the our site

// we have to show our posts methods, which we created in backend to client

import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';                         // <---------------import axios from axios method, this is used for comunicate with frontend with backend
import FileBase64 from 'react-file-base64';
import additemImg from '../Images/additemImg.png';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import PrintIcon from '../Images/doc.png'

import {saveAs} from 'file-saver';

import TarawaCake from '../Images/DemoImage/TarawaCake.jpg';



toast.configure()

export class FoodItemHome extends Component {
  constructor(props){                              // <-------------- create constructor from Component class
    super(props);
    this.generateReport = this.generateReport.bind(this);

    this.state = {
      posts:[]                                     // <-------------- this.state = post[] is use for, when we request crud by using frontend then that request go to backend and do perticular calculations and it call back to here as response, so we have to catch those data using array.
    }
  };



  //----------------------------------------For Table-----------------------------//


  componentDidMount(){                            // <--------------- this method is one of react method and this is use to when our all components render to homepage or some frontend page, then this will running, this is use to call retrievePost() method after all components are render. retrievePost() method is implementing after this method you can see in down. and also you can see rendor() method on bottom
    this.retrievePost();

  }




  //create  method for retrieving data to the table
  retrievePost(){
    axios.get("/FoodItems/get").then(res => {
      if(res.data.success){                        // <--------------- you can see success in get method of backend > routes > posts.js, go and see it!, in that point we code success=true, thats mean in here we call success and backend take it as true, then we can retrive data from backend//

        this.setState({
          posts:res.data.existingPosts,             // <--------------- you can see this existingPosts key in get method of backend > routes > posts.js, we retriving data by this to here
        });

        console.log(this.state.posts);             // <--------------- this is implementing for just see this method working correctly or not in  browser console           

      }

    });
  }





  onDelete = (id) =>{

    axios.delete(`/FoodItems/delete/${id}`).then((res) => {

      toast.error("Item Deleted",{
        theme: "colored",
        icon: false,
      });
      this.retrievePost();

    })
  }




  //-----------------------------------Search Bar------------------------------------------------//


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









//--------------------------For ADD Modal--------------------------------------//


//handleInputChange 
handleInputChange = (e) => {
  const {name,value} = e.target;

  this.setState({
      ...this.state,
      [name]:value
  })
}





// <!-- Demo Start -->
autoFill = (e) =>{
    e.preventDefault();
    const data ={
    ItemName:"Tarawa Cake",
    MCategory:"Dessert",
    SubCategory:"Cakes",
    ItemUnitPrice:350,
    ItemImg:"00021154653245"
    }
  
    console.log(data)
  axios.post("/FoodItems/Insert",data).then((res) => {
    if(res.data.success){

      setTimeout(function(){
        window.location.href = '/FoodItems';
      },2000);

        toast.success("Item Added Successfully!",{
          theme: "colored",
        });

        this.setState( 
            {
                ItemName:"",
                MCategory:"",
                SubCategory:"",
                ItemUnitPrice:"",
                ItemImg:""
            })
    }
})
    }
  // <!-- Demo End -->






validate = () => {

  if (!this.state.ItemName) {
    toast.error("Item Name Can't be Empty!", {
      position: "bottom-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  if(!this.state.MCategory) {
    toast.error("Main-Category Can't be Empty!", {
      position: "bottom-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  if(!this.state.SubCategory) {
    toast.error("Sub-Category Can't be Empty!", {
      position: "bottom-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }


  if(!this.state.ItemUnitPrice){
    toast.error("Item Unit Price Can't be Empty!", {
    position: "bottom-right",
    autoClose: 6000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
    });
    }
    else if(!this.state.ItemUnitPrice.match(/^\d+/)){
    toast.error("Item Unit Price Must Numeric!", {
    position: "bottom-right",
    autoClose: 6000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
    });
  }

  if(!this.state.ItemImg) {
    toast.error("Item Image Required!", {
      position: "bottom-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }


};



onSubmit = (e) => {
  e.preventDefault();
  const {ItemName,MCategory,SubCategory,ItemUnitPrice,ItemImg} = this.state;

  const data = {
      ItemName:ItemName,
      MCategory:MCategory,
      SubCategory:SubCategory,
      ItemUnitPrice:ItemUnitPrice,
      ItemImg:ItemImg
  }

  const isValid = this.validate();
  if(isValid) {

    console.log(data)
  

    //clear form
    // this.setState(initialState)

  }

    axios.post("/FoodItems/Insert",data).then((res) => {
        if(res.data.success){

          setTimeout(function(){
            window.location.href = '/FoodItems';
          },2000);

            toast.success("Item Added Successfully!",{
              theme: "colored",
            });

            this.setState( 
                {
                    ItemName:"",
                    MCategory:"",
                    SubCategory:"",
                    ItemUnitPrice:"",
                    ItemImg:""
                })
        }
    })


    


}









//----------------------------------For Edit Model-----------------------------//












//-----------------------------------Generate Report--------------------------//

  async generateReport() {

    const obj = { fooditems: this.state.posts }

    await axios.post('/foodItemsReport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {

        //alert('Report Generated')

        toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })

        console.log(res)

        console.log(res.data)





        const pdfBlog = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlog, 'FoodItem_Details_Report.pdf');



        //window.open(res.data, '_blank');



    }).catch((err) => {

        console.log(err.message)

    })

    console.log(obj)

}











  render() {
    return (
      <div className="containerFoodItem">


        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <a className="navbar-brand" href="/" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        <input id="searchNav" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchArea}/>
                    </form>
                </div>

            </div>
        </nav>












        {/* <!-- ADD Item Modal --> */}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">

                
                

            <div id="container_addFoodItem_POPUP" className="modal-content">

              <div className="closeBtnContainer">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>


            <div className="imgContainer">
                <img src={additemImg} alt='ItemLOGO'/>
            </div>
            

            <div className="formContainer">
                
                <h1 className="addItem_h1"><u>ADD NEW ITEM</u></h1>
              <form className="addItem_form" noValidate>


                    <div className="addItem_form_group">
                        <label>Item Name</label>
                        <input type="text"
                        className="addItem_input"
                        name="ItemName"
                        placeholder="Enter New Item Name"
                        value={this.state.ItemName}
                        onChange={this.handleInputChange} />

                        <div style={{ fontSize: 12, color: "orange"}} id="addItem_ValidErrors">
                          {this.state.ErrorItemName}
                        </div>
                    </div>


                    <div className="addItem_form_group">
                        <label>Main Category</label>
                        <select className="addItem_input" name="MCategory" 
                          value={this.state.MCategory}
                          onChange={this.handleInputChange}>
                          <option value="" selected disabled hidden>Choose Type</option>
                          <option value="Foods">Foods</option>
                          <option value="Drinks">Drinks</option>
                          <option value="Dessert">Dessert</option>
                          <option value="Snacks">Snacks</option>
                          <option value="Packages">Packages</option>
                        </select>

                        <div style={{ fontSize: 12, color: "orange"}} id="addItem_ValidErrors">
                          {this.state.ErrorMCategory}
                        </div>
                    </div>


                    <div className="addItem_form_group">
                        <label>Sub Category</label>
                        <select className="addItem_input" name="SubCategory" 
                          value={this.state.SubCategory}
                          onChange={this.handleInputChange}>
                          <option value="" selected disabled hidden>Choose Type</option>
                          <option value="Chicken">Chicken</option>
                          <option value="Egg">Egg</option>
                          <option value="Vegetable">Vegetable</option>
                          <option value="Fish">Fish</option>
                          <option value="Sea-Foods/Mix">Sea-Foods/Mix</option>
                          <option value="Hot">Hot</option>
                          <option value="Cold">Cold</option>
                          <option value="Frozen">Frozen</option>
                          <option value="Fruits">Fruits</option>
                          <option value="Cakes">Cakes</option>
                          <option value="Kids-Pack">Kids-Pack</option>
                          <option value="Person-Pack">Person-Pack</option>
                          <option value="Family-Pack">Family-Pack</option>
                        </select>

                        <div style={{ fontSize: 12, color: "orange"}} id="addItem_ValidErrors">
                          {this.state.ErrorSubCategory}
                        </div>
                    </div>


                    <div className="addItem_form_group">
                        <label>Item Unit Price(Rs.)</label>
                        <input type="text"
                        className="addItem_input"
                        name="ItemUnitPrice"
                        placeholder="Enter New Item Unit Price"
                        value={this.state.ItemUnitPrice}
                        onChange={this.handleInputChange} />

                        <div style={{ fontSize: 12, color: "orange"}} id="addItem_ValidErrors">
                          {this.state.ErrorItemUnitPrice}
                        </div>
                    </div>


                    <div id="uploadcontainer" className="addItem_form_group">
                    <FileBase64
                          type="file"
                          name="ItemImg"
                          multiple={ false }
                          onDone={({ base64 }) => this.setState({ ItemImg: base64 })}
                    />

                        <div style={{ fontSize: 12, color: "orange"}} id="addItem_ValidErrors">
                          {this.state.ErrorItemImg}
                        </div>

                    </div>

                    <div id="addPopUpBtnContainer">
                      <button className = "FoodItemDemo_Btn" type="submit" onClick={this.autoFill}>
                        <i class="fas fa-bolt"></i>&nbsp; DEMO
                      </button>
                      <button className="addItem_Btn" type="submit" onClick={this.onSubmit}>save</button>
                      <a href="/FoodItems"><button type="button" className="closeBtn" data-dismiss="modal" aria-label="Close">Close & Refresh</button></a>
                    </div>

                    </form>


                  </div>


            </div>
          </div>
        </div>









        {/*-------------------------------Edit Model--------------------------- */}







        {/* ----------------------------Table-------------------------------- */}

        <div id="containerButtonBox">
        <div id="TitleContainer1">
          <h1 id="TitleOfFunction">FOOD ITEMS</h1>
        </div>

          <h2>Main-Category :</h2>

          <div id="filterSet">
          {/* <button type="button" value="foods" onClick={this.handleSearchArea}>Foods</button>
          <button type="button" value="drinks" onClick={this.handleSearchArea}>Drinks</button>
          <button type="button" value="snacks" onClick={this.handleSearchArea}>Snacks</button>
          <button type="button" value="dessert" onClick={this.handleSearchArea}>Dessert</button>
          <button type="button" value="packages" onClick={this.handleSearchArea}>Packages</button> */}
                    <select className="addItem_input" name="MCategory" 
                          value={this.state.MCategory}
                          onChange={this.handleSearchArea}>
                          <option value="" selected disabled hidden>Choose Type</option>
                          <option value="">All</option>
                          <option value="foods">Foods</option>
                          <option value="drinks">Drinks</option>
                          <option value="dessert">Dessert</option>
                          <option value="snacks">Snacks</option>
                          <option value="packages">Packages</option>
                    </select>
          </div>

          <button className = "addFoodItemBtn" type="button" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-plus-circle"></i>&nbsp;ADD NEW ITEM</button>
          <button className = "generateFIReport" type="button" onClick={this.generateReport}><i class="fas fa-file-pdf"></i></button>
        </div>
        

          <table className="tableFoodItem">
          <thead>
            <tr>
              <th style={{borderTopLeftRadius:'10px'}} scope="col">ItemNo</th>
              <th scope="col">ItemName</th>
              <th scope="col">MCategory</th>
              <th scope="col">SubCategory</th>
              <th scope="col">ItemUnitPrice</th>
              <th scope="col">ItemImg</th>
              <th style={{borderTopRightRadius:'1px'}} scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((posts,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td id="foddItem_th_name">
                    <a href={`/FoodItems/Details/${posts._id}`} style={{textDecoration:'none',color:'black'}}>
                        {posts.ItemName}
                    </a>
                </td>    
                <td>{posts.MCategory}</td>
                <td>{posts.SubCategory}</td>
                <td>Rs.{posts.ItemUnitPrice}/=</td>
                <td>Image-Added!</td>

                <td>
                   <button type="button" className="editBtn1"><a style={{textDecoration:'none',color:'white'}} href={`/FoodItems/edit/${posts._id}`}><i class="fas fa-pen"></i>&nbsp;Edit</a></button>
                  &nbsp;
                  <button type="button" className="deleteBtn1"><a style={{textDecoration:'none',color:'white'}} onClick={() => this.onDelete(posts._id)}><i class="fas fa-trash"></i>&nbsp;Delete</a></button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
       
      </div>
    )
  }
}

export default class PrintFoodItems extends Component{
  render() {
    return(

      <div>
        <ReactToPrint
          trigger={() => <button id="FoodItemPrintBtn"> <img src={PrintIcon} alt="Print Detailed Document"/> </button>}
          content={() => this.componentRef}
        />
        <FoodItemHome ref={(el) => (this.componentRef = el)} />
      </div>

    )
  }
}