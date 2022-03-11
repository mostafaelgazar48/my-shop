import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import FormContainer from "../components/UI/FormContainer";
import Message from "../components/UI/Message";
import {Button, Form, ProgressBar, Spinner} from "react-bootstrap";
import {getUserDetails} from "../redux/user/userActions";
import {getSingleProduct} from "../redux/product-details/productDetailsActions";
import {PRODUCT_UPDATE_RESET} from "../redux/products/productConstants";
import {updateProduct} from "../redux/products/productActions";
import axios from "axios";

const EditProductPage = () => {
    const {id:productId} = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [percent,setPercnt] = useState(0)


    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:updateLoading, error:updateError, success:updateSuccess } = productUpdate

    useEffect(()=>{
        if (updateSuccess){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/products ')
        }else  {
        if (!product || !product.name || product._id !== productId) {
            dispatch(getSingleProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
        }
    },[dispatch,productId,product,updateSuccess]);


    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData  =new FormData();
        formData.append('image',file)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setPercnt(percentCompleted)
                }

            }


            const {data} = await axios.post('/api/upload',formData,config)
            setImage(data);
            setUploading(false);
        }catch (error){
            console.error(error);
            setUploading(false)
        }


    }

    return (
        <>
            <FormContainer>
                <h1>Edit Product</h1>
                {updateLoading && <Spinner animation="grow" />}
                {updateError && <Message variant="danger">{updateError}</Message>}
                {loading ? (
                    <Spinner animation="grow" />
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

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading &&  <ProgressBar variant="success" now={percent} />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                as="textarea"
                                rows={5}
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default EditProductPage;