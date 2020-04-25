import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Dashboard.css';
import { api, getFormattedCity } from './../../constants';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Redirect } from 'react-router-dom';
import { Spinner, UncontrolledAlert } from 'reactstrap';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            test: '',
            place: '',
            placeData: '',
            loading: false,
            alertMsg: null,
            navigateToPredictionPage: null,
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
        this.findPredictionResult = this.findPredictionResult.bind(this);
    }

    async componentDidMount() {


        const { city } = this.props.match.params;
        const formattedCity = getFormattedCity(city);

        this.setState({
            loading:true,
            alertMsg:null,
        })

        await axios.get(`${api}/landdata/${formattedCity}`).then((result) => {
            console.log("response from  server");
            console.log(result.data);
            let labels = [], data = [], homeData = [], structureCostData = [];

            for (let i = 0; i < result.data.alllanddata.length; i++) {
                labels.push(result.data.alllanddata[i].Date);
                data.push(result.data.alllanddata[i].LandValue);
                homeData.push(result.data.alllanddata[i].HomeValue);
                structureCostData.push(result.data.alllanddata[i].StructureCost);
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
                placeData: result.data.alllanddata,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Land Value - All values in dollars',
                            data: data,
                            backgroundColor: results
                        }
                    ]
                },
                homeChartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Home Value - All values in dollars',
                            data: homeData,
                            backgroundColor: results
                        }
                    ]
                },
                costChartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Structure Cost Value - All values in dollars',
                            data: structureCostData,
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
    }

    findPredictionResult = (e) => {
        console.log("navigating to prediction result");
        this.setState({
            navigateToPredictionPage: true
        });
    }

    render() {

        const {loading, alertMsg, navigateToPredictionPage} = this.state;
        let dashboard = null;
        let redirectUrl = null;

        if (navigateToPredictionPage) {
            const url = `/predictionResult`;
            redirectUrl = <Redirect to={url} />;
        }

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
                {/* <li class="dropdown menu-items1">
                <Link to="#" class="head1 dropdown-toggle" data-toggle="dropdown"><font color="blue">Help</font>
              </Link>
                <ul class="dropdown-menu">
                <li className="head1 menu-items1"><Link to="#">Visit help center</Link></li>
        
                </ul>
                </li> */}

                
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                {/* <li>
                <img alt="HomeAway birdhouse" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"/>
                </li>
                <li>
                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader.svg"/>
                </li> */}
                </ul>
                </div> 
            </div>

            <div className="outer">
            <Tabs defaultIndex={0}>
                <TabList>
                    <Tab>Land Value</Tab>
                    <Tab>Home Value</Tab>
                    <Tab>Structure Cost</Tab>
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
                <TabPanel>
                <div className="charts">
                <Bar data={this.state.homeChartData}
                    options={{
                        responsive : true,
                        maintainAspectRatio: false
                    }} 
                /></div>
                </TabPanel>
                <TabPanel>
                <div className="charts">
                <Bar data={this.state.costChartData}
                    options={{
                        responsive : true,
                        maintainAspectRatio: false
                    }} 
                /></div>
                </TabPanel>
            </Tabs>
            </div>
            <div className="lpScoreButtonDiv">
                <button type="button" onClick={this.findPredictionResult} className="lpScoreButton btn btn-primary btn-lg searchButton">LP Score</button>

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

        let alert = null;
        if(alertMsg != null){
            alert = (<UncontrolledAlert color="info">{alertMsg}</UncontrolledAlert>);
        }

        return (
            <>
                {redirectUrl}
                {dashboard}
                {alert}

            </>
        );
    }
}

export default Dashboard;