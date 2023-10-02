import React, { Component} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import addDiscount from '../Images/addDis.png';
import {saveAs} from 'file-saver';

toast.configure()

export default class Discount extends Component {
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
    axios.get("/discounts").then(res =>{
      if(res.data.success){
        this.setState({
          posts:res.data.existingPosts
        });
      console.log(this.state.posts);
      }
    });
  }


  onDelete = (id) =>{
    axios.delete(`/discount/delete/${id}`).then((res) =>{
      //alert("Deteted Successfully");
      toast.error("Discount Deleted",{
        theme: "colored",
        icon: false,
      });
      this.retrievePosts();
    })
  }

  filterData(posts,searchKey){
    const result = posts.filter((post) =>
    post.discountName.toLowerCase().includes(searchKey)
    )

    this.setState({posts:result})
  }

  handleSearchArea = (e) =>{
    //console.log(e.currentTarget.value);
    const searchKey = e.currentTarget.value;
    axios.get("/discounts").then(res =>{
      if(res.data.success){
        
        this.filterData(res.data.existingPosts,searchKey)
      }
    });
  }

/*--------------------------------- UPDATE DISCOUNT POPUP -----------------------------*/


/*--------------------------------- UPDATE DISCOUNT POPUP -----------------------------*/


  /*--------------------------------- ADD DISCOUNT POPUP -----------------------------*/
// constructor(props){
//   super(props);
//   this.state={
//     discountName:"",
//     minAmount:"",
//     percentage:"",
//     maxLimit:""
//   }
// }

handleInputChange = (e) =>{
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
    discountName:"Birthday",
    minAmount:"4500",
    percentage:1,
    maxLimit:"6000"
  }

  console.log(data)
  axios.post("/discount/insert",data).then((res) =>{
    if(res.data.success){
      //alert("Post Created")
      toast.success("Discount added Successfuly!",{
        theme: "colored",
      });     //ADD POPUP ALERTS
      
      setTimeout(function(){
        window.location.replace('/discount');
    },1000);

      this.setState(
        {
          discountName:"",
          minAmount:"",
          percentage:"",
          maxLimit:""
        }
      )
    }
  })
  }
// <!-- Demo End -->








onSubmit = (e) =>{
  e.preventDefault();

  const {discountName,minAmount,percentage,maxLimit} = this.state;

  const data ={
    discountName:discountName,
    minAmount:minAmount,
    percentage:percentage,
    maxLimit:maxLimit
  }

  console.log(data)

{/* <!----------------------- ADD POPUP ALERTS ---------------------------------> */}

if (discountName== null || minAmount == null || minAmount <=0 || percentage == null || percentage <=0 || maxLimit == null  ||  maxLimit <=0  ){

      if (discountName == null){
        toast.error('Please Enter Discount Name', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      if (minAmount == null || minAmount <=0 ){
        if (minAmount == null ){
          toast.error('Please Min Amount', {
            position: "bottom-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else {
          toast.error('MinAmount Cannot be Zero/Minus', {
            position: "bottom-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }

      if (maxLimit == null || maxLimit <=0 ){
        if (maxLimit == null ){
          toast.error('Please Enter Max Limit', {
            position: "bottom-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else {
          toast.error('MaxLimit Cannot be Zero/Minus', {
            position: "bottom-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }

      if (percentage == null || percentage <=0){
        if(percentage == null){
        toast.error('Please Enter Percentage', {
          position: "bottom-right",
          autoClose: 6000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }
        else{
          toast.error('Percentage Cannot be Zero/Minus', {
            position: "bottom-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }

  {/* <!----------------------- ADD POPUP ALERTS ---------------------------------> */}
}


else {
        axios.post("/discount/insert",data).then((res) =>{
          if(res.data.success){
            //alert("Post Created")
            toast.success("Discount added Successfuly!",{
              theme: "colored",
            });     //ADD POPUP ALERTS
            
            setTimeout(function(){
              window.location.replace('/discount');
          },1000);

            this.setState(
              {
                discountName:"",
                minAmount:"",
                percentage:"",
                maxLimit:""
              }
            )
          }
        })
    }
  }
/*--------------------------------- ADD DISCOUNT POPUP -----------------------------*/




/*--------------------------------- PDF GENERATE -----------------------------*/


//-----------------------------------Generate Report--------------------------//

async generateReport() {

  const obj = { discounts: this.state.posts }

  await axios.post('/DiscountReport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {

      //alert('Report Generated')
      toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })
      console.log(res)
      console.log(res.data)

      const pdfBlog = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlog, 'Discount_Details_Report.pdf');

      //window.open(res.data, '_blank');



  }).catch((err) => {
      console.log(err.message)
  })

  console.log(obj)

}














/*--------------------------------- PDF GENERATE -----------------------------*/





  render(){
    return (

      <div className="containerHome">



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



{/*--------------------------------- ADD DISCOUNT POPUP -----------------------------*/}
<div className="DiscountcontainerPopup">

  {/* Modal */}
  <div className="modal fade" id="addDisModal" role="dialog">
    <div className="modal-dialog">
    
       {/* Modal content */}
      <div className="modal-content">
        <div className="addDisPopcloseBtn">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="modal-body">

          <div className="addDisImg">
          <img src={addDiscount} alt="Add Discount"/>
          </div>


          <h4 className="addDisTitle">Add Discount</h4>
          <form className="needs-validation" noValidate >

                
            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Discount Name</label>
              <input type="text"
              required="required"
              className="form-control"
              name="discountName"
              placeholder="Enter Discount Name"
              value={this.state.discountName}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Min Amount(Rs.)</label>
              <input type="number"
              className="form-control"
              name="minAmount"
              placeholder="Enter Min Amount"
              value={this.state.minAmount}
              onChange={this.handleInputChange}/>
            </div>


            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Percentage</label>
              <input type="number"
              className="form-control"
              name="percentage"
              placeholder="Enter Percentage"
              value={this.state.percentage}
              onChange={this.handleInputChange}/>
            </div>

            <div className="form-group" style={{marginBottom:'15px'}}>
              <label style={{marginBottom:'5px'}}>Max Limit</label>
              <input type="number"
              className="form-control"
              name="maxLimit"
              placeholder="Enter Max Limit"
              value={this.state.maxLimit}
              onChange={this.handleInputChange}/>
            </div>

            <div className = "BUTTONS">

            <button className = "btn btn-success"  id="demoBtn" type="submit"  onClick={this.autoFill}>
                <i class="fas fa-bolt"></i>
                &nbsp; DEMO 
              </button>

              <button className="btn btn-success" id="addBtn" type="submit"  onClick={this.onSubmit}>
                <i className="far fa-check-square"></i>
                &nbsp; ADD
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
{/*--------------------------------- ADD DISCOUNT POPUP -----------------------------*/}




{/*--------------------------------- DISCOUNT TABLE -----------------------------*/}
<div id="distabhomeid">
          <table className="DiscountTableHome">
            <thead>
              <tr>
                <th className="th1">Manage Discounts<br/>
                {/* <button className="UPDATEBtn"><a href="/add" style={{textDecoration:'none',color:'white'}}>Add Discount</a></button> */}
                <button className="UPDATEBtn" data-toggle="modal" data-target="#addDisModal">Add Discount</button>
                {/* <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> */}
                </th>
                <th id="tab_th" className="th1"></th>
                <th id="tab_th" className="th1"></th>
                <th id="tab_th" className="th1"></th>
                <th id="tab_th" className="th1"></th>
                <th id="tab_th" className="th1"><button className="PDFBtn" onClick={this.generateReport}><i class="fas fa-file-pdf" ><b id="pdfGenerate">GENERATE</b></i></button></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th id="tab_th" scope="col">Discount No.</th>
                <th id="tab_th" scope="col">Discount Name</th>
                <th id="tab_th" scope="col">Min Amount</th>
                <th id="tab_th"scope="col">Percentage</th>
                <th id="tab_th" scope="col">Max Limit</th>
                <th id="tab_th" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((posts,index) =>(
                <tr key={index}>
                  <td className="tab_td" id="discountNumber" scope="row">{index+1}
                  </td>

                  <td className="tab_td">
                      {/* <a href={`/discountDetails/${posts._id}`} style = {{textDecoration:'none'}}> */}
                      {posts.discountName}
                      {/* </a> */}
                  </td>

                  <td className="tab_td">Rs. {posts.minAmount}</td>
                  <td className="tab_td">{posts.percentage}%</td>
                  <td className="tab_td">Rs. {posts.maxLimit}</td>
                  <td className="tab_td">
                  <a className="btn btn-warning" id="EditDis" href={`/editDiscount/${posts._id}`}>
                      <i className="fas fa-edit" ></i>&nbsp;Edit
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
</div>
{/*--------------------------------- DISCOUNT TABLE -----------------------------*/}
          
            
</div>
      )
  }
} 