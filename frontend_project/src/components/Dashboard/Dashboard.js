import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { api } from './../../constants';
import { Bar, Line, Pie } from 'react-chartjs-2';
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


        const { city } = this.props.match.params;
        const formattedCity = city.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');

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

            console.log(labels, data);
            console.log(homeData);
            console.log("structure cost data " + structureCostData);

            this.setState({
                loading:false,
                placeData: result.data.alllanddata,
                chartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Land Value',
                            data: data,
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
                },
                homeChartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Home Value',
                            data: homeData,
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
                },
                costChartData: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Structure Cost Value',
                            data: structureCostData,
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
            });
        }).catch((error) => {
            console.log("error");
            this.setState({
                alertMsg: "There was an error in reaching server",
            })
            console.log(JSON.stringify(error));
        });


    }

    render() {

        const {loading, alertMsg} = this.state;
        let dashboard = null;

        if(!loading){
            dashboard = (
                <>
                <div className="wrapper row">
                    <h2 className="header">Dashboard Charts</h2>

                    <div>Land Value</div>
                    <div className="col-md-12 barchart" style={{ padding: '5px' }}>
                        <Bar data={this.state.chartData}
                            options={{
                            }} 
                        />
                    </div>


                </div>

                <div className="row">
                    <div>Home Value</div>
                    <div className="col-md-12">
                        <Bar data={this.state.homeChartData}
                            options={{
                            }}
                        />
                    </div>


                </div>

                <div className="row">

                <div>Structure Value</div>
                    <div className="col-md-12">
                        <Bar data={this.state.costChartData}
                            options={{
                            }}
                        />
                    </div>

                </div>

            </>
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
                {dashboard}
                {alert}

            </>
        );
    }
}

export default Dashboard;