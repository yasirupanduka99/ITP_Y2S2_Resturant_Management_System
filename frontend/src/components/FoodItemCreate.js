/*import React, { Component } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import additemImg from '../Images/additemImg.png';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';

export default class FoodItemCreate extends Component {

    constructor(props){
        super(props);
        this.state={
            ItemName:"",
            MCategory:"",
            SubCategory:"",
            ItemUnitPrice:"",
            ItemImg:""
        }
    }

    //handleInputChange  <----------------------------------------------
    handleInputChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const {ItemName,MCategory,SubCategory,ItemUnitPrice,ItemImg} = this.state;

        const data = {
            ItemName:ItemName,
            MCategory:MCategory,
            SubCategory:SubCategory,
            ItemUnitPrice:ItemUnitPrice,
            ItemImg:ItemImg
        }

        console.log(data)

        axios.post("/post/save",data).then((res) => {
            if(res.data.success){
                alert("Item Added Succesfully!")
                this.setState( 
                    {
                        ItemName:"",
                        MCategory:"",
                        SubCategory:"",
                        ItemUnitPrice:"",
                        ItemImg:""
                    })
            }
        })
    }


  render() {
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






        <div className="container_addItem_POPUP">
            <div className="imgContainer">
                <img src={additemImg} alt='ItemLOGO'/>
            </div>
            
            <div className="formContainer">
                <h1 className="addItem_h1"><u>ADD NEW ITEM</u></h1>
                <form className="addItem_form" noValidate>


                    <div className="addItem_form_group">
                        <label>Item Name</label>
                        <input type="text"
                        className="addItem_input"
                        name="ItemName"
                        placeHolder="Enter New Item Name"
                        value={this.state.ItemName}
                        onChange={this.handleInputChange} />
                    </div>


                    <div className="addItem_form_group">
                        <label>Main Category</label>
                        <input type="text"
                        className="addItem_input"
                        name="MCategory"
                        placeHolder="Enter New Main Category"
                        value={this.state.MCategory}
                        onChange={this.handleInputChange} />
                    </div>


                    <div className="addItem_form_group">
                        <label>Sub Category</label>
                        <input type="text"
                        className="addItem_input"
                        name="SubCategory"
                        placeHolder="Enter Sub Category"
                        value={this.state.SubCategory}
                        onChange={this.handleInputChange} />
                    </div>


                    <div className="addItem_form_group">
                        <label>Item Unit Price(Rs.)</label>
                        <input type="text"
                        className="addItem_input"
                        name="ItemUnitPrice"
                        placeHolder="Enter New Item Unit Price"
                        value={this.state.ItemUnitPrice}
                        onChange={this.handleInputChange} />
                    </div>


                    <div className="addItem_form_group">
                    <FileBase64
                          type="file"
                          name="ItemImg"
                          multiple={ false }
                          onDone={({ base64 }) => this.setState({ ItemImg: base64 })}
                    />
                    </div>


                    <button className="addItem_Btn" type="submit" onClick={this.onSubmit}>save</button>

                </form>
            </div>
            
        </div>



        </div>

        

    )
  }
}*/