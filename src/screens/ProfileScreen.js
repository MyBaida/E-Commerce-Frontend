import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants';



function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassowrd] = useState('');
    const [message, setMessage] = useState('');
    
    const dispatch = useDispatch();
    const location = useLocation();
    
        
    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success} = userUpdateProfile;
    
    useEffect(() => {
        if (!userInfo) {
            window.location.href = '/login'; // Redirect using window.location.href
            }  else{
                if(!user || !user.name || success){
                    dispatch({type: USER_UPDATE_PROFILE_RESET})
                    dispatch(getUserDetails('profile'))
                }else{
                    setName(user.name)
                    setEmail(user.email)
                }
            }
        }, [userInfo, dispatch, user, success])
    
        const submitHandler = (e) => {
            e.preventDefault();
            if(password != confirmPassowrd){
                setMessage('Passwords do not match')
            }
            else{
                dispatch(updateUserProfile({
                    'id': user._id,
                    'name': name,
                    'email': email,
                    'password': password,
                }))
            }
        };
    return(<Row>
        <Col md ={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}  
            {error && <Message variant='danger'>{error}</Message>} 
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                         required
                        type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                         
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>


                <Form.Group controlId='PasswordConfirm'>
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                         
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassowrd}
                        onChange={(e) => setConfirmPassowrd(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Update
                </Button>

            </Form>
        </Col>

        <Col md ={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>);
}

export default ProfileScreen