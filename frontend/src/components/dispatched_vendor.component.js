import React, {Component} from 'react';
import axios from 'axios';
import Vendor from './vendor.component';

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
            status: 'Dispatched'
        }
        console.log(Product)
        axios.post('http://localhost:4000/vendor/dispatched', Product)
             .then(response => {
                 this.setState({product: response.data});
                 console.log(response.data)
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
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.product.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.username_customer}</td>
                                    <td>{currentProduct.product_name}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.price}</td>
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