import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import staffAdd from '../Images/staffAdd.png';
import {saveAs} from 'file-saver';

toast.configure()
const Employee = props => ( 
    <tr >
    <td > { props.Employee.StaffId } </td> 
    <td > { props.Employee.Role } </td> 
    <td > { props.Employee.Name } </td> 
    <td > { props.Employee.NIC } </td> 
    <td > { props.Employee.Salary } </td> 
    <td >

    <Link id="staffEdit" to = { "/Edit/" + props.Employee._id } > Edit </Link> 
     <a id="staffDelete" href=" " onClick={() => { props.deleteEmployee(props.Employee._id) }}>Delete</a > 
    </td > 
    </tr>
)

export default class EmployeesManage extends Component {
    constructor(props) {
        super(props);


        this.onChangeStaffId = this.onChangeStaffId.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.generateReport = this.generateReport.bind(this);


        this.state = {
            StaffId: '',
            Role: '',
            Name: '',
            NIC: '',
            Salary: '',
            Employees: [] 
        };
    }

    componentDidMount(){
        this.retrievePosts();
      }

      retrievePosts(){
        axios.get('/Employee/get')
            .then(response => {
                this.setState({ Employees: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteEmployee(id) {
        axios.delete('/Employees/delete/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            Employees: this.state.Employees.filter(el => el._id !== id)
        })

    }

    EmployeeList() {
        return this.state.Employees.map(currentEmployee => {
            return <Employee Employee = { currentEmployee }
            deleteEmployee = { this.deleteEmployee }
            key = { currentEmployee._id }
            />;
        })
    }


//----------------------------------------------------------- FILTER DATA


handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get('/Employee/get').then((response) => {
            const resultt = response.data;
            const result = resultt.filter((props) =>
                props.Name.includes(searchKey)
            );

            this.setState({ Employees: result });
        });
    };




//----------------------------------------------------------- FILTER DATA







/*--------------------------------------------*/


    //set the StaffId 

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



    //submit Function

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

        axios.post('/Employees/Insert', Employee)
            .then(res => console.log(res.data));

        window.location = '/Employee/';
    }



/*----------------------------------------------------------*/











/*-----------------------PDF Generating Start-----------------------------*/

        
async generateReport() {
    const obj = { staff: this.state.Employees }
    await axios.post('/generatestaffReport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {
        //alert('Report Generated')
        toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })
        console.log(res)
        console.log(res.data)


        const pdfBlog = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlog, 'StaffPDF.pdf');

        //window.open(res.data, '_blank');

    }).catch((err) => {
        console.log(err.message)
    })
    console.log(obj)
}












    render() {
        return ( 


            <div >



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


        




                <div id="TitleContainerStaff">
                <h1 id="TitleOfFunctionStaff">Staff</h1>
            </div>

            <button className = "StaffAdd" type="button" data-toggle="modal" data-target="#exampleModalEmployee"><i class="fas fa-plus"></i>&nbsp;&nbsp;Staff Member</button>

             <button className = "StaffList" onClick={this.generateReport} type="button"><i class="fas fa-file-pdf"></i> &nbsp;&nbsp;Document</button> 

                <div className="staffTableContainer">
                    <table className = "tableStaffItem" >
                        <thead className = "thead-light" >
                        <tr >
                        <th > StaffID </th> 
                        <th > Role </th> 
                        <th > Name </th> 
                        <th > Nic </th> 
                        <th > Salary </th> 
                        <th > Actions </th> 
                        </tr > 
                        </thead> 
                        <tbody > { this.EmployeeList() } 
                        </tbody>
                    </table >
                </div>

















{/* <!-- ADD Item Modal --> */}

<div className="EmployeeContainerPopup">
    <div className="modal fade" id="exampleModalEmployee" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">

                
                

            <div id="container_addFoodItem_POPUP" className="modal-content">

              <div className="closeBtnContainer">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>


            <div className="addStaffImg">
                <img src={staffAdd} alt="staffImg"/>
            </div>
            

            <div className="formContainer">

                <h4 className="addStaffTitle">Add Staff</h4>
                
                
                    <form className="AddformMain" onSubmit = { this.onSubmit } >

                        <div className="inputBoxes">


                                <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                                    <label > StaffID </label>  
                                    <input type = "text"
                                    required className = "form-control"
                                    id="inputBox"
                                    value = { this.state.StaffId }
                                    onChange = { this.onChangeStaffId }
                                    /> 
                                </div > 

                                <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                                    <label > Role </label> 
                                    {/* <input type = "text"
                                    required className = "form-control"
                                    id="inputBox"
                                    value = { this.state.Role }
                                    onChange = { this.onChangeRole }
                                    />  */}
                                

                                { /*------------------------------------------------------------*/}


                                
                  
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



                                { /*------------------------------------------------------------*/}


                                <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                                    <label > Name </label> 
                                    <input type = "text"
                                    className = "form-control "
                                    id="inputBox"
                                    value = { this.state.Name }
                                    onChange = { this.onChangeName }
                                    /> 
                                </div >


                                <div className = "form-group col-md-8" style={{marginBottom:'2px'}}>
                                    <label > NIC </label> 
                                    <input type = "text"
                                    className = "form-control"
                                    id="inputBox"
                                    value = { this.state.NIC }
                                    onChange = { this.onChangeNIC }
                                    /> 
                                </div >

                                <br >
                                </br> 



                                <div className = "form-group col-md-8" style={{marginBottom:'15px'}}>
                                    <label > Salary: </label>  
                                    <input type = "text"
                                    required className = "form-control"
                                    id="inputBox"
                                    value = { this.state.Salary }
                                    onChange = { this.onChangeSalary }
                                    /> 
                                </div >



                                <div className = "form-group" >
                                    <input type = "submit"
                                    value = "ADD"
                                    className = "btn btn-primary"
                                    id="addStaffBtn" />
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