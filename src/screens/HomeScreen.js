import React , {useState, useEffect}from 'react'
import {Row, Col} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'; 
import ProductCarousel from '../Components/ProductCarousel';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
    const dispatch =useDispatch()
    const location = useLocation();
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList


    let keyword = location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
        
    }, [dispatch, keyword])

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const keyword = searchParams.get('keyword') || '';
    //     dispatch(listProducts(`?keyword=${keyword}`));
    // }, [dispatch, location.search]);
    

  return (
    <div>
        {!keyword && <ProductCarousel/>}
        <h1>Latest Products</h1>
        {console.log(products)}\
        {loading ? <Loader/> 
          : error ? <h2>{error}</h2> 
            : 

              <div>
                <Row>
                  {products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                       <Product product={product}/>
                      </Col>
                  ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword} />
              </div>
        }

            

    </div>              
      
  )

// return (
//   <div>
//     <h1>Latest Products</h1>
//     {loading ? (
//       <Loader />
//     ) : error ? (
//       <Message variant='danger'>{error}</Message>
//     ) : (
//       <div>
//         <Row>
//           {Array.isArray(products) && products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       </div>
//     )}
//   </div>
// );

}

export default HomeScreen


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Row, Col } from 'react-bootstrap';
// import Product from '../Components/Product';
// import Loader from '../Components/Loader';
// import Message from '../Components/Message';
// import Paginate from '../Components/Paginate';
// import ProductCarousel from '../Components/ProductCarousel';
// import { listProducts } from '../actions/productActions';
// import { useLocation } from 'react-router-dom';

// function HomeScreen() {
//     const dispatch = useDispatch();
//     const productList = useSelector(state => state.productList);
//     const { error, loading, products, page, pages } = productList;
//     const location = useLocation();

//     let keyword = new URLSearchParams(location.search).get('keyword');

//     useEffect(() => {
//         dispatch(listProducts(keyword));

//     }, [dispatch, keyword]);

//     return (
//         <div>
//             {!keyword && <ProductCarousel />}

//             <h1>Latest Products</h1>
//             {loading ? <Loader />
//                 : error ? <Message variant='danger'>{error}</Message>
//                     :
//                     <div>
//                         <Row>
//                             {products.map(product => (
//                                 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                                     <Product product={product} />
//                                 </Col>
//                             ))}
//                         </Row>
//                         <Paginate page={page} pages={pages} keyword={keyword} />
//                     </div>
//             }
//         </div>
//     );
// }

// export default HomeScreen;
