import React, { Component } from 'react';
import axios from 'axios';
import {api} from './../../constants';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Dashboard extends Component {

    constructor(props){
        super(props);

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

        
        const { city } = this.props.match.params;
        const formattedCity = city.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');

        await axios.get(`${api}/landdata/${formattedCity}`).then((result)=>{
            console.log("response from  server");
            console.log(result.data);
            let labels = [];
            let data = [];
            for(let i=0;i<result.data.alllanddata.length;i++) {
                labels.push(result.data.alllanddata[i].Date);
                data.push(result.data.alllanddata[i].LandValue);
            }
            console.log(labels, data);
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
                }
            });
        }).catch((error)=>{
            console.log("error");
            console.log(JSON.stringify(error));
        });
        
    }

    render() { 
        

        return ( 
            <div className="wrapper">
                <p>Dashboard charts</p>
                <Bar data = {this.state.chartData} 
                    options={{
                    }}
                />
            </div>
         );
    }
}
 
export default Dashboard;