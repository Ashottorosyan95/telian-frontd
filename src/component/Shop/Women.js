import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Common/Product/ProductCard';

const Women = () => {
    let products = useSelector((state) => state.products.products);
    let women = products.filter(item => item.rate === 'women' && item.count > 0);

  return (
    <section id="empty_cart_area" className="ptb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {women.map((data, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                         <ProductCard data={data} /> 
                </div>
              ))}
            </div>
          </div>
        </div>
       </div>
    </section>
  )
}
export default Women