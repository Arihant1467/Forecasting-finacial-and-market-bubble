import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {server} from './../../constants/servers';

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
                    
                    <div class="col-xs-10">
                        <div>
                            <p>Stock Insights</p>
                            <br/>
                        {/* <div class="col-lg-6"> */}
                        {/* <span> */}
                        <img src = {stockInsights.profile.image} width="250" height="200" class="col-lg-4"/>
                         <h2>{stockInsights.profile.companyName} - {stockInsights.symbol}</h2>
                         <p>Price: {stockInsights.profile.price}  </p>
                        <p>Average Volume: {stockInsights.profile.volAvg} BHK </p>
                        <p>Market Cap: {stockInsights.profile.mktCap} BR </p>
                        <p>Website: <a href={stockInsights.profile.website}>{stockInsights.profile.website}</a></p>
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
                        </div>
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