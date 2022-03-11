import React, {useEffect} from 'react';
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/UI/Message";
import {Link, useHistory} from "react-router-dom";
import {createOrder} from "../redux/orders/orderActions";

const PlaceorderPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderCreate = useSelector(state=> state.orderCreate);
    const {order,success,error} = orderCreate;
    const cart = useSelector(state =>state.cart);

    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+ item.qty * item.price, 0)

    cart.shippingPrice = cart.itemsPrice >200?0:25;
    cart.taxPrice = Number((.10 * cart.itemsPrice).toFixed(2));
    cart.totalPrice = Number(cart.shippingPrice) + Number(cart.taxPrice) +Number(cart.itemsPrice);

    const {shippingAddress} =  cart;
    useEffect(()=>{
            if(success &&!order.message){
                history.push(`/order/${order._id}`)
            }
    },[history,success])

    const placeOrderHandler =()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,
            shippingPrice:cart.shippingPrice,
            itemsPrice:cart.itemsPrice
        }))
    }
    return (
        <>
                <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping Address :</strong>
                                {shippingAddress.address} -  {shippingAddress.city} - {shippingAddress.postalCode} - {shippingAddress.country}

                            </p>

                        </ListGroupItem>


                        <ListGroupItem>
                            <h2> Payment Method </h2>
                            <strong>Method :</strong>
                            <small style={{color:'green'}}>{cart.paymentMethod}</small>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2> Orders List</h2>
                            {cart.cartItems.length ===0 ? (
                                <Message>
                                    Cart Is Empty
                                </Message>
                            ) : (
                             <ListGroup variant='flush'>
                                 {cart.cartItems.map((item,index) =>(
                                     <ListGroupItem key={index}>
                                         <Row>
                                             <Col md={2}>
                                                 <Image src={item.image} alt={item.name} fluid rounded />
                                             </Col>
                                             <Col>
                                                 <Link to={`/product/${item.product}`}>
                                                     {item.name}
                                                 </Link>
                                             </Col>

                                             <Col>
                                                 <small>QTY : {item.qty} |</small>
                                                 <small>PRICE : {item.price} |</small>
                                                 <small style={{color:'green'}}> TOTAL : {item.qty * item.price}</small>
                                             </Col>
                                         </Row>

                                     </ListGroupItem>
                                     ))}
                             </ListGroup>
                            )
                            }
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem className ='text-center '>
                                    <h2 className='py-2'> order summary</h2>
                            </ListGroupItem>
                            {error && <ListGroupItem>
                                <Message variant='danger'>{error}</Message>

                            </ListGroupItem>}
                            {(order && order.message )&& <ListGroupItem>
                                <Message variant='danger'>{order.message}</Message>

                            </ListGroupItem>}
                            <ListGroupItem>
                                <Row>
                                    <Col>Price : </Col>
                                    <Col> $ {cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping : </Col>
                                    <Col> $ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax : </Col>
                                    <Col> $ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>


                            <ListGroupItem>
                                <Row>
                                    <Col>Total  : </Col>
                                    <Col style={{color:'green'}}> $ {cart.totalPrice }</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem className ='d-grid'>
                                <Button variant='primary' className='btn btn-block' onClick={placeOrderHandler} disabled={cart.cartItems.length ===0}>
                                     Place Order
                                </Button>
                            </ListGroupItem>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceorderPage;