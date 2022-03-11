import React, { useEffect } from 'react';
import { Button, Table,Row,Col, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/UI/Message';
import { deleteProduct, getProducts ,createProduct} from '../redux/products/productActions';
import {PRODUCT_CREATE_RESET} from "../redux/products/productConstants";
import Paginate from "../components/paginate";

const ProductListPage = () => {
    const {pageNumber} = useParams()
    const dispatch = useDispatch()
    const history= useHistory()
  const productsList = useSelector((state) => state.productsList)
  const { loading, error, products,page,pages } = productsList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading:deleteLoading, error:deleteError, success:successDelete } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
      dispatch({type:PRODUCT_CREATE_RESET})
        if(!userData && !userData.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/products/${createdProduct._id}/edit`)
        }else {
            dispatch(getProducts('',pageNumber));

        }
  }, [userData,dispatch,history,successDelete,successCreate,createdProduct,getProducts,pageNumber])


  const deleteHandler=(id)=>{
      if(window.confirm('procced to delete ?')){
        dispatch(deleteProduct(id))
      }
  }

  const addProductHandler = ()=>{
     dispatch(createProduct())
  }
    return (

        <>

        <Row style={{ textAlign:'center' }}>
              
               <Col className ='my-3'>
                    <h1>Products</h1>  
                </Col>

                <Col onClick={addProductHandler}>
                    <Button className='my-3 text-right' variant='success'>
                     <i className='fas fa-plus'/>   Add Product
                    </Button>
                </Col>
        </Row>
        {(deleteLoading ||loadingCreate) && <Spinner animation="grow" />}
        {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
         <p>loading ...</p>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
            <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              { products && products.map((product) => (
                <tr key={product._id}>
                  <td> <Image roundedCircle width='70px' height='70px' src={product.image}/> </td>
                  <td>{product.name}</td>
                  <td width='405' >
                  {product.description}
                  </td>
                  <td>
                  {product.price} $
                  </td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
                <Paginate page={page} pages={pages} isAdmin={true}/>
            </>
        )}
      </>
    );
};

export default ProductListPage;