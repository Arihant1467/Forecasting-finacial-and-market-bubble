import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard/Dashboard';

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/home" component={Home}/>    
                <Route path="/dashboard/:city" component={Dashboard}/>       
            </div>
        )
    }
}
//Export The Main Component
export default Main;