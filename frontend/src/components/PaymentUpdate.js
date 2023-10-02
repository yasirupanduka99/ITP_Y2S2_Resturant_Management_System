import React, { Component } from 'react';
import axios from 'axios';
import paymentBGimg from '../Images/payment.jpg';



export default class EditPayment extends Component {
    constructor(props) {
        super(props);

        this.onChangeCardname = this.onChangeCardname.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeCvv = this.onChangeCvv.bind(this);
        this.onChangeCardnumber = this.onChangeCardnumber.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Cardname: '',
            Month: '',
            Year: '',
            Cvv: '',
            Cardnumber: '',
            Type: '',
            Payment: []
        }
    }

    componentDidMount() {
        axios.get('/payment/get/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    Cardname: response.data.Cardname,
                    Month: response.data.Month,
                    Year: response.data.Year,
                    Cvv: response.data.Cvv,
                    Cardnumber: response.data.Cardnumber,
                    Type: response.data.Type

                })
            })
            .catch(function(error) {
                console.log(error);
            })



    }

    onChangeCardname(e) {
        this.setState({
            Cardname: e.target.value
        })
    }

    onChangeMonth(e) {
        this.setState({
            Month: e.target.value
        })
    }

    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        })
    }

    onChangeCvv(e) {
        this.setState({
            Cvv: e.target.value
        })
    }

    onChangeCardnumber(e) {
        this.setState({
            Cardnumber: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            Type: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();


        const Payment = {
            Cardname: this.state.Cardname,
            Month: this.state.Month,
            Year: this.state.Year,
            Cvv: this.state.Cvv,
            Cardnumber: this.state.Cardnumber,
            Type: this.state.Type,
        }

        console.log(Payment);

        axios.post('/update/' + this.props.match.params.id, Payment)
            .then(res => console.log(res.data));

        window.location = '/Payments/';
    }




    render() {
        return ( 
            <div id ="MainDivPayment">

            <div className="bgImg">
                <img src={paymentBGimg} alt="payment"/>
            </div>
        
        <div className="PaymentContainerFormMain">
            <div className="PaymentContainerForm">

           
                <form onSubmit = { this.onSubmit } >
                    <div className = "form-group" >
                    <label > Card Name </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Cardname }
                    onChange = { this.onChangeCardname }
                    /> 
                    </div >


                    <div className = "form-group" >
                    <label > Card Number: </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Cardnumber }
                    onChange = { this.onChangeCardnumber }
                    /> 
                    </div >

                    <div id="cardExpire">


                    <div className = "form-group" >
                    <label > Month: </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Month }
                    onChange = { this.onChangeMonth }
                    /> 
                    </div >

                    <div className = "form-group" >
                    <label > Year: </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Year }
                    onChange = { this.onChangeYear }
                    /> 
                    </div >

                    <div className = "form-group" >
                    <label > CVV </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Cvv }
                    onChange = { this.onChangeCvv }
                    /> 
                    </div >

                    </div>
                
                    {/* <div className = "form-group" >
                    <label > Type: </label> 
                    <input type = "text"
                    required className = "form-control"
                    value = { this.state.Type }
                    onChange = { this.onChangeType }
                    /> 
                    </div > */}

                    <div id="PayCardNextBtn" className = "form-group" >
                        <button type = "submit"
                        value = "Edit"
                        className = "btn btn-primary" >EDIT</button>
                    </div> 

                    <div id="PayCardNextBtn" className = "form-group" >
                        <a href = "#" ><button type = ""
                        className = "btn btn-primary" >CONFIRM PAY</button></a>
                    </div> 

                    

                </form > 
            </div>
            </div>
            </div>
        )
    }
}