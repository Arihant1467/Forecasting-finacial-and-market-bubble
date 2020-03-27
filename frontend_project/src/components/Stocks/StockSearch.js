import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import stockBackground from '.././Stock-Background.jpg';
import {server} from './../../constants/servers';

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

        await axios.get("https://financialmodelingprep.com/api/v3/company/profile/JDST").then((result)=>{
            console.log("response from  server", result);
            
        }).catch((error)=>{
            console.log("error");
        })

    }

    

    render() { 

        const {test} = this.state;
        return ( 
            <div className="wrapper">
                <div className="stockBackground">
                {/* <img src = {background} width="100%" height="550"/> */}
                    <h2></h2>
                    <div className="SearchArea">
                        <input type="text" onChange = {this.stockNameChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="Search for a company"/>
                        <button onClick = {this.submitStockSearch} className="btn btn-primary btn-lg searchButton">
                        <Link to={`/stockResultDisplay/:${this.state.stockName}`} className="searchButton">Search</Link>
                            </button>
                    </div>
                </div>
                <p>hi</p>
            <div>
                <h2>{test}</h2>
            </div>
            </div>
         );
    }
}
 
export default StockSearch;