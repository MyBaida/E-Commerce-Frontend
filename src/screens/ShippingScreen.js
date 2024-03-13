import React, { useState, useEffect , useReducer} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import { addToCart, removeFromCart, saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import FormContainer from '../Components/FormContainer'

const ShippingScreen = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const ship = useSelector((state) => state.ship)
    const {shippingAddress} = ship

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
    
    
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Control 
                required
                type='text'
                placeholder='Enter address'
                value={address ? address:''} 
                onChange={(e) => setAddress(e.target.value)}           
            >
            </Form.Control> 

        </Form.Group>
        <Form.Group controlId='city'>
            <Form.Control 
                required
                type='text'
                placeholder='Enter city'
                value={city ? city:''} 
                onChange={(e) => setCity(e.target.value)}           
            >
            </Form.Control> 

        </Form.Group>
        <Form.Group controlId='postalCode'>
            <Form.Control 
                required
                type='text'
                placeholder='Enter postal Code'
                value={postalCode ? postalCode:''} 
                onChange={(e) => setPostalCode(e.target.value)}           
            >
            </Form.Control> 

        </Form.Group>
        <Form.Group controlId='country'>
            <Form.Control 
                required
                type='text'
                placeholder='Enter country'
                value={country ? country:''} 
                onChange={(e) => setCountry(e.target.value)}           
            >
            </Form.Control> 

        </Form.Group>
            <Button type='submit' variant='prmary'>
                Continue
            </Button>
      </Form>
    
    </FormContainer>
  )
}

export default ShippingScreen
