import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'


function CategoryCarousel() {

    const navigate = useNavigate()

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    const productHandler = (id, categoryName) => {
        const lowercaseCategoryName = categoryName.toLowerCase();
        navigate(`/category/${lowercaseCategoryName}/${id}`);
    };


    return (
        <div>
            
            <h5>Filter By Categories</h5>
            
            {loading  ? <Loader/> 
              : error  ? <h2>{error}</h2> 
                : 
    
                <div>
                    <Row>
                        <Col>
                    {categories.map((category) => (
                        <Button 
                        key={category._id} 
                        onClick={() => productHandler(category._id, category.name)}
                        className='btn btn-circle my-3 '>
                        {category.name}
                        </Button>
                    ))}
                    </Col>
                    </Row>
                </div>
            }
        </div>      
      )
}

export default CategoryCarousel