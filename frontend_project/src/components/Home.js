import React, { Component } from 'react';
import axios from 'axios';

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
            <div>
                <h2>"Hey there !!"</h2>
            </div>
         );
    }
}
 
export default Home;