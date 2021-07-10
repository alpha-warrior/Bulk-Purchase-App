import React, {Component} from 'react';
import axios from 'axios';
import Vendor from './vendor.component';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class AddVendor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            customer: this.props.match.params.id,
            quantity:0,
            rating: 0
        }
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);

    }

    componentDidMount() {
        
        const Order={
            username_customer: this.state.customer
        }
        // console.log(Product)
        axios.post('http://localhost:4000/customer/list', Order)
             .then(response => {
                 this.setState({order: response.data});
                // console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onChangeQuantity(event)
    {
        this.setState({ quantity: event.target.value });
    }
    onChangeRating(event)
    {
        this.setState({ rating: event.target.value });
    }
    // can(e,name,temp,id)
    // {
    //     const Product={
    //         username: temp,
    //         name: name,
    //         quantity: 0,
    //         status: 'Not Dispatched',
    //         id: id
    //     }
    //     console.log(name)
    //     console.log(temp)
    //     // console.log(Product)
    //     axios.post('http://localhost:4000/vendor/product_cancel ', Product)
    //          .then(response => {
    //             //  this.setState({product: response.data});
    //             // sconsole.log(response.data)
    //             const Product={
    //                 username: this.state.Vendor,
    //                 quantity: 0,
    //                 status: 'Not Dispatched'
    //             }
    //             // console.log(Product)
    //             axios.post('http://localhost:4000/vendor/product', Product)
    //                  .then(response => {
    //                      this.setState({product: response.data});
    //                      //console.log(response.data)
    //                  })
    //                  .catch(function(error) {
    //                      console.log(error);
    //                  })
    //             this.props.history.push
    //            ({
    //                 pathname: "/vendor/product/" + this.state.Vendor
    //              })
    //          })
    //          .catch(function(error) {
    //              console.log(error);
    //          })

        
    // }

    chng(e,x)
    {
        const chng = {
            qty: this.state.quantity,
            product_id: x.product_id,
            order_id: x._id
        }
        axios.post('http://localhost:4000/customer/edit', chng)
             .then(response => {
                 //this.setState({product: response.data});
                 console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    rte(e,x)
    {
        const rte = {
            vendor_username: x.username_vendor,
            rating: this.state.rating
        }
        axios.post('http://localhost:4000/customer/rate', rte)
             .then(response => {
                 //this.setState({product: response.data});
                 console.log(response.data)
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    comp2=function(x){
        if(x.status==="Not Dispatched")
        {
            return <Button variant="success" onClick={(e)=>this.chng(e,x)} > Edit </Button>
        }
        else if(x.status==="Dispatched")
        {
            return <Button variant="warning" onClick={(e)=>this.rte(e,x)} > Rate </Button>
        }
    }
    comp=function(x){
        if(x.status==="Not Dispatched")
        {
            return <div className="form-group">
            <label>Quantity Change: </label>
            <input type="text" 
                className="form-control" 
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                />  
            </div>
        }
        else if(x.status==="Dispatched")
        {
            return <div className="form-group">
            <label>Rating: </label>
            <input type="text" 
                className="form-control" 
                value={this.state.rating}
                onChange={this.onChangeRating}
                />  
            </div>
        }
    }
    render() {
        return (
            <div>
                {/* <p>HELLO VENDOR {this.state.Vendor} </p> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product_name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Quantity_remaining </th>
                            <th>Vendor_Username</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.order.map((currentOrder, i) => {
                            return (
                                <tr>
                                    <td>{currentOrder.product_name}</td>
                                    <td>{currentOrder.price}</td>
                                    <td>{currentOrder.quantity}</td>
                                    <td>{currentOrder.quantity_remaining}</td>
                                    <td>{currentOrder.username_vendor}</td>
                                    <td>{currentOrder.status}</td>
                                    <td>{this.comp(currentOrder)}</td>
                                    <td>{this.comp2(currentOrder)}</td>
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