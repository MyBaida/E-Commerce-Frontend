// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../Components/Loader'
// import Message from '../Components/Message'
// import FormContainer from '../Components/FormContainer'
// import { listCategoryDetails, updateCategory } from '../actions/categoryActions'
// import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants'


// function CategoryEditScreen({ match, history }) {

//     const categoryId = match.params.id

//     const [name, setName] = useState('')

//     const dispatch = useDispatch()

//     const categoryDetails = useSelector(state => state.categoryDetails)
//     const { error, loading, category } = categoryDetails

//     const categoryUpdate = useSelector(state => state.categoryUpdate)
//     const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate


//     useEffect(() => {

//         if (successUpdate) {
//             dispatch({ type: CATEGORY_UPDATE_RESET })
//             history.push('/admin/categorylist')
//         } else {
//             if (!category.name || category._id !== Number(categoryId)) {
//                 dispatch(listCategoryDetails(categoryId))
//             } else {
//                 setName(category.name)

//             }
//         }



//     }, [dispatch, category, categoryId, history, successUpdate])

//     const submitHandler = (e) => {
//         e.preventDefault()
//         dispatch(updateCategory({
//             _id: categoryId,
//             name,
//         }))
//     }

//     // const uploadFileHandler = async (e) => {
//     //     const file = e.target.files[0]
//     //     const formData = new FormData()

//     //     formData.append('image', file)
//     //     formData.append('product_id', productId)

//     //     setUploading(true)

//     //     try {
//     //         const config = {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data'
//     //             }
//     //         }

//     //         const { data } = await axios.post('/api/products/upload/', formData, config)


//     //         setImage(data)
//     //         setUploading(false)

//     //     } catch (error) {
//     //         setUploading(false)
//     //     }
//     // }

//     return (
//         <div>
//             <Link to='/admin/categorylist'>
//                 Go Back
//             </Link>

//             <FormContainer>
//                 <h1>Edit Category</h1>
//                 {loadingUpdate && <Loader />}
//                 {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

//                 {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
//                     : (
//                         <Form onSubmit={submitHandler}>

//                             <Form.Group controlId='name'>
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control

//                                     type='name'
//                                     placeholder='Enter name'
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group>

//                             {/* <Form.Group controlId='price'>
//                                 <Form.Label>Price</Form.Label>
//                                 <Form.Control

//                                     type='number'
//                                     placeholder='Enter price'
//                                     value={price}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group> */}


//                             {/* <Form.Group controlId='image'>
//                                 <Form.Label>Image</Form.Label>
//                                 <Form.Control

//                                     type='text'
//                                     placeholder='Enter image'
//                                     value={image}
//                                     onChange={(e) => setImage(e.target.value)}
//                                 >
//                                 </Form.Control>

//                                 <Form.File
//                                     id='image-file'
//                                     label='Choose File'
//                                     custom
//                                     onChange={uploadFileHandler}
//                                 >

//                                 </Form.File>
//                                 {uploading && <Loader />}

//                             </Form.Group> */}


//                             {/* <Form.Group controlId='brand'>
//                                 <Form.Label>Brand</Form.Label>
//                                 <Form.Control

//                                     type='text'
//                                     placeholder='Enter brand'
//                                     value={brand}
//                                     onChange={(e) => setBrand(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group> */}

//                             {/* <Form.Group controlId='countinstock'>
//                                 <Form.Label>Stock</Form.Label>
//                                 <Form.Control

//                                     type='number'
//                                     placeholder='Enter stock'
//                                     value={countInStock}
//                                     onChange={(e) => setCountInStock(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group> */}

//                             {/* <Form.Group controlId='category'>
//                                 <Form.Label>Category</Form.Label>
//                                 <Form.Control

//                                     type='text'
//                                     placeholder='Enter category'
//                                     value={category}
//                                     onChange={(e) => setCategory(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group> */}

//                             {/* <Form.Group controlId='description'>
//                                 <Form.Label>Description</Form.Label>
//                                 <Form.Control

//                                     type='text'
//                                     placeholder='Enter description'
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 >
//                                 </Form.Control>
//                             </Form.Group> */}


//                             <Button type='submit' variant='primary'>
//                                 Update
//                         </Button>

//                         </Form>
//                     )}

//             </FormContainer >
//         </div>

//     )
// }

// export default CategoryEditScreen



import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import FormContainer from '../Components/FormContainer';
import { listCategoryDetails, updateCategory } from '../actions/categoryActions';
import { CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

function CategoryEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoryDetails = useSelector(state => state.categoryDetails);
    const { error: errorDetails, loading: loadingDetails, category: categoryObj } = categoryDetails;

    const categoryUpdate = useSelector(state => state.categoryUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = categoryUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            navigate('/admin/categorylist');
        } else {
            if (!categoryObj || categoryObj._id !== Number(id)) {
                dispatch(listCategoryDetails(id));
            } else {
                setName(categoryObj.name);
            }
        }
    }, [dispatch, categoryObj, id, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({
            _id: id,
            name,
        }));
    };

    return (
        <div>
            <Link to='/admin/categorylist'>Go Back</Link>

            <FormContainer>
                <h1>Edit Category</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loadingDetails ? <Loader /> : errorDetails ? <Message variant='danger'>{errorDetails}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}

            </FormContainer>
        </div>
    );
}

export default CategoryEditScreen;
