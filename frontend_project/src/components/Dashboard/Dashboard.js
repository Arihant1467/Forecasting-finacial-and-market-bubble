import React, { Component } from 'react';
import axios from 'axios';
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
                        label: 'population',
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
                let labels = [];
                for(let i=0;i<result.data.alllanddata.length;i++) {
                    labels.push(result.data.alllanddata[i].Date);
                }
                this.setState({
                    placeData: result.data.alllanddata,
                    // chartData: 
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
            <div className="wrapper">
                <p>dashboard charts</p>
                <Bar data = {this.state.chartData} 
                    options={{
                    }}
                />
            </div>
         );
    }
}
 
export default Dashboard;