import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/UI/Message";
import {Link, useParams} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {deliverOrder, getOrderDetails, payOrder} from "../redux/orders/orderActions";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_DELIVER_RESET, ORDER_PAY_RESET} from "../redux/orders/orderConstants";

const OrderPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // when sdk is ready
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const {loading:payLoading,success:paySuccess} = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading:deliverLoading,success:deliverSuccess} = orderDeliver;
    const userLogin = useSelector((state) => state.userLogin);
    const {userData} = userLogin;


    if (!loading) {
        order.itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0));

    }



    useEffect(() => {
        const addpaypalScript = async () => {
            const {data: client_id} = await axios.get('/api/config/paypalid');
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}`
            script.addEventListener('load', function (){
                setSdkReady(true)
            })

            document.body.appendChild(script)
        }


        if(!order || paySuccess||deliverSuccess){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
                if(!window.paypal){
                    addpaypalScript()
                }else {
                    setSdkReady(true)
                }
        }
    }, [dispatch, id, order, paySuccess,deliverSuccess])

    const paySuccessHandler=(paymentResult)=>{
        console.log(paymentResult)
       //dispatch(payOrder(id,paymentResult))
    }

    const deliverOrderHAndler =()=>{
           dispatch(deliverOrder(order))
    }
    return loading ? <p> loading.......</p> : (error || (order && order.message)) ?
        <Message variant='danger'>{error || 'some thing went wrong'}</Message> :
        <Row>
            <Col md={8}>
                <h2>Order Number <p style={{color: 'green'}}>{order._id}</p></h2>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping to</h2>
                        <p><strong>To Client</strong>: {order.user.name}</p>
                        <p><strong>Mail To</strong>:{order.user.email}  </p>

                        <p>
                            <strong>Shipping Address :</strong>
                            {order.shippingAddress.address}
                            {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                            {order.shippingAddress.country}

                        </p>
                        <p>
                            {
                                order.isDelivered ?
                                    <Message variant='success'> Delivered At{order.deliveredAt}</Message> :
                                    <Message variant='danger'> Not Delivered Yet</Message>
                            }
                        </p>

                    </ListGroupItem>


                    <ListGroupItem>
                        <h2> Payment Method </h2>
                        <strong>Method :</strong>
                        <small style={{color: 'green'}}>{order.paymentMethod}</small>
                        <small> {
                            order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> :
                                <Message variant='danger'> Not Paid Yet</Message>
                        }
                        </small>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2> Orders List</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>
                                order is empty
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col>
                                                <small>QTY : {item.qty} |</small>
                                                <small>PRICE : {item.price} |</small>
                                                <small style={{color: 'green'}}> TOTAL : {item.qty * item.price}</small>
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
                        <ListGroupItem className='text-center '>
                            <h2 className='py-2'> order summary</h2>
                        </ListGroupItem>
                        {error && <ListGroupItem>
                            <Message variant='danger'>{error}</Message>

                        </ListGroupItem>}
                        {(order && order.message) && <ListGroupItem>
                            <Message variant='danger'>{order.message}</Message>

                        </ListGroupItem>}
                        <ListGroupItem>
                            <Row>
                                <Col>Sub total : </Col>
                                <Col> $ {order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Shipping fee : </Col>
                                <Col> $ {order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Tax 10% : </Col>
                                <Col> $ {order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>


                        <ListGroupItem>
                            <Row>
                                <Col>Total : </Col>
                                <Col style={{color: 'green'}}> $ {order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            {  !order.isPaid && (
                                <ListGroupItem>
                                    {payLoading && <p>Payloading......</p>}

                                    {!sdkReady ?<p>SDKloading......</p>: <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={paySuccessHandler}
                                    />
                                    }

                                </ListGroupItem>
                            )}


                            {
                              userData && userData.isAdmin && !order.isDelivered &&(
                                  <ListGroupItem>
                                      <Button className="btn btn-success" onClick={deliverOrderHAndler}>
                                          Mark As Delivered
                                      </Button>
                                  </ListGroupItem>
                              )
                            }
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
};

export default OrderPage;