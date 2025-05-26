import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../store/slices/CartSlice'

const ProductCard = ({data}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const handleProductDetail = (id) => {
  //   navigate(`/productDetail/${id}`, {state: data})
  // }

  const handleAddCart = (data) => {
    dispatch(addToCart(data))
}
  return (
    <div className='cardBox'>
    <div className='cardImg'>
      {/* <div className='cate'>Category</div> */}
      <img src={data.images} alt="api-img" />
    </div>
    <div className='cardContext'>
      <span style={{color: '#333230', fontSize: 16, lineHeight: '20px', fontWeight: 700}}>{data.title}</span>
      <div style={{display: 'flex', gap: 10}}>
      <span style={{fontWeight: 700, fontSize: 14}}>${data.price}</span>
      <span style={{fontWeight: 500, fontSize: 14, textDecoration: 'line-through', color: '#333230'}}>{data.oldPrice}</span>
      </div>
      <button
      onClick={()=> handleAddCart(data)}
      className='ad_btn'>Add to cart</button>
    </div>
  </div>
  )
}

export default ProductCard