import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
// import background from './background.jpg';
import { api, citiesAvailable } from './../../constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Spinner, UncontrolledAlert } from 'reactstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Prediction.css';

class Prediction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: '',
            place: '',
            placeData: '',
            loading: false,
            alertMsg: null,
            navigateToPredictionPage: null,
            predictedHomePrice: 0,
            previousQuarterHomePrice: 0,
            percentageChange: 0,
            chartData: {
                labels: ['Arizona', 'Boston', 'Cali', 'Denver', 'Detroitte', 'New York'],
                datasets: [
                    {
                        label: 'Land Value',
                        data: [
                            12345,
                            54635,
                            47533,
                            87564,
                            97124,
                            23512
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 123, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ]
                    }
                ]
            }
        }

    }

    async componentDidMount() {
        console.log(localStorage.getItem('City'));
        const city = localStorage.getItem('City');
        let formattedCity = null;
        if (city) {
            formattedCity = city.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');
        }
        this.setState({
            loading:true,
            alertMsg:null,
        })

        let headers = {
            'Content-Type': 'application/json'
        }

        await axios.get('https://api.tiingo.com/api/test?token=f7660ce704e0b671a94fe2c6e1d62cdb073e5545', headers=headers)
        .then((result) => {
            console.log(result);
        })
        .catch( (error) => {
            console.log(error);
        })

        // await axios.get(`${api}/recentdata/${formattedCity}`).then((result) => {
        //     console.log("result", result);
        // })
        // .catch({

        // })

        await axios.get(`${api}/recentdata/${formattedCity}`).then((result) => {
            console.log("response from  server");
            console.log(result.data);
            let labels = [], homeData = [];
            let res = [];
            // console.log(res.sort((a, b) => (a.Date > b.Date) ? 1 : -1));
            if(result.data && result.data.alllanddata) {
                res = result.data.alllanddata.sort((a, b) => (a.Date > b.Date) ? 1 : -1);
                this.setState({
                    previousQuarterHomePrice: res[res.length-1].HomeValue
                });
            }
            

            for (let i = 0; i < res.length; i++) {
                labels.push(res[i].Date);
                homeData.push(res[i].HomeValue);
            }

            console.log("LABELS : " + labels);
            let results = [];
            let iterator = labels.values();
            for (let elements of iterator) { 
                console.log(elements);
                if(elements.substring(4, 6) == 'Q1')
                results.push('rgba(255, 99, 123, 0.6)');
                else if(elements.substring(4, 6) == 'Q2')
                results.push('rgba(54, 162, 235, 0.6)');
                else if(elements.substring(4, 6) == 'Q3')
                results.push('rgba(255, 206, 86, 0.6)');
                else if(elements.substring(4, 6) == 'Q4')
                results.push('rgba(75, 192, 192, 0.6)');
            }
            console.log("RESULTS : ", results);

            this.setState({
                loading:false,
                placeData: res,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Home Value - 2018 Q3 to 2020 Q1 - All values in dollars',
                            data: homeData,
                            backgroundColor: results
                        }
                    ]
                }
            });
        }).catch((error) => {
            console.log("error");
            this.setState({
                alertMsg: "There was an error in reaching server",
            })
            console.log(JSON.stringify(error));
        });

        await axios.get(`${api}/pctchangedata/${formattedCity}`).then((result) => {
            console.log(result);
            if (result && result.data && result.data.allforecastdata && result.data.allforecastdata[0] && result.data.allforecastdata[0].PctChange) {
                this.setState({
                    percentageChange: result.data.allforecastdata[0].PctChange,
                    predictedHomePrice: ((result.data.allforecastdata[0].PctChange/100) * this.state.previousQuarterHomePrice) + this.state.previousQuarterHomePrice
                });
            }

        })
        .catch({

        })
    }



        render() {

            const {loading, alertMsg, navigateToPredictionPage} = this.state;
            let dashboard = null;
            let predictedValue = true;
    
            if(!loading){
                dashboard = (
                    
                
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
                <p className="headingText">PREDICTION OF HOME PRICE VALUE</p>
    
                <div className="outer">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab>Home Value</Tab>
                    </TabList>
                   
                    <TabPanel>
                    <div className="charts">
                    <Bar data={this.state.chartData}
                        options={{
                            responsive : true,
                            maintainAspectRatio: false
                        }} 
                    /></div>
                    </TabPanel>
                </Tabs>
                </div>
                </div>
                );
            }else{
                dashboard = (
                    <div className="row d-flex justify-content-center">
                        <h3>Loading...</h3>
                        <Spinner style={{ width: '4rem', height: '4rem' }} type="grow" />
                    </div>
                );
            }


            predictedValue = 
                <div className="predictText">
                    <p className="predictText">Home Value Prediction for next 4 quarters</p>
                    <div class="greenCircle">${Math.round(this.state.predictedHomePrice)}</div>
                </div>

            
    
            let alert = null;
            if(alertMsg != null){
                alert = (<UncontrolledAlert color="info">{alertMsg}</UncontrolledAlert>);
            }
    
            return (
                <>
                    {dashboard}
                    {predictedValue}
                    {alert}
    
                </>
            );
        }
    
}

export default Prediction;