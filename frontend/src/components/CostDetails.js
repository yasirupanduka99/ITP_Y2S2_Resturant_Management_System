import React, { Component } from 'react';
import axios from 'axios'; 
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import DetailsImg from '../Images/costDetails.png';




class PostDetails extends Component {
    constructor (props){
        super(props);
        this.state={
            post:{}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`/costing/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });
            }
            console.log(this.state.post);
        });
    }



    
    render() {

        const{name,yearAndmonth,cost_LKR,type,createdAt,updatedAt}=this.state.post;
        return (
            <div>

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


         

        <div className="CostDetailsCont">
            
            <div id="CosDetailsMainBox">

                <div id="CosDetailsImage">
                   <img src={DetailsImg} alt="Details Img"/>
                </div>

              <div id="costDetailsCon"> 
                    <br/>
                    <h5 className="addUpTitle">{name}</h5>

                    <table>
                            <tr>
                                <th>Year & Month</th>
                                <td>{yearAndmonth}</td>
                            </tr>
                            <tr>
                                <th>Cost (LKR)</th>
                                <td>{cost_LKR}</td>
                            </tr>
                            <tr>
                                <th>Cost Type</th>
                                <td>{type}</td>
                            </tr>
                            <tr>
                                <th> Cost Added Date</th>
                                <td>{createdAt}</td>
                            </tr>
                            <tr>
                                <th> Cost Last Updated Date</th>
                                <td>{updatedAt} </td>
                            </tr>
                        </table>
                        <br/><br/>

                <div className="CosDeteBackButDiv">
                    <a href="/costing">
                        <button   className="btn btn-secondary"> <i class="fas fa-chevron-left">
                    </i> &nbsp;BACK</button> 
                    </a>
                </div>

            

            </div>
            </div>
            </div>
            </div>
        );
    }
}

export default PostDetails;