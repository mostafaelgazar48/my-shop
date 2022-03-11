import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listUserOrders } from '../../redux/orders/orderActions';
import Message from '../UI/Message';

const MyOrders = () => {
    const dispatch= useDispatch();
    const history= useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const {userData} = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const {user} = userDetails;

    const userOrders = useSelector(state=>state.userOrders);
    const {loading:orderLoading,error:orderError,orders} = userOrders;

    ///const redirect = urlParams.get('redirect') ? urlParams.get('redirect') : '/'
    let token;
    if (userData && userData.token) {
        token = userData.token;
    }
    //.log(userData!==0)
    useEffect(() => {
        if(!token){
            history.push('/login')
        }
            if (!user.name){
                dispatch(listUserOrders());
            }

    }, [history, token])
    return (
        <div>
              <h2>My Orders</h2>
        {orderLoading ? (
          <p>loading</p>
        ) : (orderError ||orders.message) ? (
          <Message variant='danger'>{orderError ?orderError :orders.message}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </div>
    );
};

export default MyOrders;