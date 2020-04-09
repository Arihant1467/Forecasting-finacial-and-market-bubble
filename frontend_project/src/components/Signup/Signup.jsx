import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, UncontrolledAlert } from 'reactstrap';
import axios from 'axios';
import {api} from './../../constants';


class Signup extends Component {

    constructor() {
        super();
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            alertMsg: null,
            alertErrMsg:null
        };
    }

    inputChangeHandle = (e) => {

        const { target } = e;
        const { name } = target;
        this.setState({
            [name]: target.value,
            alertMsg: null,
            alertErrMsg:null
        })

    }

    submitHandle = (e) => {
        e.preventDefault();
        const { firstname, lastname, email, password } = this.state;
        const requestBody = { firstname,lastname,email,password };
        this.setState({alertMsg:null,alertErrMsg:null});

        axios.post(`${api}/signup`,requestBody).then((response)=>{

            const {status, data} = response;
            if(status===200 && JSON.stringify(data)!==JSON.stringify({}) ){
                console.log("You have successfully signed up");
                this.setState({alertMsg:"You have successfully signed up",alertErrMsg:null});
            }else{
                console.log("user already exists");
                this.setState({alertMsg:"user already exists",alertErrMsg:null});
            }

        }).catch((error)=>{
            console.log(error);
            this.setState({alertMsg:null,alertErrMsg:"There was an error in signing you up"});
        })
        

    }

    render() {

        const {alertMsg, alertErrMsg} = this.state;
        let alert = null;
        if(alertMsg!=null){
            alert = (<UncontrolledAlert color="info">{alertMsg}</UncontrolledAlert>);
        }

        let alertErr = null;
        if(alertErrMsg!=null){
            alert = (<UncontrolledAlert color="danger">{alertMsg}</UncontrolledAlert>);
        }

        return (
            <div className="wrapper">
                <div className="background">
                    <div style={{ padding: '10%' }}>
                        {alert}
                        <Form style={{ padding: '10px', color: 'white' }} onSubmit={this.submitHandle}>
                            <FormGroup>
                                <Label for="firstname">First Name</Label>
                                <Input 
                                    type="text" 
                                    name="firstname" 
                                    id="firstname" 
                                    placeholder="First name" 
                                    onChange={this.inputChangeHandle} 
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input 
                                    type="text" 
                                    name="lastname" 
                                    id="lastname" 
                                    placeholder="Last name" 
                                    onChange={this.inputChangeHandle} 
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="something@cool.com"
                                    onChange={this.inputChangeHandle}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="dont tell"
                                    onChange={this.inputChangeHandle}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit">Sign up</Button>
                            </FormGroup>

                        </Form>


                    </div>
                </div>
            </div>
        );
    }


}


export default Signup;