import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button , Card, Form} from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { addToCart } from '../actions/cartActions'




const ProductScreen = () => {

  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const { id } = useParams();
  
  

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = async () => {
    await dispatch(addToCart(id, qty));
    navigate(`/cart/${id}?qty=${qty}`);
  };
  
  

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

        {loading ? 
          <Loader>Loading...</Loader>
         : error 
         ? <Message variant='danger'>{error}</Message>
         :(
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
              </ListGroup.Item>
              <ListGroup.Item>Price: GHS {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>GHS {product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 &&(
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs='auto' className='my-1'>
                    <Form.Select value={qty} onChange={(e) => setQty(parseInt(e.target.value))}>
  <option>Quantity</option>
  {[...Array(product.countInStock).keys()].map((x) => (
    <option key={x + 1} value={x + 1}>
      {x + 1}
    </option>
  ))}
</Form.Select>

                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '0.25rem' }}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
            </Card>
          </Col>
        </Row>
         )
     }

     
    </div>
  );
};

export default ProductScreen;