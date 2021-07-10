import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Vendor extends Component {
     constructor(props) {
        super(props);

        this.state = {
            vendor: this.props.match.params.id
            
        }

    }

    add(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/add/" + this.state.vendor
                        })
    }

    product(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/product/" + this.state.vendor
                        })
    }

    dispatch(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatch/" + this.state.vendor
                        })
    }
    
    dispatched(e,info){
        this.props.history.push
                        ({
                            pathname: "/vendor/dispatched/" + this.state.vendor
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
            <Button block disabled variant="secondary">Hello, Vendor {this.state.vendor} </Button>
            <Button variant="success" onClick={(e)=>this.add(e,info)}> Add Product </Button>
            <Button variant="dark" onClick={(e)=>this.product(e,info)}> Current Products </Button>
            <Button variant="success" onClick={(e)=>this.dispatch(e,info)}> Dispatch </Button>
            <Button variant="dark" onClick={(e)=>this.dispatched(e,info)}> Dispatched </Button>
            <Button variant="danger" onClick={(e)=>this.logout(e,info)}> Logout </Button>
            </div>
        
        )
    }
}