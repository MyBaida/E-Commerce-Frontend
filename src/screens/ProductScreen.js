// src/screens/ProductScreen.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../Components/Rating';
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
    <Link to="/" className="btn btn-light my-3">
      Go Back
    </Link>
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
          <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              className="btn-block"
              style={{ width: '100%', padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '0.25rem' }}
              type="button"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  </div>

  );
};

export default ProductScreen;