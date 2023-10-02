import React, { Component } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import additemImg from '../Images/additemImg.jpg';
import {saveAs} from 'file-saver';

toast.configure()
export default class InventryHome extends Component {
constructor(props){
  super(props);

  this.generateReport = this.generateReport.bind(this);                

  this.state={
    posts:[]
  };
  
}

componentDidMount(){
  this.retrievePosts();
}


retrievePosts(){
  axios.get("/Inventry/get").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts);
    }
  });
}


onDelete =(id)=>{
    axios.delete(`/Inventry/delete/${id}`).then((res) =>{
        toast.error("Product Deleted",{
          theme: "colored",
          icon: false,
        });
        this.retrievePosts();
    })
}


filterData(posts,searchKey){
    const result =posts.filter((post)=>
        post.ProductName.toLowerCase().includes(searchKey)
    )

    this.setState({posts:result})
}


handleSearchArea =(e) =>{
    const searchKey = e.currentTarget.value;

        axios.get("/posts").then(res=>{
          if(res.data.success){
            this.filterData(res.data.existingPosts,searchKey)
            }    
        });
}


//------------------------------------For Add popup----------------------------------------//
handleInputChange =(e) =>{
  const{name,value} = e.target;

  this.setState({
      ...this.state,
      [name] : value
  })
}

// <!-- Demo Start --> 
autoFill = (e) =>{
  e.preventDefault();
  const data ={
    ProductName:"Araliya Rice 25kg",
    UnitPrice:"4125",
    Qty:100,
    Price:"412500"
  }

  console.log(data)
  axios.post("/Inventry/save",data).then((res)=>{
    if(res.data.success){
      toast.success("Product Added Successfuly!",{
        theme: "colored",
      });
      setTimeout(function(){
        window.location.href = '/Inventry';}
        ,2500);
        this.setState(
            {
                ProductName :"",
                UnitPrice :"",
                Qty :"",
                Price :""
            }
        )
    }
})
  }
// <!-- Demo End -->

onSubmit = (e) =>{
  e.preventDefault();

  const{ProductName,UnitPrice,Qty,Price} = this.state;

  const data ={
      ProductName:ProductName,
      UnitPrice:UnitPrice,
      Qty:Qty,
      Price:Price
  }

  console.log(data)

  {/* <!-- Error Alert Start --> */}
  if (ProductName== null || UnitPrice == null || Qty == null || Price == null  || UnitPrice <=0 || Qty <=0  ){

    if (ProductName == null){
      toast.error('Please Enter Product Name', {
        position: "bottom-right",
        autoClose: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    if (UnitPrice == null || UnitPrice <=0 ){
      if (UnitPrice == null ){
        toast.error('Please Enter Unit Price', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else {
        toast.error('Unit Price Cannot be Zero or Minus ', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      
    }

    if (Qty == null || Qty <=0 ){
      if (Qty == null ){
        toast.error('Please Enter Quantity', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else {
        toast.error('Qty Cannot be Zero or Minus ', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

    }

    if (Price == null){
      toast.error('Please Enter Price', {
        position: "bottom-right",
        autoClose: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  else {
  axios.post("/Inventry/save",data).then((res)=>{
      if(res.data.success){
        toast.success("Product Added Successfuly!",{
          theme: "colored",
        });
        setTimeout(function(){
          window.location.href = '/Inventry';}
          ,2500);
          this.setState(
              {
                  ProductName :"",
                  UnitPrice :"",
                  Qty :"",
                  Price :""
              }
          )
      }
  })
}
{/* <!-- End Error Alert --> */}

}
//------------------------------------End Add popup----------------------------------------//


















//-----------------------------------Generate Report--------------------------//

async generateReport() {

  const obj = { inventory: this.state.posts }

  await axios.post('/generateinventoryreport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {

      //alert('Report Generated')

      toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })

      console.log(res)

      console.log(res.data)





      const pdfBlog = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlog, 'Inventory_Report.pdf');



      //window.open(res.data, '_blank');



  }).catch((err) => {

      console.log(err.message)

  })

  console.log(obj)

}


//-----------------------------------End Generate Report--------------------------//




//--------------------------------- Search FU Start -------------------------------//
          
          handleSearchArea = (e) =>{

              const searchKey = e.currentTarget.value;


              axios.get("/Inventry/get").then(res=>{
                if(res.data.success){
                  this.filterData(res.data.existingPosts,searchKey)
            
                }
              });
          
        
         }

          filterData(posts,searchKey){

            const result = posts.filter((post) =>
                post.ProductName.toLowerCase().includes(searchKey)
            );
        
                this.setState({posts:result})
        
        }


        //--------------------------------- Search FU End -------------------------------//











render() {
    return (
      <div className="InventrycontainerHome">

        {/* <!-- Nav Bar --> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{color:"green"}}>
                <img src={companyLogo} alt="logo"/>
              </a>
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
        {/* <!-- End Nav Bar --> */}

        <br/>

        {/* <!-- ADD Item Modal --> */}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
                         
            <div id="InventryContainer_addItem_POPUP" className="modal-content">

                <div className="InventryCloseBtnContainer">
                  
                  <button type="button" className="close" aria-label="Close">
                    <a href="/Inventry">
                    <span aria-hidden="true">&times;</span></a>
                  </button>
                  
                </div>

                <img src={additemImg} alt='ItemLOGO' />
                            
              <div className="InventryFormContainer">
                  
                <h1 className="InventryAddItem_h1"><u>ADD NEW Product</u></h1>
                <form className="addItem_form" noValidate>

                      <div className="InventryAddItem_form_group">
                          <label>Product Name</label>
                          <input type="text" 
                            className="InventryAddItem_input" 
                            name="ProductName" 
                            placeholder="Enter Product Name"
                            value={this.state.ProductName}
                            onChange={this.handleInputChange}/>                         
                      </div>

                      <div className="InventryAddItem_form_group">
                        <label style={{marginBottom:'5px'}}>Unit Price</label>
                        <input type="Number"
                            className="InventryAddItem_input"
                            name="UnitPrice"
                            placeholder="Enter Unit Price"
                            value={this.state.UnitPrice}
                            onChange={this.handleInputChange}/>
                      </div>

                      <div className="InventryAddItem_form_group">
                        <label style={{marginBottom:'5px'}}>Qty</label>
                        <input type="Number"
                          className="InventryAddItem_input"
                          name="Qty"
                          placeholder="Enter Qty"
                          value={this.state.Qty}
                          onChange={this.handleInputChange}/> 
                      </div>

                      <div className="InventryAddItem_form_group">
                        <label style={{marginBottom:'5px'}}>Price</label>
                        <input type="Number"
                          className="InventryAddItem_input"
                          name="Price"
                          placeholder="Calculated Price"
                          value={this.state.Price= this.state.UnitPrice*this.state.Qty}
                          readOnly /> 
                      </div>

                </form>
              
                    <br/>
                         
                <div className="Inventory_AddPopUpBtn">
                    <button className = "InventryDemo_Btn"  type="submit"  onClick={this.autoFill}>
                      <i class="fas fa-bolt"></i>&nbsp; DEMO 
                    </button>

                    <a href="/Inventry">
                      <button className="InventryClose_Btn"> 
                        <i class="fas fa-times"></i>&nbsp;&nbsp;CLOSE
                      </button> 
                    </a> 

                    <button className="InventryAddItem_Btn" type="submit" onClick={this.onSubmit}>
                      <i class="fas fa-check"></i>&nbsp;&nbsp;SAVE
                    </button>
                </div>

              </div>               
            </div>
                
          </div>
        </div>
        {/* <!-- End ADD Item Modal --> */}



        {/* <!-- Start Table --> */}

        <div id="TitleContainer">
          <h1 id="TitleOfFunction">INVENTORY CONTROL</h1>
        </div>
             
        <button className = "addInventoryBtn" type="button" data-toggle="modal" data-target="#exampleModalCenter">
          <i class="fas fa-plus"></i>&nbsp;&nbsp;ADD Product
        </button>      

        <button className = "addInventoryBtn" type="button" onClick={this.generateReport}>
          <i class="fas fa-file-pdf"></i> &nbsp;&nbsp;Document
        </button>          




        <table className="tableFoodItem">
          
          <thead>
            <tr>
              <th style={{borderTopRightRadius:'1px'}} scope="col">Id</th>
              <th scope="col">ProductName</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th style={{borderTopRightRadius:'1px'}} scope="col"></th>
            </tr>
          </thead>
          
          <tbody>
            {this.state.posts.map((posts,index) =>(

                <tr key={index}>
                  
                  <td>{index+1}</td>
                  <td id="foddItem_th_name">{posts.ProductName}</td>
                  <td>{posts.UnitPrice}</td>
                  <td>{posts.Qty}</td>
                  <td>{posts.Price}</td>

                  <td className="action">
                    <a className="btn btn-warning" id="editBtn" href={`/Inventry/edit/${posts._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" id="deletetBtn" onClick={() =>this.onDelete(posts._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete   
                    </a>
                  </td>

                </tr>
            ))}
          </tbody>
            
        </table>
        {/* <!-- End the Table --> */} 

      </div>
    )
} }