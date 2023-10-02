import React, { Component } from 'react';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import DevelopersImg from '../Images/Developers.jpg';

export default class Developers extends Component {
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


                <div id="developersImgContainer">
                    <img id="devImg" src={DevelopersImg}/>
                </div>


            </div>
        )
    }
}
