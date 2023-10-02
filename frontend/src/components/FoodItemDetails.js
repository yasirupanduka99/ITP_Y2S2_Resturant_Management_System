import React, { Component } from 'react';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';


export default class FoodItemDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    
    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/FoodItems/getone/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });

                console.log(this.state.post);
            }
        });
    }

  render() {

    const {ItemName,MCategory,SubCategory,ItemUnitPrice,ItemImg,createdAt,updatedAt} = this.state.post;

    return (

        <div>





        
        <nav className="!#">
            <div className="container-fluid">

                <a className="navbar-brand" href="/FoodItems" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
        </nav>








        <div className="FoodItemDetails_container">
            <h4>{ItemName}</h4>
            <hr/>

            <dl className="row">
                <dt className="col1">Main Category</dt>
                <dd className="col2">{MCategory}</dd>

                <dt className="col1">Sub Category</dt>
                <dd className="col2">{SubCategory}</dd>

                <dt className="col1">Item Unit Price</dt>
                <dd className="col2">Rs.{ItemUnitPrice}/=</dd>

                <dt className="col1">Item Added Date</dt>
                <dd className="col2">{createdAt}</dd>

                <dt className="col1">Item Last Updated Date </dt>
                <dd className="col2">{updatedAt}</dd>
            </dl>


            <center>
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="Item_Image" className="FoodItem_activator" style={{ width: '25%', height: '25%' }} src={ItemImg}/>
                </div>
            </center>
            
        </div> 


        


        </div>

         

    )
  }
}