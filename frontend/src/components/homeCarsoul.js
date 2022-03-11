import React from 'react';

import {Carousel} from "react-bootstrap";
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.jpg"


const HomeCarsoul = () => {
   
    return(
       /*  <Carousel className="bg-dark" >
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Carousel.Caption className='carousel-caption' style={{position:"absolute",top:"20px"}}>
                            <h3 style={{ color:"black"}}>
                                {product.name} (${product.price})
                            </h3>
                        </Carousel.Caption>
                        <Image className="d-block w-100 m-auto" style={{height:"400px"}} src={product.image} alt={product.name} fluid />

                    </Link>
                </Carousel.Item>
            ))}
        </Carousel> */
        <div className="w-100 bg-dark">
        <Carousel style={{ width:"100%",height:"420px",overflow:"hidden"}} fade>
  <Carousel.Item >
    <img
      className="d-block w-100 h-20"

      src={image1}
      alt="First slide"
    />
    <Carousel.Caption  style={{ position:"absolute", top:"30px",left:"20px", color:"black",width:"30%"}}>
   
      <h3> Shop now phones & accessories & cameras</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image2}
      alt="Second slide"
    />

    <Carousel.Caption style={{ position:"absolute", top:"160px", color:"white"}}>
     
      <h3 style={{ color:"white" }}> pay online and recieve it in your home </h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
    />

    <Carousel.Caption style={{ position:"absolute", top:"100px",left:"65%" ,width:"30%", color:"black"}}>
   
      <h3>wait our hot deals to get the cheapest price for the product</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
    )
}
export default HomeCarsoul;