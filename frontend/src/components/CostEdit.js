import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import EdiImg from '../Images/Costing Update Icon.png'
import UpdateView from '../Images/Cost Update View.png'

toast.configure()
class CostEdit extends Component {

  constructor(props){
    super(props);
    this.state={
        name:"",
        yearAndmonth:"",
        cost_LKR:"",
        type:""
    }
}

 //from create 

 handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit = (e) =>{
      
    e.preventDefault();

    const id = this.props.match.params.id;

    const {name,yearAndmonth,cost_LKR,type} = this.state;

    const data ={
      name:name,
      yearAndmonth:yearAndmonth,
      cost_LKR:cost_LKR,
      type:type
    }

    console.log(data)
   //________________validate inputs_____________________
    let namel = name.length;

   var numbers = /^[0-9.]+$/;
   if(namel == 0 || yearAndmonth == null || type == null || cost_LKR == null  || cost_LKR <= 0){

         if(namel == 0){
           toast.error('Please Enter Name', {
             position: "bottom-right",
             autoClose: 6000,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             });

         }

         
         if( yearAndmonth == null){
           toast.error('Please Select Year & Month', {
             position: "bottom-right",
             autoClose: 6000,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
           
             });

         }
         if( type == null){
           toast.error('Please Select Type', {
             position: "bottom-right",
             autoClose: 6000,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             });

         }
         if(cost_LKR == null ){
           toast.error('Please Enter Cost Value', {
             position: "bottom-right",
             autoClose: 6000,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             });                            
           }
           
         else if(cost_LKR <= 0 ){
           toast.error('Please Enter valid cost value', {
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

        axios.put(`/costing/update/${id}`,data).then((res) =>{

          if(res.data.success){ 
            toast.success("Cost Updated",{
              theme: "colored",
            });
            setTimeout(function(){
              window.location.replace('/costing');
          },1000);
            this.setState(
              {
                name:"",
                yearAndmonth:"",
                cost_LKR:"",
                type:""
              }
            )
          }
        })
  }
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    axios.get(`/costing/${id}`).then((res)=>{
        if(res.data.success){
            this.setState({
               name:res.data.post.name,
               yearAndmonth:res.data.post.yearAndmonth,
               cost_LKR:res.data.post.cost_LKR,
               type:res.data.post.type,
            });
        }
        console.log(this.state.post);
    });
}


render() {
    return (
      <div className="containerHome">

        {/*--------------------------------- Nav Bar Start-----------------------------*/}


              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">

                  <a className="navbar-brand" href="/ " style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
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


          <br/><br/>

          {/*--------------------------------- Nav Bar End-----------------------------*/}

         
          {/* _________________________________ Update Costing view _______________________________ */}



  
      <div id="updateCos">
        <div id="updateCosMainBox">

              <div id="updateCosImage">
                <img src={UpdateView} alt="Edit Costing"/>
              </div>

        <div id="updateCosTableBox">
        <br/>
            <h5 className="addUpTitle">{this.state.name}</h5>
       
              <table>
                    <tr>
                      <th>Year & Month</th>
                      <td>{this.state.yearAndmonth}</td>
                    </tr>
                    <tr>
                      <th>Cost (LKR)</th>
                      <td>{this.state.cost_LKR}</td>
                    </tr>
                    <tr>
                      <th> Cost Type</th>
                      <td>{this.state.type}</td>
                    </tr>
                </table>
                <br/><br/>
                
              <div id="UpdateViewButDiv">

              <a href="/costing">
                <button   className="btn btn-secondary"> <i class="fas fa-chevron-left">
                  </i> &nbsp;BACK</button> 
                </a>

                <button  className="btn btn-success" data-toggle="modal" data-target="#myModaledit"> <i className="fas fa-edit" id ="updateBtn2" >
                </i>&nbsp;UPDATE</button>

              </div>
            </div>
            </div>


          </div>
          
          

          {/*--------------------------------- UPDATE Costing POPUP -----------------------------*/}



<div className="container">

  {/* Modal */}
  <div className="modal fade" id="myModaledit" role="dialog">
    <div className="modal-dialog">
    
       {/* Modal content */}
      <div className="modal-content">
        <div className="addCosPopcloseBtn">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">

          <div>
          <img className="addCostImg"  src={EdiImg} alt="Edit Discount"/>
          </div>


          <h4 className="addCostTitle" >Update Costing</h4>

          <form className="needs-validation" noValidate>

          <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Name</label>
              <input type="name"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange} />
            </div>
            

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Year & Month</label>
              <input type="month"
              className="form-control"
              name="yearAndmonth"
              value={this.state.yearAndmonth}
              onChange={this.handleInputChange} />
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Cost (LKR)</label>
              <input type="number"
              className="form-control"
              name="cost_LKR"
              placeholder="Enter Cost (ex: 1200.00) "
              value={this.state.cost_LKR}
              onChange={this.handleInputChange} />
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Select Cost Type</label>
                   <select className="form-control" name="type" 
                      value={this.state.type}
                      onChange={this.handleInputChange}>
                        <option value="" selected disabled hidden>Choose Type</option>
                        <option value="Monthly Utilities">Monthly Utilities</option>
                        <option value="Telecom">Telecom</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Leasing and Finance">Leasing and Finance</option>
                        <option value="Charity and Donations">Charity and Donations</option>
                        <option value="Other">Other</option>
                   </select>
                </div>

                <button className="btn btn-success" id="updateBt2" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i class="far fa-save"></i>
              &nbsp; UPDATE
            </button>

            </form>



        </div>
        
      </div>
              
    </div>
  </div>
  
</div>

{/*--------------------------------- UPDATE Costing POPUP -----------------------------*/}


          </div>
    
    )
}
}


export default CostEdit;
