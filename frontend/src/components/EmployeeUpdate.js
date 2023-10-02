import React, { Component } from 'react';
import axios from 'axios';
import staffEdit from '../Images/staffEdit.png';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';


export default class EmployeeUpdate extends Component {
    constructor(props) {
        super(props);

        this.onChangeStaffId = this.onChangeStaffId.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            StaffId: '',
            Role: '',
            Name: '',
            NIC: '',
            Salary: '',
            Employees: []
        }
    }

    componentDidMount() {
        axios.get('/Employees/getone/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    StaffId: response.data.StaffId,
                    Role: response.data.Role,
                    NIC: response.data.NIC,
                    Name: response.data.Name,
                    Salary: response.data.Salary,
                })
            })
            .catch(function(error) {
                console.log(error);
            })


    }

    onChangeStaffId(e) {
        this.setState({
            StaffId: e.target.value
        })
    }

    //set the Role

    onChangeRole(e) {
        this.setState({
            Role: e.target.value
        })
    }

    //set Name

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        })
    }



    //Set NIC

    onChangeNIC(e) {
        this.setState({
            NIC: e.target.value
        })
    }

    //Set Salary

    onChangeSalary(e) {
        this.setState({
            Salary: e.target.value
        })
    }



    onSubmit(e) {
        e.preventDefault();

        const Employee = {
            StaffId: this.state.StaffId,
            Role: this.state.Role,
            Name: this.state.Name,
            NIC: this.state.NIC,
            Salary: this.state.Salary


        }

        console.log(Employee);

        axios.post('/Employees/update/' + this.props.match.params.id, Employee)
            .then(res => console.log(res.data));

        window.location = '/Employee/';

    }



    render() {

        return ( 

            <div>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <a className="navbar-brand" href="/" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>

        </nav>

            {/* <div>
              <button className = "EditFoodItemBtn" type="button" data-toggle="modal" data-target="#exampleEmployeeCenteredit">Edit</button>
            </div> */}

            {/* <!-- EDIT Item Modal -->*/}



<div className="staffContainerupdatebox">
<div className="staffContainer">
    

                           <div id="StaffImgContainerEdit">
                                <img alt="Item" className="activator" src={staffEdit}/>
                            </div>


   




<div className="StaffTableBtn">                        

<button id="StaffTableEditBtn" type="button" data-toggle="modal" data-target="#exampleEmployeeCenteredit"><i class="fas fa-pencil-alt"></i> &nbsp;  Edit</button>  
&nbsp; &nbsp;


<a href="/Employee/">
    <button id ="staffbtn1" className="btn btn-secondary"> <i class="fas fa-angle-left"></i> &nbsp; Back</button> 
</a>

</div>

</div>


</div>





           













<div className="EmployeeContainerPopup">
            <div className="modal fade" id="exampleEmployeeCenteredit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">

                
                

            <div id="container_addFoodItemEdit_POPUP" className="modal-content">

              <div className="closeBtnContainer">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>


              <div className="editStaffImg">
                <img src={staffEdit} alt='updateItemLOGO'/>
            </div>
            
            <div className="formContainer">

            <h3 className="addStaffTitle"> Update Staff Member </h3> 

            <form onSubmit = { this.onSubmit } >

            <div className="inputBoxes">

                    <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                        <label > StaffID </label>  
                        <input type = "text"
                        required className = "form-control"
                        id="inputBox"
                        value = { this.state.StaffId }
                        onChange = { this.onChangeStaffId }/> 
                    </div > 


                    <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                        <label > Role </label> 
                        {/* < input type = "text"
                        required className = "form-control"
                        id="inputBox"
                        value = { this.state.Role }
                        onChange = { this.onChangeRole }/>  */}

                    


                    {/* --------------------------------------------------------------------------- */}



                   
                    <select className="form-control" name="type" 
                      value = { this.state.Role }
                      onChange = { this.onChangeRole }>
                        <option value="" selected disabled hidden>Choose Role</option>
                        <option value="Helper">Helper</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Chef">Chef</option>
                        <option value="Inventory Keeper">Inventory Keeper</option>
                        <option value="Waiter">Waiter</option>
                        <option value="Other">Other</option>
                   </select>
                   <div class="validatealert" id = "typeErrMsg"></div>
                </div>














                    {/* --------------------------------------------------------------------------- */}



                    


                    <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                        <label > Name </label> 
                        < input type = "text"
                        required className = "form-control "
                        id="inputBox"
                        value = { this.state.Name }
                        onChange = { this.onChangeName }/> 
                    </div >


                    <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                        <label > NIC </label>
                        <input type = "text"
                        required className = "form-control"
                        id="inputBox"
                        value = { this.state.NIC }
                        onChange = { this.onChangeNIC }/> 
                    </div >


                    <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                        <label > Salary: </label>  
                        < input type = "text"
                        required className = "form-control"
                        id="inputBox"
                        value = { this.state.Salary }
                        onChange = { this.onChangeSalary }/> 
                    </div >



                    <div className = "form-group" >
                        <button type = "submit"
                        value = "UPDATE"
                        className = "btn btn-primary"
                        id="addStaffBtn"> <i class="far fa-edit"></i>&nbsp;&nbsp; Update</button>
                    </div> 
                </div>

            </form >
        </div> 
    </div>

</div>
            </div>
            </div>
            </div>
            
        )
    }
}