import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import {saveAs} from 'file-saver';


toast.configure()

const Payment = props => ( 
    <tr>
        <td > { props.Payment.Cardname } </td> 
        <td > { props.Payment.Month } </td>  
        <td > { props.Payment.Year } </td> 
        {/* <td > { props.Payment.Cvv } </td>   */}
        <td > { props.Payment.Cardnumber } </td> 
        <td > { props.Payment.Type } </td>  
        <td>
            <Link id="PayEdit" to = { "/Payment/Edit/" + props.Payment._id } > Edit </Link> |
            
             <a id="PayDelete" href="" onClick={() => { props.deletePayment(props.Payment._id) }}>Delete</a > 
        </td > 
    </tr>
)

export default class PaymentList extends Component {
    constructor(props) {
        super(props);

        this.deletePayment = this.deletePayment.bind(this);
        this.generateReport = this.generateReport.bind(this);


        this.state = { Payment: [] };
    }

    componentDidMount() {
        axios.get('/payment/get/')
            .then(response => {
                this.setState({ Payment: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePayment(id) {
        axios.delete('/payment/delete/'+ id)
            .then(response => { console.log(response.data) });

        this.setState({
            Payment: this.state.Payment.filter(el => el._id !== id)
        })
    }

    PaymentList() {
        return this.state.Payment.map(currentPayment => {
            return <Payment Payment = { currentPayment }
            deletePayment = { this.deletePayment }
            key = { currentPayment._id }
            />;
        })
    }



// ----------------------------------------------------FILTERDATA------



handleSearchArea = (e) => {
         const searchKey = e.currentTarget.value;

         axios.get('/payment/get/').then((response) => {
         const resultt = response.data;
         const result = resultt.filter((props) =>
         props.Cardname.includes(searchKey)
         );
    
         this.setState({ Payment: result });
         });
         };


// ----------------------------------------------------FILTERDATA------








/*-----------------------PDF Generating Start-----------------------------*/

        
        async generateReport() {
          const obj = { payment: this.state.Payment }
          await axios.post('/generatepaymentreport', obj, { responseType: 'arraybuffer', headers: { Accept: 'application/pdf', }, }).then((res) => {
              //alert('Report Generated')
              toast.success('Report Generated Successfully', { position: toast.POSITION.TOP_CENTER })
              console.log(res)
              console.log(res.data)
  
  
              const pdfBlog = new Blob([res.data], { type: 'application/pdf' });
              saveAs(pdfBlog, 'PaymentPDF.pdf');
  
              //window.open(res.data, '_blank');
  
          }).catch((err) => {
              console.log(err.message)
          })
          console.log(obj)
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


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        <input id="searchNav" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchArea}/>
                    </form>
                </div>

            </div>
        </nav>






            <div id="TitleContainerpay">
                <h1 id="TitleOfFunctionpay">Payments</h1>
            </div>

            <button className = "PayTotalViewBtn1" type="button"><Link to = "/Payment/add" className = "distidi" >New Payment <i class="fas fa-plus"></i>&nbsp;&nbsp;</Link></button>

            <button className = "PayTotalViewBtn2" onClick={this.generateReport} type="button"><i class="fas fa-file-pdf"></i> &nbsp;&nbsp;Document</button>


        < div className="payTableContainer">
            <table className = "tablePayItem" >
            <thead className = "thead-light" >
            <tr >
            <th > Card name </th>  
            <th > Month </th>    
            <th > Year </th>    
            {/* <th > Cvv </th>   */}
            <th > Card Number </th>   
            <th > Type </th>    
            <th > Actions </th> 
            </tr > 
            </thead>  
            <tbody > { this.PaymentList() }
            </tbody>  
            </table >



        </div>
    </div>



        )
    }
}