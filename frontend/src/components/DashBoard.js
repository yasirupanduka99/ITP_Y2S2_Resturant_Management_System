import React, { Component } from 'react';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import whitecompanyLogo from '../Images/logo_[White_Edition].png';

export default class DashBoard extends Component {




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




                <div className="dashHeader2">
                    <h1><u>DashBoard</u></h1>
                    <span><img src={whitecompanyLogo}/></span>
                </div>
                
            </div>
        )
    }
}
