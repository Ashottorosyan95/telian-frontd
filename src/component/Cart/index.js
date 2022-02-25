import React from "react";
import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link } from 'react-router-dom'
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Swal from "sweetalert2";

const CartArea = () => {
    let dispatch = useDispatch();
    let carts = useSelector((state) => state.products.carts);
    let user = useSelector((state) => state.user.user);
    // Remove from Cart
    const rmProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }
    // Clear
    const clearCarts = () => {
        dispatch({ type: "products/clearCart" });
        if (user.role && user.role === "customer") {
            axios.post(process.env.REACT_APP_BACKEND_URL + '/clear-cart', {userId: user.id}).then(res => {
                Swal.fire('Հաջողություն', "Հաջողությամբ քարտը մաքրված է", 'success');
            })
            .catch(err => {
                console.log('err', err)
            });
        }
    }
    // Value Update
    const cartValUpdate = (val, id) => {
        dispatch({ type: "products/updateCart", payload: { val, id } });
    }

    return (
        <>
            {carts.length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_thumb">Նկարը</th>
                                                    <th className="product_name">Ապրանքը</th>
                                                    <th className="product-price">Գինը</th>
                                                    <th className="product_quantity">Քանակը</th>
                                                    <th className="product_quantity">Չափսը</th>
                                                    <th className="product_total">Ընդհանուր Գումարը</th>
                                                    <th className="product_remove">Ջնջել</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carts.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_thumb">
                                                            <Link to={`/product-details-one/${data.id}`}>
                                                                <img src={data.pictures[0].img} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.id}`}>
                                                                {data.title}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">{(data.sale_price || data.price)}</td>
                                                        <td className="product_quantity">
                                                            {data.quantity || 1}
                                                            {/* <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.currentTarget.value, data.id)} defaultValue={data.quantity || 1} /> */}
                                                        </td>
                                                        <td className="product_total">{data.size}</td>
                                                        <td className="product_total">{(data.sale_price || data.price) * (data.quantity || 1)} Դ․</td>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{ 'cursor': 'pointer' }}></i>
                                                        </td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart_submit">
                                        {carts.length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearCarts()}>Մաքրել քարտը</button>
                                            : null
                                        }

                                    </div>
                                </div>
                            </div>
                            {/* <Coupon /> */}
                            <TotalCart />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={img} alt="img" />
                                    <h2>ՔԱՐՏԸ ԴԱՏԱՐԿ Է</h2>
                                    <h3>Ոչ մի ապրանք չի գտնվել ձեր զամբյուղում:</h3>
                                    <Link to="/shop" className="btn btn-black-overlay btn_sm">Շարունակել գնումները</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CartArea