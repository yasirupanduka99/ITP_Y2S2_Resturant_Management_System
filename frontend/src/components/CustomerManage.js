import React, { Component} from 'react';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {saveAs} from 'file-saver';


toast.configure()

export default class CustomerManage extends Component {
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
    axios.get("/customer/get").then(res =>{
      if(res.data.success){
        this.setState({
          posts:res.data.existingPosts
        });
      console.log(this.state.posts);
      }
    });
  }


  onDelete = (id) =>{
    axios.delete(`/customer/delete/${id}`).then((res) =>{
      toast.error("Customer Account Deleted",{

        theme: "colored",
        
        icon: false,
        
        });
      this.retrievePosts();
    })
  }

  filterData(posts,searchKey){
    const result = posts.filter((post) =>
    post.Fname.toLowerCase().includes(searchKey) 
    

    )

    this.setState({posts:result})

  }

  handleSearchArea = (e) =>{
    const searchKey = e.currentTarget.value;

    axios.get("/customer/get").then(res =>{
      if(res.data.success){
        
        this.filterData(res.data.existingPosts,searchKey)
      }
    });
  }








  /*-----------------------PDF Generating Start-----------------------------*/



async generateReport() {

  const obj = { customer: this.state.posts }
  
  await axios.post('/generateCustomerReport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {
  
  //alert('Report Generated')
  
  toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })
  
  console.log(res)
  
  console.log(res.data)
  
  const pdfBlog = new Blob([res.data], { type: 'application/pdf' });
  
  saveAs(pdfBlog, 'CustomerReport.pdf');
  
  //window.open(res.data, '_blank');
  
  }).catch((err) => {
  
  console.log(err.message)
  
  })
  
  console.log(obj)
  
  }




  render(){
    return (
      <div className="container1" id="CusManHome">

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


          <br/><br/>

        {/* ----------------------------Table-------------------------------- */}

        <div id="TitleContainer">
          <h1 id="TitleOfFunction">CUSTOMER ACCOUNTS</h1>
        </div>

        <button className = "addInventoryBtn" type="button" onClick={this.generateReport}>
          <i class="fas fa-file-pdf"></i> &nbsp;&nbsp;Document
        </button> 

        <table className="tableFoodItem" id="tableCUS">
          
          <thead>
            <tr>
              <th id="cusMan_th" style={{borderTopLeftRadius:'10px'}} scope="col">Id</th>
              <th id="cusMan_th" scope="col">First Name</th>
              <th id="cusMan_th" scope="col">Last Name</th>
              <th id="cusMan_th" scope="col">Phone Number</th>
              <th id="cusMan_th" scope="col">Join Date</th>
              <th id="cusMan_th" scope="col">Point</th>
              <th id="cusMan_th" scope="col">Type</th>

              <th id="cusMan_th" style={{borderTopRightRadius:'1px'}} scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((posts,index) => (
              <tr key={index}>
                <td id="cusMan_td">{index+1}</td>
                <td id="cusMan_td">
                    <a href={`/customer/details/${posts._id}`} style={{textDecoration:'none',color:'black'}}>
                        {posts.Fname}
                    </a>
                </td>    
                <td id="cusMan_td">{posts.Lname}</td>
                <td id="cusMan_td">{posts.Pnumber}</td>
                <td id="cusMan_td">{posts.JoinDate}</td>
                <td id="cusMan_td">{posts.Point}</td>
                <td id="cusMan_td">{posts.type}</td>

                <td id="cusMan_td">
                   <button type="button" className="editBtn1"><a style={{textDecoration:'none',color:'white'}} href={`/customer/edit/${posts._id}`}>Edit</a></button>
                  &nbsp;
                  <button type="button" className="deleteBtn1"><a  style={{textDecoration:'none',color:'white'}} onClick={() => this.onDelete(posts._id)}>Delete</a></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          
      </div>
    )
  }
} 