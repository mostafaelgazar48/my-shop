import { Card} from "react-bootstrap";
import Rating from "../Ratings/Rating";
import classes from "./product.module.css";
import {Link} from "react-router-dom";
const Product = ({product}) => {
    return (

        <Card className={`my-3 py-3 rounded ${classes.product}`}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Link to={`/product/${product._id}`} >
                  <Card.Title as='p' style={{ fontSize:"small" }}>{product.name}</Card.Title>
                </Link>
            <Card.Text as='div'>
                <Link to={`/product/${product._id}`} >
                <div className='my-3 '>
                 <Rating  value={product.rating} text={`${product.numReviews} Reviews`} />
               </div>
                    </Link>
            </Card.Text>
            <Card.Text as='h5'>
                {product.price} $
            </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;