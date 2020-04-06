import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard/Dashboard';
import StockSearch from './Stocks/StockSearch';
import StockResultDisplay from './Stocks/StockResultDisplay';
import Login from './Login';
import Signup from './Signup';


class Main extends Component {
    render(){
        return(
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>       
                <Route path="/dashboard/:city" component={Dashboard}/> 
                <Route path="/stockSearch" component={StockSearch}/>  
                <Route path="/stockResultDisplay/:stockName" component={StockResultDisplay}/> 
                <Route exact path="/login" component={Login}/>  
                <Route exact path="/signup" component={Signup}/>    
            </div>
        )
    }
}
//Export The Main Component
export default Main;