import React, { Component } from 'react';
import axios from 'axios';
import background from './background.jpg';

class Home extends Component {


    componentDidMount () {
        axios.defaults.withCredentials = true;
        console.log("component did mount");
        //make a post request with the user data
        // axios.post('',data)
        //     .then(response => {

        //     })
        //     .catch( error =>{
        //     });

    }

    render() { 
        return ( 
            <div className="wrapper">
                <div className = "bg-cover"></div>
                <img src = {background} width="100%" height="550"/>
                <h2>"Hey there !!"</h2>
            </div>
         );
    }
}
 
export default Home;