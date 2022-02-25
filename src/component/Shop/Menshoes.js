import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Common/Product/ProductCard';
import img from '../../assets/img/common/empty-cart.png'

const MennShoes = () => {
  let products = useSelector((state) => state.products.products);
  let menShoes = products.filter(item => item.rate === 'men' && item.count > 0);

  return (
    <section id="empty_cart_area" className="ptb-100">
      <div className="container">
        <div className="row">
          {menShoes.length ?
            <div className="col-lg-12">
                <div className="row">
                    {menShoes.map((data, index) => (
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
export default MennShoes