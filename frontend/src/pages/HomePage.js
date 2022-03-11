import {useEffect} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import Product from "../components/products/Product";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, getTopProducts} from "../redux/products/productActions";
import {useParams} from "react-router-dom";
import Paginate from "../components/paginate";
import HomeCarsoul from "../components/homeCarsoul";

const HomePage = () => {
    const {keyword} =useParams();
    const {pageNumber} = useParams()
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productsList)
    const { loading, error, products,page,pages } = productList

    const topProducts = useSelector((state) => state.topProducts)
    const { loading:tLoading,error:tError,products:tProducts } = topProducts


    useEffect(() => {
        dispatch(getTopProducts())

        dispatch(getProducts(keyword,pageNumber))
    }, [dispatch,keyword,pageNumber])
    return (
        <>
            {!keyword && <HomeCarsoul/>}

            <br/>
          { !keyword && <h3>Our Trending Products</h3>}
            {tLoading && <Spinner animation='grow' />}
          
            {(tError)&& <h2 className='text-danger'>{tError}</h2>}

            {  tProducts &&!keyword &&
                <>
                    <Row>
                        {tProducts.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
                    }
        
            <h3>Our Latest Products</h3>
            {loading && <Spinner animation='grow' />}
            {(products.message)&& <h2 className='text-danger'>{products.message}</h2>}
            {(error)&& <h2 className='text-danger'>{error}</h2>}
            {(products.length < 1)&& <p> No products found  </p>}

            {  !products.message &&
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ?keyword:''} />
                </>
                    }
        </>
    );
};

export default HomePage;