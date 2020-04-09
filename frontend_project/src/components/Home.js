import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import background from './background.jpg';
import {api} from './../constants';


class Home extends Component {

    constructor(props){
        super(props);
        this.state  = {
            test:'',
            place: null,
            search: false
        }
        
    }

    placeChangeHandler = (e) => {
        this.setState({
            place: e.target.value
        });
    }

    submitPlaceSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: true
        });
        localStorage.setItem("City", this.state.place);
    }

    async componentDidMount () {
        await axios.get(`${api}/landdata/atlanta`).then((result)=>{
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

        const {test, search, place} = this.state;
        let redirectUrl = null;
        if(search && place!== null){
            const url = `/dashboard/${place}`;
            redirectUrl = <Redirect to={url} />;
        }


        return ( 
            <div className="wrapper">
                {redirectUrl}
                <div className="background">
                    <h2></h2>
                    <div className="SearchArea">
                        <input type="text" onChange = {this.placeChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="San Jose"/>
                        <button onClick = {this.submitPlaceSearch} className="btn btn-primary btn-lg searchButton">Search</button>
                    </div>
                </div>
            <div>
                <h2>{test}</h2>
            </div>
            </div>
         );
    }
}
 
export default Home;