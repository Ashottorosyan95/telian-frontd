import React from 'react'
import ProductCard from '../Product/ProductCard'
import { useSelector } from "react-redux";
import Heading from '../../Fashion/Heading'

const RelatedProduct = ({id, type}) => {
    let products = useSelector((state) => state.products.products).filter(i => i.id !== id && i.rate === type);

    return products.length ? (
        <section id="related_product" className="pb-100">
            <div className="container">
                <Heading heading="- Նման Մոդելներ -"  />
                <div className="row">
                    {products.slice(0, 4).map((data, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index} >
                            <ProductCard data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    ) : <></>
}

export default RelatedProduct