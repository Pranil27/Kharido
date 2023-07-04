import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import {Carousel } from 'react-responsive-carousel'
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Typography, Button } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./ProductDetails.css"
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, getProductDetails} from "../../actions/productAction.js"
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import MetaData from '../layout/MetaData.js'
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../actions/cartAction';



const ProductDetails = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();


  const {id} =useParams();//match.params.id
  const {product,loading, error} = useSelector((state) => state.productDetails);

  const [quantity,setQuantity] = useState(1);

  const  increaseQuantity= () => {
      if(product.stock<=quantity) return;
      const x=quantity+1;
      setQuantity(x);
  }

  const decreaseQuantity = () =>{
    const x=quantity-1;
    if(1>x) return;
   
    setQuantity(x);
  }

  const addToCartHAndler = ()=>{
   
    dispatch(addItemsToCart(id,quantity));
    alert.success("ITEM ADDED TO CART")
  }


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
     dispatch(getProductDetails(id))
  },[dispatch,id,error,alert])


  const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 18 : 20,
    value:product.ratings,
    isHalf:true,
}

  return (
    <Fragment>
      {loading ?<Loader/>:(<Fragment>
        <MetaData title={`${product.name} -- KHARIDO`} />
    <div className='ProductDetails'>
        <div className='imageBlock'>
          <Carousel>
            {product.images && product.images.map((item,i)=>(
           
              <img className='CarouselImage'
                   key={item.url}
                   src={item.url} 
                   alt={`${i} Slide`}/>
             
            ))}

          </Carousel>
        
        </div>
      <div>
        <div className='detailsBlock-1'>
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
        </div>
        <div className='detailsBlock-2'>
          <ReactStars {...options}/>
          <span>({product.numberofreviews} Reviews)</span>
        </div>
        <div className='detailsBlock-3'>
          <h1>{`₹${product.price}`}</h1>
          <div className='detailsBlock-3-1'>
            <div className='detailsBlock-3-1-1'>
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly value={quantity} type="number"  />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button onClick={addToCartHAndler.bind(this)}>Add To Cart</button>
          </div>
          <p>
            Status:
            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
              {product.stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>
        <div className='detailsBlock-4'>
          Description : <p>{product.ratings}</p>
        </div>
        <button className='submitReview'>Submit Review</button>
     </div>
    </div>

    <h3 className='reviewsHeading'>REVIEWS</h3>

    {product.reviews && product.reviews[0] ? (
      <div className='reviews'>
        {product.reviews && product.reviews.map((review) => <ReviewCard review={review}/>)}
      </div>
    ) : (
      <p className='noReviews'>No Reviews</p>
    )}
    </Fragment>)}
    </Fragment>
  )
}

export default ProductDetails