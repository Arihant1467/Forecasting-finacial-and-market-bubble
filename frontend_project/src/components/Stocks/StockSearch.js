import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import stockBackground from '.././Stock-Background.jpg';
import Autocomplete from 'react-autocomplete';
import { Table, Button } from 'react-bootstrap';
import { api } from './../../constants';
import SpecificStock from './SpecificStock';

class StockSearch extends Component {

    constructor() {
        super();
        this.state = {
            test: '',
            stockName: '',
            stockSearchResults: [],
            specificStock:null,
        }
        this.stockNameChangeHandler = this.stockNameChangeHandler.bind(this);
        this.submitStockSearch = this.submitStockSearch.bind(this);

    }

    stockNameChangeHandler = (e) => {
        const stockName = e.target.value;

        this.setState({ stockName });

        if(stockName==null || stockName==='' || stockName===' '){ return; }

        const url = `${api}/stock/search/${stockName}`
        axios.get(url).then((response) => {
            console.log(response);
            if (response.data.length == 0) {
                alert("There was an error in searching");
            }

            if (response.status === 200) {
                const { data } = response;
                this.setState({
                    stockSearchResults: data,
                    specificStock:null,
                });
            }

        }).catch((error) => {
            alert("There was an error in searching")
            console.log(error);
        })


    }

    async submitStockSearch(e) {
        e.preventDefault();
        const {stockName} = this.state;
        
        if(stockName==null || stockName==='' || stockName===' '){ return; }

        const url = `${api}/stock/latest/${stockName}`;
        console.log("Spcific stock");
        axios.get(url).then((response)=>{
            if (response.status === 200) {
                const { data } = response;
                this.setState({
                    specificStock:data,
                });
            }
        }).catch((error) => {
            alert("There was an error in fetching latest details. Please reload the page")
            console.log(error);
        })

        localStorage.setItem("company", this.state.stockName);
    }


    render() {

        const { test, stockSearchResults, stockName, specificStock } = this.state;

        let detail = null;
        if(specificStock!==null){
            console.log("null case of specific stock");
            detail = <SpecificStock products={specificStock} />
        }

        return (
            <div>
                <div className="menubar1">
                    <div class="navbar-header">

                    </div>
                    <div class="navbar nav navbar-expand-lg navbar-right trans">
                        <ul class="nav navbar-nav trans">

                            <li className="menu-items1">
                                <Link to="/home" class="btn btn-default head1 "><font color="blue">Home</font></Link>
                            </li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li class="dropdown menu-items1">
                                <Link to="#" class="head1 dropdown-toggle" data-toggle="dropdown"><font color="blue"><span class="glyphicon glyphicon-user"></span>{this.state.fname}</font>
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link to="/home" className="head1 menu-items1" onClick={this.handleLogout}><span class="glyphicon glyphicon-log-out"></span>Logout</Link></li>
                                </ul>
                            </li>
               &nbsp;&nbsp;&nbsp;
                </ul>
                    </div>
                </div>



                <div className="wrapper">
                    <div className="stockBackground">
                        <div className="SearchArea">
                            {/* <input type="text" onChange = {this.stockNameChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="Search for a company"/> */}

                            <Autocomplete
                                inputProps={{ style: { width: '400px', height: '50px', marginRight: '10px' } }}
                                getItemValue={(item) => item.ticker}
                                items={stockSearchResults}
                                shouldItemRender={(item, value) => { return true; }}
                                renderItem={(item, isHighlighted) =>
                                    <div key={item.permaTicker} style={{ background: isHighlighted ? '#3bb3e7' : 'white', margin: '0px' }}>

                                        <h5><b>{item.ticker}</b>&nbsp;&nbsp;&nbsp;<i>{item.name}</i></h5>

                                    </div>
                                }
                                value={stockName}
                                onChange={this.stockNameChangeHandler}
                                onSelect={(name) => this.setState({ stockName: name })}
                            />


                            <Button onClick={this.submitStockSearch} className="btn btn-primary">
                                Search
                                {/* <Link to={`/stockResultDisplay/:${this.state.stockName}`} className="searchButton linkcss">Search</Link> */}
                            </Button>
                        </div>

                        {detail}

                    </div>
                    <div>
                    </div>
                </div>



            </div>
        );
    }
}

export default StockSearch;