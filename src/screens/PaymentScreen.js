import React from 'react'
import  { useState, useEffect , useReducer} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import {  savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'
import FormContainer from '../Components/FormContainer'



const PaymentScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const ship = useSelector((state) => state.ship)
    const {shippingAddress} = ship


    if(!shippingAddress.address) {
        navigate('/shipping')

    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }


  return (
    <FormContainer>
        
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form as='legend'>Payment Method</Form>
                    <Form.Control as="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="PayPal">PayPal</option>
                        <option value="Credit Card">Credit Card</option>
                    </Form.Control>
                    <Col>
                    {/* <Form.Check
                        type='radio'
                        Label= 'Paypal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChanged={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        
      
     </FormContainer>
  )
}

export default PaymentScreen
