import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Common/Product/ProductCard';
import img from '../../assets/img/common/empty-cart.png';


const Men = () => {
    let products = useSelector((state) => state.products.products);
    let men = products.filter(item => item.rate === 'men');
    
  return (
    <section id="empty_cart_area" className="ptb-100">
      <div className="container">
        <div className="row">
          {men.length ?
            <div className="col-lg-12">
              <div className="row">
                {men.map((data, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                    <ProductCard data={data} /> 
                  </div>
                ))}
              </div>
            </div> :
            <div className="empaty_cart_area">
              <img src={img} alt="img" />
              <h2>Ցավոք այս պահին առկա չէ տվյալ ապրանքը</h2>
            </div>
          }
        </div>
       </div>
    </section>
  )
}
export default Men