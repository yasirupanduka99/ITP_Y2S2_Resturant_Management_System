// import React, { Component } from 'react';
// import axios from 'axios';


// export default class EmployeeAdd extends Component {
//     constructor(props) {
//         super(props);


//         this.onChangeStaffId = this.onChangeStaffId.bind(this);
//         this.onChangeRole = this.onChangeRole.bind(this);
//         this.onChangeName = this.onChangeName.bind(this);
//         this.onChangeNIC = this.onChangeNIC.bind(this);
//         this.onChangeSalary = this.onChangeSalary.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             StaffId: '',
//             Role: '',
//             Name: '',
//             NIC: '',
//             Salary: '',
//             Employees: []
//         }
//     }

//     //set the StaffId 

//     onChangeStaffId(e) {
//         this.setState({
//             StaffId: e.target.value
//         })
//     }

//     //set the Role

//     onChangeRole(e) {
//         this.setState({
//             Role: e.target.value
//         })
//     }

//     //set Name

//     onChangeName(e) {
//         this.setState({
//             Name: e.target.value
//         })
//     }



//     //Set NIC

//     onChangeNIC(e) {
//         this.setState({
//             NIC: e.target.value
//         })
//     }

//     //Set Salary

//     onChangeSalary(e) {
//         this.setState({
//             Salary: e.target.value
//         })
//     }



//     //submit Function

//     onSubmit(e) {
//         e.preventDefault();

//         const Employee = {
//             StaffId: this.state.StaffId,
//             Role: this.state.Role,
//             Name: this.state.Name,
//             NIC: this.state.NIC,
//             Salary: this.state.Salary


//         }

//         console.log(Employee);

//         axios.post('/Employees/Insert', Employee)
//             .then(res => console.log(res.data));

//         window.location = '/Employee/';
//     }

//     render() {
//         return ( 
//             <div>
//             <h3 > New Employee </h3> 
//             <form onSubmit = { this.onSubmit } >
//             <div className = "form-group col-md-8" >
//             <label > StaffID: </label>  
//             <input type = "text"
//             required className = "form-control"
//             value = { this.state.StaffId }
//             onChange = { this.onChangeStaffId }
//             /> 
//             </div > 
//             <div className = "form-group col-md-8" >
//             <label > Role: </label> 
//             <input type = "text"
//             required className = "form-control"
//             value = { this.state.Role }
//             onChange = { this.onChangeRole }
//             /> 
//             </div > 
//             <div className = "form-group col-md-8" >
//             <label > Name: </label> 
//             <input type = "text"
//             className = "form-control "
//             value = { this.state.Name }
//             onChange = { this.onChangeName }
//             /> 
//             </div >


//             <div className = "form-group col-md-8" >
//             <label > NIC: </label> 
//             <input type = "text"
//             className = "form-control"
//             value = { this.state.NIC }
//             onChange = { this.onChangeNIC }
//             /> 
//             </div >

//             <br >
//             </br> 



//             <div className = "form-group col-md-8" >
//             <label > Salary: </label>  
//             <input type = "text"
//             required className = "form-control"
//             value = { this.state.Salary }
//             onChange = { this.onChangeSalary }
//             /> 
//             </div >



//             <div className = "form-group" >
//             <input type = "submit"
//             value = "Create"
//             className = "btn btn-primary" />
//             </div> 
//             </form > 
//             </div>
//         )
//     }
// }