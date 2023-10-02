import React, { Component } from 'react';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import CusItem from '../Images/CustomerUpdate.png';


export default class CustomerDetails extends Component {
  constructor(props){
    super(props);

    this.state={
        post:{}
    };
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/customer/getone/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          post:res.data.post
        });

        console.log(this.state.post);
      }
    });
  }

  render() {

    const {Fname,Lname,Pnumber,JoinDate,Point,type} = this.state.post;
    return (
      <div style={{marginTop:'20px'}}>

                  {/* ---------------------------------Nav Bar---------------------------------- */}
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
                  {/* ---------------------------------End Nav Bar---------------------------------- */}



                 <div className="CustomerUpdatedetails_container">
                    

                    <div className="CustomerContainerEdit">
                    
                        
                            <div id="CustomerImgContainerEdit">
                                <img alt="Item" className="activator" src={CusItem}/>
                            </div>
                        

                        <div className="CustomerContainerTable">
                            <h3>{Fname}</h3>
                            <hr/>

                            <table id="CustomerEditPageTable">

                                <tr>
                                    <th className="CustomerTableRow">Customer Name</th>
                                    <th className="CustomerTableCol">{Fname + " " + Lname}</th>
                                </tr>

                                <tr >
                                    <th className="CustomerTableRow">Phone Number</th>
                                    <th className="CustomerTableCol">{Pnumber}</th>

                                </tr>

                                <tr>
                                    <th className="CustomerTableRow">Joined Date</th>
                                    <th className="CustomerTableCol">{JoinDate}</th>
                                </tr>
                            
                                <tr>
                                    <th className="CustomerTableRow">Earned Point</th>
                                    <th className="CustomerTableCol">{Point}</th>
                                </tr>

                                <tr>
                                    <th className="CustomerTableRow">Type of Customer</th>
                                    <th className="CustomerTableCol">{type}</th>
                                </tr>
                            
                            </table>

                        </div>

                        <div className="CustomerTableBtn">                        

                            
                            <a href="/customer">
                                <button className="btn btn-secondary"> <i class="fas fa-angle-left"></i> &nbsp; Back</button> 
                            </a>

                        </div>
                    </div>
 
                </div>













        {/* <dl className="row">
          <dt className="col-sm-3">Last Name</dt>
          <dd className="col-sm-9">{Lname}</dd>

          <dt className="col-sm-3">Phone Number</dt>
          <dd className="col-sm-9">{Pnumber}</dd>

          <dt className="col-sm-3">Join Date</dt>
          <dd className="col-sm-9">{JoinDate}</dd>

          <dt className="col-sm-3">Point</dt>
          <dd className="col-sm-9">{Point}</dd>

          <dt className="col-sm-3">Type</dt>
          <dd className="col-sm-9">
            {type}
            </dd>
        </dl> */}
      </div>
    )
  }
}