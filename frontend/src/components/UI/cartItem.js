import React from 'react';
import {Button, Card, Col, FormControl, Image, ListGroupItem, Row} from "react-bootstrap";
import classes from "../products/product.module.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart, removeCartItem} from "../../redux/cart/cartActions";
const CartItem = ({product}) => {
    const dispatch= useDispatch()


    return (
        <>

        <Card className={`my-3 py-3 rounded ${classes.product}`}>
            <Image src={product.image} />
         <ListGroupItem>
             <Card.Body>
                 <Link to={`/product/${product.product}`} >
                     <Card.Title as='div'>{product.name}</Card.Title>
                 </Link>
                 <Card.Text as='h5' style={{ color:"green" }}>
                     {product.price} $
                 </Card.Text>
             </Card.Body>
         </ListGroupItem>
            <ListGroupItem>
                <Row>
                    <Col> Qty</Col>
                    <Col>
                        <FormControl
                            as='select'
                            value={product.qty}
                            onChange={(event)=>dispatch(addToCart(product.product,event.target.value))}
                        >

                            {
                                [...Array(product.countInStock).keys()].map((value) =>(
                                    <option  key={value+1} value={value + 1}>{value+1}</option>
                                ))
                            }
                        </FormControl>

                    </Col>

                </Row>
            </ListGroupItem>
            <ListGroupItem>
             <Row>
                 <Col>
                     Total Price :
                 </Col>
                 <Col> {Math.floor(Number(product.qty * product.price))} $</Col>
             </Row>
            </ListGroupItem>

                    <Button type='button' variant='light' className='text-center' onClick={()=>dispatch(removeCartItem(product.product))}>
                        <i className='fas fa-trash'></i> Remove
                    </Button>



        </Card>
        </>
    );
};

export default CartItem;