import React, { useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { Form, Button } from 'react-bootstrap'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Loader from '../Components/Loader'; 
import Message from '../Components/Message'; 
import FormContainer from '../Components/FormContainer'; 
import { listProductDetails, updateProduct } from '../actions/productActions'; 
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'; 
 
function ProductEditScreen() { 
    const { id: productId } = useParams(); 
    const navigate = useNavigate(); 
 
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(''); 
    const [brand, setBrand] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [countInStock, setCountInStock] = useState(''); 
    const [description, setDescription] = useState(''); 
 
    const dispatch = useDispatch(); 
 
    const productDetails = useSelector(state => state.productDetails); 
    const { error: productDetailsError, loading: productDetailsLoading, product } = productDetails; 
 
    const categoryList = useSelector(state => state.categoryList); 
    const { loading: categoriesLoading, error: categoriesError, categories } = categoryList; 
 
    // const categoryList = useSelector(state => state.categoryList); 
    // const { loading, error, categories } = categoryList; 
 
    const productUpdate = useSelector(state => state.productUpdate); 
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate; 
 
    useEffect(() => { 
        if (successUpdate) { 
            dispatch({ 
                type: PRODUCT_UPDATE_RESET, 
            }); 
            navigate('/admin/productlist'); 
        } else { 
            if (!product || !product.name || product._id !== Number(productId)) { 
                dispatch(listProductDetails(productId)); 
            } else { 
                setName(product.name); 
                setPrice(product.price); 
                setBrand(product.brand); 
                setCategory(product.category); 
                setDescription(product.description); 
                setImage(product.image); 
                setCountInStock(product.countInStock); 
            } 
        } 
    }, [dispatch, product, productId, navigate, successUpdate]); 
 
    const submitHandler = (e) => { 
        e.preventDefault(); 
        dispatch(updateProduct({ 
            _id: productId, 
            name, 
            price, 
            image, 
            brand, 
            category, 
            countInStock, 
            description, 
        })); 
        navigate('/admin/productlist'); 
    }; 
 
    return ( 
        <div> 
            <Link to='/admin/productlist'> 
                Go Back 
            </Link> 
 
            <FormContainer> 
                <h1>Edit Product</h1> 
                {loadingUpdate && <Loader />} 
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} 
 
                {productDetailsLoading || categoriesLoading ? ( 
                    <Loader /> 
                ) : productDetailsError || categoriesError ? ( 
                    <Message variant='danger'>{productDetailsError || categoriesError}</Message> 
                ) : ( 
                    <Form onSubmit={submitHandler}> 
                        <Form.Group controlId='name'> 
                            <Form.Label>Name</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            /> 
                        </Form.Group> 
 
                        <Form.Group controlId='price'> 
                            <Form.Label>Price</Form.Label> 
                            <Form.Control 
                                type='number' 
                                placeholder='Enter price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            /> 
                        </Form.Group> 
 
                        <Form.Group controlId='image'> 
                            <Form.Label>Image</Form.Label> 
                            <Form.Control 
                                type='text' 
                                placeholder='Enter image path' 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)}/> 
                                </Form.Group> 
         
                            <Form.Group controlId='brand'> 
                                <Form.Label>Brand</Form.Label> 
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter brand' 
                                    value={brand} 
                                    onChange={(e) => setBrand(e.target.value)} 
                                /> 
                            </Form.Group> 
         
                            <Form.Group controlId='category'> 
                                <Form.Label>Category</Form.Label> 
                                <Form.Control 
                                    as='select' 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                > 
                                    {categories.map(cat => ( 
                                        <option key={cat._id} value={cat._id}>{cat.name}</option> 
                                    ))} 
                                </Form.Control> 
                            </Form.Group> 
         
                            <Form.Group controlId='countInStock'> 
                                <Form.Label>Count In Stock</Form.Label> 
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter Count In Stock' 
                                    value={countInStock} 
                                    onChange={(e) => setCountInStock(e.target.value)} 
                                /> 
                            </Form.Group> 
         
                            <Form.Group controlId='description'> 
                                <Form.Label>Description</Form.Label> 
                                <Form.Control 
                                    type='text' 
                                    placeholder='Enter description' 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                /> 
                            </Form.Group> 
         
                                <Button type='submit' variant='primary'>Update</Button> 
                            </Form> 
                        )} 
                    </FormContainer> 
                </div> 
        ); 
    } 
         
export default ProductEditScreen;


