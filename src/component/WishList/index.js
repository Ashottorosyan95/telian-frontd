import React from "react";
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import img from '../../assets/img/common/empty-cart.png'
import axios from "axios";
import Swal from "sweetalert2";

const Wishlist = () => {
    let dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);
    let favorites = useSelector((state) => state.products.favorites);
    console.log('kkkkkkkkkkkkkkkk', favorites);
    
    const rmFaveProduct = (favorites) => {
        let id = favorites.id;
        let wishlistId = favorites.wishlistId;
        let userId = user.id;
        dispatch({ type: "products/removeFav", payload: { id } });
        axios.post(process.env.REACT_APP_BACKEND_URL + '/delete-wishlist', {id: wishlistId, userId: userId}).then(res => {
            Swal.fire('Հաջողություն', "Հաջողությամբ ապրանքը ջնջված է", 'success')
        })
        .catch(err => {
            console.log('err', err)
        });
    }

    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
        dispatch({ type: "products/removeFav", payload: { id } });
    }

    return (
        <>
          {favorites.length
                                                ?
            <section id="Wishlist_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="table_desc">
                                <div className="table_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_thumb">Նկարներ</th>
                                                <th className="product_name">Ապրանքնի անունը</th>
                                                <th className="product-price">Գինը</th>
                                                <th className="product_stock">Քանակը</th>
                                                {/* <th className="product_addcart">Ավելացնել Զամբյուղ</th> */}
                                                <th className="product_remove">Ջնջել</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {favorites.map((data, index)=>(
                                                    <tr key={index}>
                                                        <td className="product_thumb">
                                                        <Link to={ `/product-details-one/${data.id}`}>
                                                                <img src={data.pictures[0].img} alt="img" />
                                                        </Link>
                                                        </td>
                                                        <td className="product_name">
                                                        <Link to={ `/product-details-one/${data.id}`}>
                                                            {data.title}
                                                        </Link>
                                                        </td>
                                                        <td className="product-price">{data.price} Դ․</td>
                                                        <td className="product_stock">{data.quantity}</td>
                                                        {/* <td className="product_addcart">
                                                            <button type="button" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(data.id)}>Ավելացնել Զամբյուղ</button>
                                                        </td> */}
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmFaveProduct(data)} style={{'cursor':'pointer'}}></i>
                                                        </td>
                                                    </tr> 
                                                ))}                                  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            : 
            <section id="empty_cart_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                            <div className="empaty_cart_area">
                                <img src={img} alt="img" />
                                <h2>Դուք չունեք նախընտրած ապրանք</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
    )
}

export default Wishlist
