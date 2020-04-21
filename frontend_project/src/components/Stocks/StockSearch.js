import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import stockBackground from '.././Stock-Background.jpg';
import {api} from './../../constants';

class StockSearch extends Component {

    constructor(){
        super();
        this.state  = {
            test:'',
            stockName: ''
        }
        this.stockNameChangeHandler = this.stockNameChangeHandler.bind(this);
        this.submitStockSearch = this.submitStockSearch.bind(this);

    }

    stockNameChangeHandler = (e) => {
        this.setState({
            stockName: e.target.value
        });
    }

    async submitStockSearch(e) {
        e.preventDefault();
        localStorage.setItem("company", this.state.stockName);
    }

    async componentDidMount () {

        await axios.get(`https://financialmodelingprep.com/api/v3/company/profile/JDST`).then((result)=>{
            console.log("response from  server", result);
            
        }).catch((error)=>{
            console.log("error");
        })

    }

    

    render() { 

        const {test} = this.state;
        return ( 
            <div>
            <div className="menubar1">
                <div class="navbar-header">
                    {/* <Link to="/travelerafterlogin">
                    <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"/>
                    </Link> */}
                </div>
                <div class = "navbar nav navbar-expand-lg navbar-right trans">
                <ul class="nav navbar-nav trans">
                {/* <li class="head1 active menu-items1"><Link to="#"><font color="blue">Trip Boards</font></Link></li> */}
                <li className="menu-items1">
                <Link to="/home" class="btn btn-default head1 "><font color="blue">Home</font></Link>
                </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="dropdown menu-items1">
               <Link to="#" class="head1 dropdown-toggle" data-toggle="dropdown"><font color="blue"><span class="glyphicon glyphicon-user"></span>{this.state.fname}</font>
              </Link>
               <ul class="dropdown-menu">
               <li><Link to="/home" className="head1 menu-items1" onClick = {this.handleLogout}><span class="glyphicon glyphicon-log-out"></span>Logout</Link></li>
               </ul>
               </li>
               &nbsp;&nbsp;&nbsp;
                </ul>
                </div> 
                </div>            

            <div className="wrapper">
                <div className="stockBackground">
                {/* <img src = {background} width="100%" height="550"/> */}
                    <div className="SearchArea">
                        <input type="text" onChange = {this.stockNameChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="Search for a company"/>
                        <button onClick = {this.submitStockSearch} className="btn btn-primary btn-lg searchButton srch">
                        <Link to={`/stockResultDisplay/:${this.state.stockName}`} className="searchButton linkcss">Search</Link>
                            </button>
                    </div>
                </div>
            <div>
                <h2>{test}</h2>
            </div>
            </div>
            </div>
         );
    }
}
 
export default StockSearch;