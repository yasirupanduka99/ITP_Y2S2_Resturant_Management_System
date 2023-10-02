import React, { Component } from 'react'
import axios from 'axios'
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export default class CustomerCreate extends Component {

  constructor(props){
    super(props);
    this.state={
      Fname:"",
      Lname:"",
      Pnumber:"",
      JoinDate:"",
      Point:2,
      type:"Regular"
    }
  }

  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }


  


  onSubmit = (e) =>{

    e.preventDefault();

    const {Fname,Lname,Pnumber,JoinDate,Point,type} = this.state;

    


    const data ={
      Fname:Fname,
      Lname:Lname,
      Pnumber:Pnumber,
      JoinDate:JoinDate,
      Point:2,
      type:type
    }

    console.log(data)

// //_____validate inputs________

let Fnamelenth = Fname.length;
let Lnamelenth = Lname.length;
let Pnumberlenth = Pnumber.length;
let JoinDatelenth = JoinDate.length;

                      
      if(Fname == null || Fnamelenth == 0 || Lname == null || Lnamelenth == 0|| Pnumber == null || Pnumberlenth == 0|| JoinDate == null || JoinDatelenth == 0){

        if(Fname == null ||  Fnamelenth == 0){
          toast.error('Please Enter First Name', {

            position: "bottom-right",
            
            autoClose: 6000,
            
            closeOnClick: true,
            
            pauseOnHover: true,
            
            draggable: true,
            
            progress: undefined,
            
            });
        }
          if( Lname == null|| Lnamelenth == 0){
            toast.error('Please Enter Last Name', {

              position: "bottom-right",
              
              autoClose: 6000,
              
              closeOnClick: true,
              
              pauseOnHover: true,
              
              draggable: true,
              
              progress: undefined,
              
              });
          }
          if( Pnumber == null|| Pnumberlenth == 0){
            toast.error('Please Phone Number', {

              position: "bottom-right",
              
              autoClose: 6000,
              
              closeOnClick: true,
              
              pauseOnHover: true,
              
              draggable: true,
              
              progress: undefined,
              
              });
          }

          if( JoinDate == null || JoinDatelenth == 0){
            toast.error('Please Join Date', {

              position: "bottom-right",
              
              autoClose: 6000,
              
              closeOnClick: true,
              
              pauseOnHover: true,
              
              draggable: true,
              
              progress: undefined,
              
              });
          }
          
      }
         
  else{

    axios.post("/customer/save",data).then((res) =>{
      if(res.data.success){
        toast.success("Customer Successfully Added",{

          theme: "colored",
          
          });
          
          setTimeout(function(){
          
          window.location.replace('/Cahier_Home');
          
          },800);

        this.setState(
          {
            Fname:"",
            Lname:"",
            Pnumber:"",
            JoinDate:"",
            Point:"",
            type:""
          }
        )
      }
    })
  
  }
    
  }


  render(){
    return(



      <div>


          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
  
                  <a className="navbar-brand" href="/" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
   
  
              </div>
          </nav>



      <div className="display">



      <div className="col-md-8 mt-4 mx-auto" id="adduser">
        <h1 className-="h3 mb-3 font-weight-normal">Add New Customer</h1>
          <form className="needs-validation" noValidate>
            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>First Name</label>
              <input type="text"
              className="form-control"
              name="Fname"
              placeholder="Enter First Name"
              value={this.state.Fname}
              onChange={this.handleInputChange}/>
              <div id="cuserrfname"> </div>

            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Last Name</label>
              <input type="text"
              className="form-control"
              name="Lname"
              placeholder="Enter Last Name"
              value={this.state.Lname}
              onChange={this.handleInputChange}/>
              <div id="cuserrlname"> </div>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Phone Number</label>
              <input type="text"
              className="form-control"
              name="Pnumber"
              placeholder="Enter Phone Number"
              value={this.state.Pnumber}
              onChange={this.handleInputChange}/>
              <div id="cuserrpnumber"> </div>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Join Date</label>
              <input type="text"
              className="form-control"
              name="JoinDate"
              placeholder="Enter Join Date"
              value={this.state.JoinDate}
              onChange={this.handleInputChange}/>
              <div id="cuserrjoindate"> </div>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Point</label>
              <input type="text"
              className="form-control"
              name="Point"
              placeholder="Points"
              value={this.state.Point} readOnly/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Type</label>
              <input type="text"
              className="form-control"
              name="type"
              placeholder="Enter Type"
              value={this.state.type}
              onChange={this.handleInputChange} readOnly/>
            </div>

            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Add Customer
            </button>
          </form>
      </div>
      </div>


  </div>





    )
  }
}