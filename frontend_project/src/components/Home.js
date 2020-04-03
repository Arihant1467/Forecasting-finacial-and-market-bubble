import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import background from './background.jpg';
import {server} from './../constants/servers';

class Home extends Component {

    constructor(){
        super();
        this.state  = {
            test:'',
            place: ''
        }
        this.placeChangeHandler = this.placeChangeHandler.bind(this);
        this.submitPlaceSearch = this.submitPlaceSearch.bind(this);

    }

    placeChangeHandler = (e) => {
        this.setState({
            place: e.target.value
        });
    }

    submitPlaceSearch = (e) => {
        e.preventDefault();
        console.log(this.state.place);
        localStorage.setItem("City", this.state.place);
    }

    async componentDidMount () {
        console.log("component did mount");
        //const uri = `${server}/ping`;
        await axios.get("http://localhost:4000/api/v1/landdata/atlanta").then((result)=>{
            console.log("response from  server");
            console.log(result.data);
            console.log(result.data.alllanddata[0].HomeValue+result.data.alllanddata[1].HomeValue);
            const test = result.data.Test;
            console.log(test);
            this.setState({test});
            
        }).catch((error)=>{
            console.log("error");
            console.log(JSON.stringify(error));
        })

        await axios.get("https://financialmodelingprep.com/api/v3/company/profile/AAPL").then((result)=>{
            console.log("response from  server", result);
            
        }).catch((error)=>{
            console.log("error");
        })

    }

    

    render() { 

        const {test} = this.state;
        return ( 
            <div className="wrapper">
                <div className="background">
                {/* <img src = {background} width="100%" height="550"/> */}
                    <h2></h2>
                    <div className="SearchArea">
                        <input type="text" onChange = {this.placeChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="Search for a city"/>
                        <button onClick = {this.submitPlaceSearch} className="btn btn-primary btn-lg searchButton"><Link to={`/dashboard/:${this.state.place}`} className="searchButton">Search</Link></button>
                    </div>
                </div>
                <p>hi</p>
            <div>
                <h2>{test}</h2>
            </div>
            </div>
         );
    }
}
 
export default Home;