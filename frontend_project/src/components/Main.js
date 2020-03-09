import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';


class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/home" component={Home}/>       
            </div>
        )
    }
}
//Export The Main Component
export default Main;