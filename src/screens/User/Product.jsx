import React, { useEffect, useState } from 'react'
import Body from '../../components/Body';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
    const [data, setData] = useState([]);
    const selector = useSelector(state => state.CartReducer)
    const Api = async () =>{
        try {
            const response = await axios.get(BASE_URL)
            setData(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(data)
    useEffect(()=>{
        Api();
    },[])

console.log('selector', selector)
  return (
      <Body>
        <div className='card_wrapper'>
      {
        data.map((ele, ind) => {
            return(
                    <ProductCard data={ele} key={ind}/>
                )
            })
        }
        </div>
    </Body>
  )
}

export default Product;
