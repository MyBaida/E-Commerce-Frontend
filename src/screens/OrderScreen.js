import React, { useState, useEffect , useReducer} from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import { useParams, useNavigate , useLocation} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart, saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import {Link}  from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import Message from '../Components/Message'


const PlaceOrderScreen = () => {

const orderCreate = useSelector(state => state.orderCreate)
const {order, error, success} = orderCreate   

const dispatch = useDispatch  ()  

const ship = useSelector(state => state.ship)
const cart = useSelector(state => state.cart)
const navigate = useNavigate()
const location = useLocation()


const newCart = { ...cart };
newCart.itemPrice = newCart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
newCart.shippingPrice = (newCart.itemPrice > 150000 ? 0 : 20).toFixed(2);
newCart.totalPrice = Number(newCart.shippingPrice) + Number(newCart.itemPrice);




useEffect(() => {
    if (success) {
        navigate(`/order/${order._id}`);
    }
}, [ success, order, navigate]);




const placeOrder = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: ship.shippingAddress,
        paymentMethod: ship.paymentMethod,
        itemPrice: newCart.itemPrice,
        shippingPrice: newCart.shippingPrice,
        orderTotal: newCart.totalPrice,
    }, navigate));
};


console.log('Received order object:', order)
  return (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
    <h2>Shipping</h2>
    {order.user && (
        <>
            <p><strong>Name: </strong>{order.user.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            {/* Render other properties of order.user similarly */}
        </>
    )}
    <p>
        <strong>Shipping: </strong>
        {ship.shippingAddress.address}, {ship.shippingAddress.city}
        {'  '}
        {ship.shippingAddress.postalCode}
        {'  '}
        {ship.shippingAddress.country}
    </p>
    {order.isDelivered ? (
                            <Message variant='success'> Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='warning'> Not Delivered </Message>
                        )
                        
                    }

</ListGroup.Item>


                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Method: </strong>
                            {ship.paymentMethod}
                            
                        </p>

                        {order.isPaid ? (
                            <Message variant='success'> Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'> Not Paid </Message>
                        )
                        
                    }
                
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>

                        {ship.cartItems.length === 0 ? 
                        <h3>Your cart is empty</h3>
                        :(
                           <ListGroup variant='flush'>
                               {ship.cartItems.map((item, index) => (
                                   <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={6}>
                                            {item.qty} X GHS {item.price} = GHS {(item.qty*item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                   </ListGroup.Item>
                               ))}
                           </ListGroup>
                        )
                    }

                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary </h2>                        
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>GHS {newCart.itemPrice}</Col>
                            </Row>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>GHS {newCart.shippingPrice}</Col>
                            </Row>    
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>GHS {cart.taxPrice}</Col>
                            </Row>    
                        </ListGroup.Item> */}

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>GHS {newCart.totalPrice}</Col>
                            </Row>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>


                        


                        </ListGroup>
                </Card>        
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen



