import React, { Component } from "react";
import axios from "axios";
import paymentBGimg from '../Images/payment.jpg';

export default class CreatePayment extends Component {
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
            Cardname: "",
            Month: "",
            Year: "",
            Cvv: "",
            Cardnumber: "",
            Type: "",
        };
    }

    //set cardname
    onChangeCardname(e) {
        this.setState({
            Cardname: e.target.value,
        });
    }

    //set month
    onChangeMonth(e) {
        this.setState({
            Month: e.target.value,
        });
    }


    //set year
    onChangeYear(e) {
        this.setState({
            Year: e.target.value,
        });
    }

    
    onChangeCvv(e) {
        this.setState({
            Cvv: e.target.value,
        });
    }


    //set cardnumber
    onChangeCardnumber(e) {
        this.setState({
            Cardnumber: e.target.value,
        });
    }

    onChangeType(e) {
        this.setState({
            Type: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const Payment = {
            Cardname: this.state.Cardname,
            Month: this.state.Month,
            Year: this.state.Year,
            Cvv: this.state.Cvv,
            Cardnumber: this.state.Cardnumber,
            Type: this.state.Type,
        };

        console.log(Payment);

        axios
            .post("/payment/add", Payment)
            .then((res) => console.log(res.data));

        window.location = "/Payments/";
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
                        <label > Card Name </label>{" "} 
                        <input type = "text"
                        placeholder = "Name On Card"
                        required className = "form-control"
                        value = { this.state.Cardname }
                        onChange = { this.onChangeCardname }/>{" "} 
                        </div> 

                        <div id ="cardNum" className = "form-group" >
                        <label > Card Number: </label>{" "} 
                        <input type = "text"
                        required className = "form-control"
                        placeholder = "Card Number"
                        value = { this.state.Cardnumber }
                        onChange = { this.onChangeCardnumber }/>{" "} 
                        </div> 

                        <div id="cardExpire">
                        
                        <div className = "form-group" >
                        <label > Month: </label>{" "} 
                        <input type = "text"
                        required className = "form-control"
                        placeholder = "MM"
                        value = { this.state.Month }
                        onChange = { this.onChangeMonth }/>{" "} 
                        </div> 

                        <div className = "form-group" >
                        <label > Year: </label>{" "}
                        <input type = "text"
                        required className = "form-control"
                        placeholder = "YY"
                        value = { this.state.Year }
                        onChange = { this.onChangeYear }/>{" "} 
                        </div> 

                        <div className = "form-group" >
                        <label > Cvv: </label>{" "} 
                        <input type = "text"
                        required className = "form-control"
                        placeholder = "CVV"
                        value = { this.state.Cvv }
                        onChange = { this.onChangeCvv }/>{" "} 
                        </div> 

                        </div>

                        <div className = "form-group" >
                        <label > Type: </label>{" "} 
                        <input type = "text"
                        required className = "form-control"
                        placeholder = "Enter Type"
                        value = { this.state.Type }
                        onChange = { this.onChangeType }/>{" "} 
                        </div> 

                        <div id="PayCardNextBtn" className = "form-group" >
                        <a href="/"><button type = "submit"
                        value = "Add payment"
                        className = "btn btn-primary" >NEXT</button></a>
                        </div>
                        
                    </form>{" "} 
                </div>
            </div>
            </div>
        );
    }
}