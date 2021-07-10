import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Vendor extends Component {
     constructor(props) {
        super(props);

        this.state = {
            customer: this.props.match.params.id
            
        }

    }

    search(e){
        this.props.history.push
                        ({
                            pathname: "/customer/search/" + this.state.customer
                        })
    }

    lis(e,info){
        this.props.history.push
                        ({
                            pathname: "/customer/list/" + this.state.customer
                        })
    }

    dispatch(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatch/" + this.state.customer
                        })
    }
    
    dispatched(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatched/" + this.state.customer
                        })
    }
    logout(e,info){
        this.props.history.push
        (
            {
                pathname: "/login"
            }
        )
    }
    render() {
        const info= "akshit"
        return (
            <div>
            <Button block disabled variant="secondary">Hello, Customer {this.state.customer} </Button>
            <Button variant="success" onClick={(e)=>this.search(e)}> Search Products </Button>
            <Button variant="dark" onClick={(e)=>this.lis(e,info)}> My Orders</Button>
            <Button variant="danger" onClick={(e)=>this.logout(e,info)}> Logout </Button>
            </div>
        
        )
    }
}