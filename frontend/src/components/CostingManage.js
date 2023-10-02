import React, { Component } from 'react';
import axios from 'axios'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import CostAddImg from '../Images/Costing Add Icon.png';
import {saveAs} from 'file-saver';

toast.configure()
class CostingManage extends Component {

            constructor (props){
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
              axios.get("/costing")
                    .then(res =>{
                      if(res.data.success){
                        this.setState({
                          posts:res.data.existingPosts
                        });
                        console.log(this.state.posts);
                      }

                    });
                    
            }


            onDelete = (id) =>{
              axios.delete(`/costing/delete/${id}`)
              .then((res) =>{
                toast.error("Cost Deleted",{
                  theme: "colored",
                  icon: false,
                });
                this.retrievePosts();
              })
            }



       /*--------------------------------- Search FU Start -------------------------------*/
          
          handleSearchArea = (e) =>{
          
              const searchKey = e.currentTarget.value;
          
              axios.get("/costing")
                    .then(res =>{
                      if(res.data.success){
                        this.filterData(res.data.existingPosts,searchKey)
                      }

                    });
          }

          filterData(posts,searchKey){

            const result = posts.filter((post) =>
                post.name.toLowerCase().includes(searchKey)||
                post.type.toLowerCase().includes(searchKey)
            );
        
                this.setState({posts:result})
        
        }


        /*--------------------------------- Search FU End -------------------------------*/



       /*--------------------------------- ADD Cost POPUP Fu Start -------------------------------*/


                      handleInputChange = (e) =>{
                      const {name,value} = e.target;

                      this.setState({
                        ...this.state,
                        [name]:value
                      })

                      }
       /*--------- Auto Fill ADD Cost POPUP  ----------*/

                      autoFill = (e) =>{
                        e.preventDefault();
                        const data ={
                          name:"Children's Day Event",
                          yearAndmonth:"2021-10",
                          cost_LKR:23532.89,
                          type:"Other"
                        }
                        console.log(data)

                            axios.post("/costing/save",data).then((res) =>{
                              if(res.data.success){
                                toast.success("Cost Successfully Added",{
                                  theme: "colored",
                                });
                                setTimeout(function(){
                                  window.location.replace('/costing');
                                },1500);
                                
                                this.setState(
                                  {
                                    name:"",
                                    yearAndmonth:"",
                                    cost_LKR:"",
                                    type:"",
                                  }
                                )
                              }
                            })
                        }

            /*--------- Auto Fill ADD Cost POPUP End ----------*/


                      onSubmit = (e) =>{
                      e.preventDefault();

                      
                      const {name,yearAndmonth,cost_LKR,type} = this.state;

                      const data ={
                        name:name,
                        yearAndmonth:yearAndmonth,
                        cost_LKR:cost_LKR,
                        type:type
                      }
                      console.log(data)

                      //________________validate inputs_____________________
                      var numbers = /^[0-9.]+$/;
                      
                      if(name == null || yearAndmonth == null || type == null || cost_LKR == null || !cost_LKR.match(numbers) || cost_LKR <= 0){

                            if(name == null){
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
                              else if(!cost_LKR.match(numbers)){
                                toast.error('Cost Allowed  Numeric Characters Only', {
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
                          axios.post("/costing/save",data).then((res) =>{
                            if(res.data.success){
                              toast.success("Cost Successfully Added",{
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
                                  type:"",
                                }
                              )
                            }
                          })
                          
                    }

                      }

        /*--------------------------------- ADD Cost POPUP Fu End -----------------------------*/


        /*-----------------------PDF Generating Start-----------------------------*/

        
        async generateReport() {
          const obj = { costing: this.state.posts }
          await axios.post('/costingReport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {
              //alert('Report Generated')
              toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })
              console.log(res)
              console.log(res.data)
  
  
              const pdfBlog = new Blob([res.data], { type: 'application/pdf' });
              saveAs(pdfBlog, 'costingPDF.pdf');
  
              //window.open(res.data, '_blank');
  
          }).catch((err) => {
              console.log(err.message)
          })
          console.log(obj)
      }



  render() {
    
    return (
      <div className="containerHome">

{/*--------------------------------- Nav Bar Start-----------------------------*/}


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


          <br/><br/>
{/*--------------------------------- Nav Bar End-----------------------------*/}


             {/*--------------------------------- ADD Cost POPUP Start -----------------------------*/}
                <div className="container">

                  {/* Modal */}
                  <div className="modal fade" id="addCostPop" role="dialog">
                    <div className="modal-dialog">
                    
                      {/* Modal content */}
                      <div className="modal-content">
                        <div className="addCosPopcloseBtn">
                        <a href="/costing">
                          <button type="button" className="close" >&times;</button>
                          </a>
                        </div>
                        <div className="modal-body">

                          <div>
                               <img className="addCostImg" src={CostAddImg} alt="Add Costing"/>
                          </div>

                          <h4 className="addCostTitle">Add Cost</h4>
                                <br/>



           <form className="needs-validation" noValidate>
                <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Name</label>
                  <input type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={this.handleInputChange}/>
                </div>
    
                <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Year & Month</label>
                  <input type="month"
                  className="form-control"
                  name="yearAndmonth"
                  value={this.state.yearAndmonth}
                  onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Cost (LKR)</label>
                  <input type="text"
                  className="form-control"
                  name="cost_LKR"
                  placeholder="Enter Cost (ex: 1200.00)"
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
           </form>

           <div className="addFormBtn">

                <button  className = "CostingAutoFillBt"  type="submit"  onClick={this.autoFill}>
                <i class="fas fa-bolt"></i>&nbsp; DEMO &nbsp; 
                </button>

                <a href="/costing">
                <button id="CostaddBtn"  className="btn btn-danger"> <i class="fas fa-times">
                  </i>&nbsp;&nbsp;CLOSE</button> 
                </a>

                <button className="btn btn-success" id="CostaddBtn" type="submit"  onClick={this.onSubmit}>
                <i class="fas fa-check"></i>
                  &nbsp; ADD &nbsp; 
                </button>

              
            </div>

                        </div>
                        
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
                {/*--------------------------------- ADD Cost POPUP End -----------------------------*/}


          
          <button className = "addCosBtn" type="button" data-toggle="modal" data-target="#addCostPop">
          <i class="fas fa-plus-circle"></i> &nbsp; ADD NEW COST</button>

          <button className = "addCosBtn" id="ReportBtn" type="button" onClick={this.generateReport}>
          <i class="fas fa-file-download"></i> &nbsp; GENERATE REPORT</button>


          <div lassName = "addCosBtn" id="ReportBtn"  style={{float:"right"}}>
                   <select className = "addCosBtn" id="ReportBtn" name="type"  
                      value={this.state.type}
                      onChange={this.handleSearchArea}>
                        <option value="" selected disabled hidden>CHOOSE TYPE</option>
                        <option value="">All</option>
                        <option value="monthly utilities">Monthly Utilities</option>
                        <option value="telecom">Telecom</option>
                        <option value="insurance">Insurance</option>
                        <option value="leasing and finance">Leasing and Finance</option>
                        <option value="charity and donations">Charity and Donations</option>
                        <option value="other">Other</option>
                   </select>
                </div>

         
{/*--------------------------------- Costing Table Start-----------------------------*/}


  <div id="TitleContainer1">
     <h1 id="TitleOfFunction">COSTING</h1>
  </div>
  <div id="Costerr"></div>

          <table className="tableFoodItem">
            <thead>
              <tr>
                <th style={{borderTopLeftRadius:'10px'}} scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Year & Month</th>
                <th scope="col">Cost (LKR)</th>
                <th scope="col">Type</th>
                <th style={{borderTopRightRadius:'1px'}} scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((posts,index) =>(
                <tr key={index}>
                  <td id="costingID" scope="row">{index+1}
                  </td>

                  <td id="foddItem_th_name"><a href={`/costing/details/${posts._id}`} style={{textDecoration:'none'}}>{posts.name}</a></td>
                  <td>{posts.yearAndmonth}</td>
                  <td>Rs.{posts.cost_LKR}</td>
                  <td>{posts.type}</td>
                  <td>
                    <a className="btn btn-warning" id="editBtn" href={`/costing/edit/${posts._id}`}>
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


          {/*--------------------------------- Costing Table End-----------------------------*/}


        </div>
      )
  }


  }



export default CostingManage;