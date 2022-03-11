import React, {useEffect} from 'react';
import Message from "../components/UI/Message";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {listOrders} from "../redux/orders/orderActions";

const ListOrdersPage = () => {

    const dispatch = useDispatch()
    const history= useHistory()

    const ordersList = useSelector((state) => state.ordersList)
    const { loading, error, orders } = ordersList

    const userLogin = useSelector((state) => state.userLogin)
    const { userData } = userLogin



    useEffect(()=>{
        if (userData && userData.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    },[dispatch,userData])

    return (
        <>
            <h1>orders</h1>
            {loading ? (
                <p>loading ...</p>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>SHIP TO</th>
                        <th>IS PAID</th>
                        <th>IS DELIVERED</th>
                        <th> TOTAL</th>

                        <th>DETAILS</th>
                    </tr>
                    </thead>
                    <tbody>
                    { orders && orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>
                                {`${order.shippingAddress.address} - ${order.shippingAddress.city}`}
                            </td>
                            <td>
                                {order.isPaid ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>

                            <td>{order.totalPrice}</td>

                            <td>
                                <LinkContainer to={`/order/${order._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ListOrdersPage;