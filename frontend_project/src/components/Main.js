import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard/Dashboard';
import StockSearch from './Stocks/StockSearch';
import StockResultDisplay from './Stocks/StockResultDisplay';
class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/home" component={Home}/>    
                <Route path="/dashboard/:city" component={Dashboard}/> 
                <Route path="/stockSearch" component={StockSearch}/>  
                <Route path="/stockResultDisplay/:stockName" component={StockResultDisplay}/>     
            </div>
        )
    }
}
//Export The Main Component
export default Main;