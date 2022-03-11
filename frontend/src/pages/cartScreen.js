import React, {useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../redux/cart/cartActions";
import {Button, Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Message from "../components/UI/Message";
import CartItem from "../components/UI/cartItem";

const CartScreen = () => {
    const {id}=  useParams();
    const dispatch =  useDispatch();
    const history = useHistory();
    const {cartItems} =useSelector(state=>state.cart)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const qty = urlParams.get('qty') ?Number(urlParams.get('qty')):1

    console.log(cartItems)
    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty))
        }

    },[id,qty,dispatch]);

    const checkoutHandler =()=>{
            history.push(('/login?redirect=shipping'))
    }
    return (
        <>
            <h2>Shopping Cart</h2>
            {cartItems.length ===0 && <Message> You Don`t have any product in the cart <Link to='/'> Back</Link> </Message>}
          <Row>

              <Col md={9}>
                  <Row>
                  {cartItems.map((product) => (
                  <Col key={product.product} sm={12} md={6} lg={4} xl={3}>
                      <CartItem product={product} />
                  </Col>


              ))}
                  </Row>
            </Col>
              <Col md={3}>
                  { cartItems.length >0 && <Card style={{marginTop: '16px'}}>
                      <ListGroup>
                          <ListGroupItem>
                              {cartItems.length > 0 &&
                              <small>
                                  SubTotal({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} Items)
                                  :
                                  <span
                                      style={{color: 'green'}}>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} $</span>
                              </small>

                              }

                          </ListGroupItem>
                          <ListGroupItem className='text-center'>
                              <Button type='button' onClick={checkoutHandler}>
                                  Proceed To Buy
                              </Button>
                          </ListGroupItem>
                      </ListGroup>
                  </Card>}
              </Col>
          </Row>
        </>
    );
};

export default CartScreen;