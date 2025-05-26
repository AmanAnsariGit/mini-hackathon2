import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Body from '../../components/Body';

const ProductDetail = () => {
  const location = useLocation();
  const [count, setCount] = useState(1)


  const details = location.state;
  const handleIncrement = () => {
    if(count >= 5){
      return;
    }
    setCount(count + 1)
  }
 
  const handleDecrement = () => {
    if(count <= 1){
      return;
    }
    setCount(count -1)
  }
  return (
    <Body>

    <div className="Display_div">


    <div className="Display_img">
      <div className="display_img_main">
        <img src={details.image} alt="product" />
      </div>
      <div className="display_img_color">
        <div>
          <img src={'https://s3-alpha-sig.figma.com/img/51c4/5a78/b417beff6f8fa6310534f3755fd23c5a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RHU18ynEYz5up7vcymv-VcJhT3lYFyYNq-3j3V70ENNLhlvibgAg3-9ZOdeQLTONp7C1BSeNNrRWZRrd-An96p6~KTdamcZgCdXJAjMj8zVWtjkO2xn3ZPOIPSulsrBShib7OuCTZTPnfP~lpIcMq4K2HbQtMUOE~oVIb8toVCgw1speuU9lQ-vqalOYCAl7Onv~ghwo7V3E56HfBprvnB40RJhy6snaKaGqHvD5pcIrzXVcZ2rt-xWjatA4L~Tg85bvcpeRZdIT15HErFIB4dZZ~QOycbl9JuPSA-WDQf4kOtkLYrjTqGK5ofLb9dzKiKrljt983nRMsDjZBEIeNA__'} alt="" />
        </div>
        <div>
          <img src={'https://s3-alpha-sig.figma.com/img/21d6/bcec/533545a2b1e10e90b8059bc1bc97eab5?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RNiY7JqcYYEBdFDGA3nOkSQ6wRT2arSlRrZ0fj2mUjS~IEHZXzVI~b27Hf0kPaMMb0pbOfQtUcz9FBK1ZUIbGxg18eRlYvKOZherqyuzZ5IrxUai1HXu47FMIBPAcgkybOgh~0-8ASWHUfg83s-uwg9i942eGGSPWAtawTunsLoZtg9-1zD5Id8vSadyiN8XLDss1IWnnUYh6BVPNf2OFKfBVp7IX4LHWUnFmsnCofOi-cmuIf9hvt8pAP88IdazxWcM~RgchxcP2CD0~0GSz5T0IpamVTQky~BsuHBvTQAxZ1V5VnP3bfLG9Csvw77F2FkBOhe5XzTt7PJSu4Bwwg__'} alt="" />
        </div>
        <div>
          <img src={'https://s3-alpha-sig.figma.com/img/52ce/3b46/9d8d7ff6e33f95a574450e07218fc909?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MncDMQABX9-tt2ESIn4pdGuhZ5bFk9eZ3JPKGikN8u1i8qwkkYIZz7X273zXGZPsrmdHlmrFTQQgiuGlHC42JkegRJ5WUEUvDfIaJ1zDjt0h1esjgr8Dy8z8uurvv-JXbf7wbIjihgFYMe9pY9VWBvTMFDwHo588NcISpy9tXL4ecBfomjDGxzqcbztFRznIetR5UwFJj5i7U0Lh478EwVUFp5AFSezvv2l8vanVl-KmlzbPEupzeFq3WQ4us~5x-DkKLYScCTJBNmnL8m9Rp0-YqPDrOX89jBYUBb7BnhJEVhCFpL01MoJHKtX7nNsN4yXtpIchwzxjicP5N8pfaA__'} alt="" />
        </div>
        {/* <div></div>  */}
      </div>
    </div>


    <div className="Display_text">
      <h2>{details.name}</h2>
     <div>
      <span style={{color: '#999B9E', fontSize: '12px', marginLeft: '5px', fontWeight: 600}}>( rate and Review)</span>
     </div>
      <h1>${details.price}</h1>

      <div style={{display: 'flex', gap: '50px'}}>
        <div className="avail_color">
          <span>Available Color</span>
          <p>
          <div></div>
          <div></div>
          </p>
        </div>
      <div className="add_btn">
        <span>Quantity</span>
        <p>
        <button onClick={handleDecrement}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrement}>+</button>
        </p>
      </div>
      </div>


      <div className="event_btn">
        <button>BUY IT NOW</button>
        <button>ADD TO CART</button>
      </div>
    </div>
  </div>
  </Body>
  )
}

export default ProductDetail