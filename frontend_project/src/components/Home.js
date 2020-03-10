import React, { Component } from 'react';
import axios from 'axios';
import {server} from './../constants/servers';

class Home extends Component {

    constructor(){
        super();
        this.state  = {
            test:'Welcome to React app!!!',
        }
    }

    componentDidMount () {
        console.log("component did mount");
        //const uri = `${server}/ping`;
        axios.get("http://localhost:4000/api/v1/ping").then((result)=>{
            console.log("response from  server");
            console.log(result.data);
            const test = result.data.Test;
            console.log(test);
            this.setState({test});
            
        }).catch((error)=>{
            console.log("error");
            console.log(JSON.stringify(error));
        })

    }

    render() { 

        const {test} = this.state;
        return ( 
            <div>
                <h2>{test}</h2>
            </div>
         );
    }
}
 
export default Home;