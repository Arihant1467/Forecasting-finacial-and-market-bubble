import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
import background from './background.jpg';
import { api, citiesAvailable } from './../constants';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: '',
            place: '',
            search: false,
        }
        this.submitPlaceSearch = this.submitPlaceSearch.bind(this);
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

    async componentDidMount() {
        await axios.get(`${api}/landdata/atlanta`).then((result) => {
            console.log("response from  server");
            console.log(result.data);
            console.log(result.data.alllanddata[0].HomeValue + result.data.alllanddata[1].HomeValue);
            const test = result.data.Test;
            console.log(test);
            this.setState({ test });

        }).catch((error) => {
            console.log("error");
            console.log(JSON.stringify(error));
        })

        await axios.get("https://financialmodelingprep.com/api/v3/company/profile/AAPL").then((result) => {
            console.log("response from  server", result);

        }).catch((error) => {
            console.log("error");
        })

    }


    render() {

        const { test, search, place } = this.state;
        let redirectUrl = null;
        if (search && place !== null) {
            const formattedCity = place.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');

            if (citiesAvailable.indexOf(formattedCity) > -1) {
                const url = `/dashboard/${formattedCity}`;
                redirectUrl = <Redirect to={url} />;
            } else {
                console.log("the city you mentioned is not in our database");
            }


        }


        return (
            <div className="wrapper">
                {redirectUrl}
                <div className="menubar1">
                <div class="navbar-header">
                    {/* <Link to="/travelerafterlogin">
                    <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"/>
                    </Link> */}
                </div>
                <div class = "navbar nav navbar-expand-lg navbar-right trans">
                <ul class="nav navbar-nav trans">
                {/* <li class="head1 active menu-items1"><Link to="#"><font color="blue">Trip Boards</font></Link></li> */}
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
                </ul>
                </div> 
                </div>
                <div className="background">
                    <div className="SearchArea">
                        {/* <input type="text" onChange={this.placeChangeHandler} className="form-control form-control-lg form_control_city_location col-xs-3 pull-left" name="place" placeholder="San Jose" /> */}

                        <Autocomplete
                            inputProps={{ style: { width: '500px', height: '45px', marginRight: '10px' } }}
                            getItemValue={(item) => item}
                            items={citiesAvailable}
                            shouldItemRender={(item, value) => {
                                const formattedCity = value.trim().toUpperCase().replace(new RegExp('\ ', 'g'), '');
                                return item.indexOf(formattedCity) > -1;
                            }}
                            renderItem={(item, isHighlighted) =>
                                <div key={item} style={{ background: isHighlighted ? '#3bb3e7' : 'white', paddingTop: '2px' }}>
                                    <i>{item}</i>
                                </div>
                            }
                            value={place}
                            onChange={this.placeChangeHandler}
                            onSelect={(place) => this.setState({ place })}
                        />

                        <button
                            onClick={this.submitPlaceSearch}
                            className="btn btn-primary btn-lg searchButton">Search</button>
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