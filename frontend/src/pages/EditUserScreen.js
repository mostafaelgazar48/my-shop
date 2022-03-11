import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../components/UI/FormContainer';
import Message from '../components/UI/Message';
import { useHistory, useParams } from 'react-router';
import { getUserDetails, updateUser } from '../redux/user/userActions';
import { USER_EDIT_RESET } from '../redux/user/userConstants';

const EditUserScreen = () => {
  const { id: userId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory();

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user: userDetail } = userDetails
  const { user } = userDetail;


  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: updateLoading, error: updateError, success: updatedSuccessfully } = userUpdate

  useEffect(() => {
    if (updatedSuccessfully) {
      dispatch({ type: USER_EDIT_RESET })
      history.push('/admin/userslist')
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {

        setEmail(user.email)
        setName(user.name)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user,userId,updatedSuccessfully,dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({
      _id:userId,
      name:name,
      email:email,
      isAdmin:isAdmin

    }))

  }
  return (
    <>

      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User {userId}</h1>
        {updateLoading && <Spinner animation="grow" />}
        {updateError && <Message variant='danger'> {updateError}</Message>}
        {loading ? (
          <p> loading......</p>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
             Save Changes
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserScreen;