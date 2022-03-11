import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/UI/Message'

import { deleteUser, listUsers } from '../redux/user/userActions'
const ListUsersScreen = () => {
    const dispatch = useDispatch()
    const history= useHistory()

  const userList = useSelector((state) => state.usersList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin


  const userDelete = useSelector((state)=>state.userDelete)
  const {success:userDeleted} = userDelete;

    useEffect(()=>{
        if (userData && userData.isAdmin) {
            dispatch(listUsers())
          } else {
            history.push('/login')
          }
    },[dispatch,userData,userDeleted])
  const deleteHandler = (id)=>{
      if(window.confirm('Proceed to delete !!')){
          dispatch(deleteUser(id))
      }
  }
    return (
        <>
        <h1>Users</h1>
        {loading ? (
         <p>loading ...</p>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {  users && !users.message && users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
};

export default ListUsersScreen;