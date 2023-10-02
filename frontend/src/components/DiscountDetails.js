// import React, { Component } from 'react';
// import axios from 'axios'

// export default class DiscountDetails extends Component {
//   constructor(props){
//     super(props);

//     this.state={
//         post:{}
//     };
//   }

//   componentDidMount(){

//     const id = this.props.match.params.id;

//     axios.get(`/discount/${id}`).then((res) =>{
//       if(res.data.success){
//         this.setState({
//           post:res.data.post
//         });

//         console.log(this.state.post);
//       }
//     });
//   }

//   render() {

//     const {discountName,minAmount,percentage,maxLimit} = this.state.post;
//     return (

//       <div className="containerHome">

//       <div className="Form">
//                 <div classNAme="col-md-8 mt-4 mx-auto" id="updateDis">
//                   <h1 className-="h3 mb-3 font-weight-normal">Add New Discount</h1>


//                     <form className="needs-validation" noValidate>

                      
//                       <div className="form-group" style={{marginBottom:'15px'}}>
//                         <label style={{marginBottom:'5px'}}>Discount Name</label>
//                         <input type="text"
//                         className="form-control"
//                         name="discountName"
//                         placeholder="Enter Discount Name"
//                         value={this.state.discountName}
//                         onChange={this.handleInputChange}/>
//                       </div>

//                       <div className="form-group" style={{marginBottom:'15px'}}>
//                         <label style={{marginBottom:'5px'}}>Min Amount(Rs.)</label>
//                         <input type="text"
//                         className="form-control"
//                         name="minAmount"
//                         placeholder="Enter Min Amount"
//                         value={this.state.minAmount}
//                         onChange={this.handleInputChange}/>
//                       </div>

//                       <div className="form-group" style={{marginBottom:'15px'}}>
//                         <label style={{marginBottom:'5px'}}>Percentage</label>
//                         <input type="text"
//                         className="form-control"
//                         name="percentage"
//                         placeholder="Enter Percentage"
//                         value={this.state.percentage}
//                         onChange={this.handleInputChange}/>
//                       </div>

//                       <div className="form-group" style={{marginBottom:'15px'}}>
//                         <label style={{marginBottom:'5px'}}>Max Limit</label>
//                         <input type="text"
//                         className="form-control"
//                         name="maxLimit"
//                         placeholder="Enter Max Limit"
//                         value={this.state.maxLimit}
//                         onChange={this.handleInputChange}/>
//                       </div>

//                       <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
//                         <i className="far fa-check-squre"></i>
//                         &nbsp; ADD
//                       </button>
//                     </form>
//                 </div>
          
//             <div style={{marginTop:'20px'}}>
//               <h4>{discountName}</h4>
//               <hr/>


//               <dl className="row">
//                 <dt className="col-sm-3">Min Amount</dt>
//                 <dd className="col-sm-9">{minAmount}</dd>

//                 <dt className="col-sm-3">Percentage</dt>
//                 <dd className="col-sm-9">{percentage}</dd>

//                 <dt className="col-sm-3">Max Limit</dt>
//                 <dd className="col-sm-9">{maxLimit}</dd>
//               </dl>
//             </div>

//             </div>
//       </div>



//     )
//   }
// }