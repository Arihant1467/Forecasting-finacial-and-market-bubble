import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import {server} from '../../constants/servers';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Dashboard extends Component {

    constructor(){
        super();
        this.state  = {
            test:'',
            place: '',
            placeData: '',
            chartData: {
                labels: ['Arizona', 'Boston', 'Cali', 'Denver', 'Detroitte', 'New York'],
                datasets: [
                    {
                        label: 'Land Value',
                        data:[
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

    async componentDidMount () {
        await console.log(localStorage.getItem("City"));
        if(localStorage.getItem("City")) {
            this.setState({
                place: localStorage.getItem("City")
            });
            await axios.get("http://localhost:4000/api/v1/landdata/"+this.state.place).then((result)=>{
                console.log("response from  server");
                console.log(result.data);
                let labels = [], data = [], homeData = [], structureCostData = [];
                for(let i=0;i<result.data.alllanddata.length;i++) {
                    labels.push(result.data.alllanddata[i].Date);
                    data.push(result.data.alllanddata[i].LandValue);
                    homeData.push(result.data.alllanddata[i].HomeValue);
                    structureCostData.push(result.data.alllanddata[i].StructureCost);
                }
                console.log(labels, data);
                console.log(homeData);
                console.log("structure cost data " + structureCostData);
                this.setState({
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
            }).catch((error)=>{
                console.log("error");
                console.log(JSON.stringify(error));
            })
        }
    }

    render() { 
        console.log(this.state.placeData.count);

        const {test} = this.state;
        return ( 
            <div className="wrapper row">
                <h2 className="header">Dashboard Charts</h2>
                <div className="col-md-8 barchart">
                    <Bar data = {this.state.chartData} 
                        options={{
                        }}
                    />
                </div>               
                <div className="col-md-6">
                <Bar data = {this.state.homeChartData} 
                    options={{
                    }}
                />
                </div>
                <div className="col-md-6">
                <Bar data = {this.state.costChartData} 
                    options={{
                    }}
                />
                </div>
                
            </div>
         );
    }
}
 
export default Dashboard;