import {Link, useHistory, useParams} from "react-router-dom";
import {Button, Col, Form, FormControl, Image, ListGroup, ListGroupItem, Row, Spinner} from "react-bootstrap";
import Rating from "../components/Ratings/Rating";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSingleProduct} from "../redux/product-details/productDetailsActions";
import {createProductReview} from "../redux/products/productActions";
import Message from "../components/UI/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from "../redux/products/productConstants";

const ProductPage = (props) => {
    const [qty,setQty]=useState(1);
    const [rating,setRating] =useState(0)
    const [comment,setComment] = useState('')
    const { id } = useParams();
    const history= useHistory();

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product} = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userData} = userLogin

    const addReview = useSelector((state) => state.addReview)
    const { loading:loadingReview, error:errorReview, success:successReview} = addReview

    const addToCart= ()=>{
        history.push(`/cart/${id}?qty=${qty}`)
}
    const submitReviewHandler =(e)=>{
        e.preventDefault();
        dispatch(createProductReview(id,{
            rating,comment
        }))
    }
    useEffect(  () => {
        if (successReview){
            setRating(0)
            setComment('')
        }
        if(!product._id){
            dispatch(getSingleProduct(id))
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
    },[dispatch,id,successReview])


    return (
        <>
            <Link to='/'>
                Back
            </Link>
            {loading && <div className='text-center'>
                <Spinner  animation="grow"/>
            </div>}
            {error && <h2>{error}</h2>}
            {product.message && <h2>{product.message}</h2>}
            { (product && !product.message) &&
            <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <h3> {product.name}</h3>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} Review`}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p> ${product.price}</p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <p> ${product.description}</p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price ::
                                </Col>
                                <Col>
                                    {product.price} $
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ?
                                        'In Stock' :
                                        ' Out Of Stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {   product.countInStock > 0 &&
                            <ListGroupItem>
                                <Row>
                                    <Col> Qty</Col>
                                    <Col>
                                        <FormControl
                                        as='select'
                                        value={qty}
                                        onChange={(event)=>setQty(event.target.value)}
                                        >

                                        {
                                            [...Array(product.countInStock).keys()].map((value) =>(
                                                <option  key={value+1} value={value + 1}>{value+1}</option>
                                            ))
                                        }
                                        </FormControl>

                                    </Col>

                                </Row>
                            </ListGroupItem>}
                        <ListGroupItem>

                            <Button className='btn-primary btn-block mx-auto' type='button' onClick={addToCart}
                                    disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
                <Row>
                    <Col md={6} className="p-4">
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <p>No Reviews ...</p>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <Row>
                                        <Col md={6}><Rating value={review.rating}/></Col>
                                        <Col md={6} className="text-end">By:<strong>{review.name}</strong></Col>
                                    </Row>
                                    <Row>
                                   <Col className="text-center"> <q>{review.comment}</q></Col>

                                    </Row>
                                    <Row>
                                        <Col className="text-end"><p className="text-muted">{ review.createdAt.substring(0, 10)}</p></Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {successReview && (
                                    <Message variant='success'>
                                        Review submitted successfully
                                    </Message>
                                )}
                                {loadingReview && <Spinner variant="primary" animation="grow"/>}
                                {errorReview && (
                                    <Message variant='danger'>{errorReview}</Message>
                                )}
                                {userData ? (
                                    <Form onSubmit={submitReviewHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                className="mb-3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingReview}
                                            type='submit'
                                            variant='primary'
                                        >
                                            Add Review
                                        </Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to='/login'>sign in</Link> to write a review{' '}
                                    </Message>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
                }
        </>
    );
};

export default ProductPage;