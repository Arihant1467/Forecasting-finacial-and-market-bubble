import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {api} from './../../constants';

class StockResultDisplay extends Component {

    constructor(){
        super();
        this.state  = {
            test:'',
            stockName: '',
            stockData: []
        }
    }

    async componentWillMount () {
        if(localStorage.getItem("company")) {
            this.setState({
                stockName: localStorage.getItem("company")
            })
            console.log(localStorage.getItem('company'));
            await axios.get("https://financialmodelingprep.com/api/v3/company/profile/"+localStorage.getItem("company")).then((response)=>{
            console.log("response from  server", response);
            this.setState({
                stockData: this.state.stockData.concat(response.data) 
            })
            
            }).catch((error)=>{
                console.log("error");
            })
        }
        

    }

    

    render() {
        let details = null;
        if(this.state.stockData.length) {
            console.log(this.state.stockData.symbol);
            details = this.state.stockData.map(stockInsights => {
                return(
                    <div>
                    <div className="menubar1">
                <div class="navbar-header">
                    {/* <Link to="/travelerafterlogin">
                    <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"/>
                    </Link> */}
                </div>
                <div class = "navbar nav navbar-expand-lg navbar-right trans">
                <ul class="nav navbar-nav trans">
                <li class="head1 active menu-items1"><Link to="/home" class="btn btn-default head1 "><font color="blue">Home</font></Link></li>&nbsp;&nbsp;&nbsp;
                <li className="menu-items1">
                <Link to="/stockSearch" class="btn btn-default head1 "><font color="blue">Company Stock</font></Link>
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
                    {/* <div class="col-xs-10">
                        <div>
                            <p>Stock Insights</p>
                            <br/> */}
                        
                        {/* <img src = {stockInsights.profile.image} width="100" height="100"/>
                         <h2>{stockInsights.profile.companyName} - {stockInsights.symbol}</h2>
                         <p>Price: {stockInsights.profile.price}  </p>
                        <p>Average Volume: {stockInsights.profile.volAvg} BHK </p>
                        <p>Market Cap: {stockInsights.profile.mktCap} BR </p>
                        <p>Website: <a href={stockInsights.profile.website}>{stockInsights.profile.website}</a></p> */}
                         {/* price: 1.92
                    beta: "0.531451"
                    volAvg: "10292732"
                    mktCap: "69230890"
                    lastDiv: "0.46301"
                    range: "1.5-55.86"
                    changes: 0.17
                    changesPercentage: "(+9.71%)"
                    companyName: "Direxion Daily Junior Gold Miners Index Bear 3X Shares"
                    exchange: "NYSE Arca"
                    industry: ""
                    website: "http://www.direxioninvestments.com/"
                    description: "The investment seeks daily investment results, before fees and expenses, of 300% of the inverse (or opposite) of the daily performance of the MVIS Global Junior Gold Miners Index.↵ The fund invests in swap agreements, futures contracts, short positions or other financial instruments that, in combination, provide inverse (opposite) or short leveraged exposure to the index equal to at least 80% of the fund's net assets (plus borrowing for investment purposes). The index tracks the performance of foreign and domestic micro-, small- and mid-capitalization companies. The fund is non-diversified."
                    ceo: ""
                    sector: ""
                    image: "https://financialmodelingprep.com/images-New-jpg/JDST.jpg" */}

                        {/*<h4>{properties.city}</h4>
                      
                        </span>
                        <br/>
                        <p className="rateDetails">$ {properties.rate}</p>
                        </div>
                        <br/> */}
                        {/* </div>
                    </div> */}
                    {/* --- */}

                    <div className="prop">
                    <div class="row">
                    <div class="col-sm-5" className="backColor5_list">
                    <img src = {stockInsights.profile.image} className="mediao"/>
                    </div>
                    <div class="col-sm-7" className="backColor_dash_list">
                    <p className="headline_list">{stockInsights.profile.companyName} - {stockInsights.symbol}</p><br/>
                    <p>Price: {stockInsights.profile.price}  </p>
                    <p>Average Volume: {stockInsights.profile.volAvg} BHK </p>
                    <p>Market Cap: {stockInsights.profile.mktCap} BR </p>
                    <p>Website: <a href={stockInsights.profile.website}>{stockInsights.profile.website}</a></p>
                    </div>
                    </div>
                    </div>
                    {/* --- */}
                     </div>
                )
            })
        }
         

        return ( 
            <div className="wrapper">
                <div>{details}</div>
            </div>
         );
    }
}
 
export default StockResultDisplay;