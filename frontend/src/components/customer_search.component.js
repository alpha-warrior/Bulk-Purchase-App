import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap';

export default class Vendor extends Component {
     constructor(props) 
     {
        super(props);

        this.state = {
            customer: this.props.match.params.id,
            productname: '',
            sort: 'price',
            product: [],
            quantity: 0
        }
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
       
    onChangeProductname(event)
    {
        this.setState({ productname: event.target.value });
    }
    onChangeSort(event)
    {
        this.setState({ sort: event.target.value });
    }
    onChangeQuantity(event)
    {
        this.setState({ quantity: event.target.value });
    }
   
    onSubmit(e) {
        e.preventDefault();

        const Product={
            name:this.state.productname,
            qty:0,
            sort:this.state.sort
        }
        //console.log("testing")
        //console.log(this.state.sort)
        axios.post('http://localhost:4000/customer/search', Product)
             .then(response => {
                 if(this.state.sort==="price")
                 {
                 this.setState({product: response.data.sort((a,b)=> a.price-b.price)});
                 }
                 else
                 {
                    this.setState({product: response.data.sort((a,b)=> a.quantity-b.quantity)});
                 }
                 //console.log(response.data)


             })
             .catch(function(error) {
                 console.log(error);
             })

        
    }
    order(e,product_id,vendor_name,price,product_name,product_quantity)
    {
        const order_details={
            username_customer:this.state.customer,
            username_vendor:vendor_name,
            price: price,
            quantity: this.state.quantity,
            status:"Not Dispatched",
            product_id: product_id,
            product_name: product_name,
            quantity_remaining: product_quantity
        }
        axios.post('http://localhost:4000/customer/order/1', order_details)
             .then(res => 
                {
                 axios.post('http://localhost:4000/customer/order/2', order_details)
             .then(res =>{
                axios.post('http://localhost:4000/customer/order/3', order_details)
                .then(res => {
                    axios.post('http://localhost:4000/customer/order/4', order_details)
             .then(res => {
                axios.post('http://localhost:4000/customer/order/5', order_details)
                .then(res => {
                    const Product={
                        name:this.state.productname,
                        qty:0,
                        sort:this.state.sort
                    }
                    //console.log("testing")
                    //console.log(this.state.sort)
                    axios.post('http://localhost:4000/customer/search', Product)
                         .then(response => {
                             if(this.state.sort==="price")
                             {
                             this.setState({product: response.data.sort((a,b)=> a.price-b.price)});
                             }
                             else
                             {
                                this.setState({product: response.data.sort((a,b)=> a.quantity-b.quantity)});
                             }
                             //console.log(response.data)
            
            
                         })
                         .catch(function(error) {
                             console.log(error);
                         })

                         this.props.history.push
                         ({
                              pathname: "/customer/search/" + this.state.customer
                           })
                });
             });
                });
             } );
             });

    }
    render() {
        const info= "akshit"
        return (
            <div>
                 <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product_name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductname}
                               />
                    </div>
                    <div className="form-group">
                    <label for="Type">Sort By:</label>
                    <select id="Type" value={this.state.sort} onChange={this.onChangeSort} >
                    <option value="price">Price</option>
                    <option value="quantity">Quantity</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
                 <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product_name</th>
                            <th>Vendor_name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.product.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.username}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>  
                                    <td><div className="form-group">
                                        <label>Quantity: </label>
                                        <input type="text" 
                                            className="form-control" 
                                            value={this.state.quantity}
                                            onChange={this.onChangeQuantity}
                                            />  
                                        </div>
                                    </td>
                                    <td><Button variant="success" onClick={(e)=>this.order(e,currentProduct._id,currentProduct.username,currentProduct.price,currentProduct.name,currentProduct.quantity)} > Order </Button> </td>
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