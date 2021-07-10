import React, {Component} from 'react';
import axios from 'axios';
import Vendor from './vendor.component';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class AddVendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            Vendor: this.props.match.params.id
        }
    }

    componentDidMount() {
        
        const Product={
            username: this.state.Vendor,
            quantity: 0,
            status: 'Ready to Dispatch'
        }
        console.log(Product)
        axios.post('http://localhost:4000/vendor/dispatch', Product)
             .then(response => {
                 this.setState({product: response.data});
                 console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    disp(e,name,temp,id)
    {
        const Product={
            username: temp,
            name: name,
            quantity: 0,
            status: 'Ready to Dispatch',
            id: id
        }
        // console.log(name)
        // console.log(temp)
        // console.log(Product)
        axios.post('http://localhost:4000/vendor/dispatch_disp ', Product)
             .then(response => {
                //  console.log("dispatched")
                const Product={
                    username: this.state.Vendor,
                    quantity: 0,
                    status: 'Ready to Dispatch'
                }
                console.log(Product)
                axios.post('http://localhost:4000/vendor/dispatch', Product)
                     .then(response => {
                         this.setState({product: response.data});
                         console.log(response.data)
                     })
                     .catch(function(error) {
                         console.log(error);
                     })


                     this.props.history.push
                     ({
                          pathname: "/vendor/dispatch/" + this.state.Vendor
                     })
             })
             .catch(function(error) {
                 console.log(error);
             })

        
    }

    render() {
        return (
            <div>
                {/* <p>HELLO VENDOR {this.state.Vendor} </p> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.product.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td><Button variant="success" onClick={(e)=>this.disp(e,currentProduct.name,this.state.Vendor,currentProduct._id)} > Dispatch </Button> </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}