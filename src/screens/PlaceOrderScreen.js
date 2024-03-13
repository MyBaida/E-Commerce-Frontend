import React, { useState, useEffect , useReducer} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import { addToCart, removeFromCart, saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import {Link}  from 'react-router-dom'


const PlaceOrderScreen = () => {
const ship = useSelector(state => state.ship)
const cart = useSelector(state => state.cart)

cart.itemPrice = cart.cartItems.reduce((acc,item)=> acc + item.price*item.qty, 0).toFixed(2)
cart.shippingPrice = (cart.itemsPrice >150000  ? 0 : 20).toFixed(2)
// cart.taxPrice = ((0.082)*cart.ItemPrice).toFixed(2)

cart.totalPrice = Number(cart.shippingPrice) + Number(cart.itemPrice)

const placeOrder = () => {
    console.log('place Order')
}


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <p>
                            <strong>Shipping: </strong>
                            {ship.shippingAddress.address}, {ship.shippingAddress.city}
                            {'  '}
                            {ship.shippingAddress.postalCode}
                            {'  '}
                            {ship.shippingAddress.country}
                        </p>
                
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Method: </strong>
                            {ship.paymentMethod}
                            
                        </p>
                
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
                                <Col>GHS {cart.itemPrice}</Col>
                            </Row>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>GHS {cart.shippingPrice}</Col>
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
                                <Col>GHS {cart.totalPrice}</Col>
                            </Row>    
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>


                        </ListGroup>
                </Card>        
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen
