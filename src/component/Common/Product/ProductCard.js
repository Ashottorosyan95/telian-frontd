import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';
import axios from 'axios';
import Swal from "sweetalert2";

const ProductCard = (props) => {
    let dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);
    const [selectedSizes, setSelectedSizes] = useState(null)
    
    const handleProductSizeChange = (selected) => {
        setSelectedSizes(+selected);
        console.log(selectedSizes)
      }
    
    // Add to cart
    const addToCart = async (product) => {
        let id = product.id;
        dispatch({ type: "products/addToCart", payload: { id } })
        if(user.role && user.role === "customer") {
            let item = carts.find(i => i.id === parseInt(id));
            if(item === undefined) {
                let data = {
                    img: product.pictures[0].img,
                    title: product.title,
                    price: product.sale_price,
                    size: selectedSizes,
                    quantity: 1,
                    userId: user.id,
                    productId: id,
                }
                axios.post(process.env.REACT_APP_BACKEND_URL + "/cart-user", data)
                .then(res => {
                    Swal.fire({
                        title: 'Հաջողվեց!',
                        text: 'Հաջողությամբ ավելացվել է ձեր զամբյուղում',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2500
                    })
                })
                .catch( e => {
                    console.log(e)
                })
            }
        }
    }
    // Add to Favorite
    const addToFav = async (product) => {
        let id = product.id;
        dispatch({ type: "products/addToFav", payload: { id } });
        if(user.role && user.role === "customer") {
            let item = favorites.find(i => i.id === parseInt(id))
            if(item === undefined) {
                let data = {
                    img: product.pictures[0].img,
                    title: product.title,
                    price: product.price,
                    userId: user.id,
                    productId: id,
                }
                axios.post(process.env.REACT_APP_BACKEND_URL + "/wish-list", data)
                .then(res => {
                    Swal.fire('Հաջողություն', "Ավելացվեց ցանկությունների ցանկում", 'success')
                })
                .catch( e => {
                    console.log(e)
                })
            }
        }
    }
    // Add to Compare
    // const addToComp = async (id) => {
    //     dispatch({ type: "products/addToComp", payload: { id } })
    // }
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/product-details-one/${props.data.id}`} className="image">
                        <img src={props.data.pictures[0].img} alt="Product" />
                        {props.data.pictures[1] &&
                            <img className="hover-image" src={props.data.pictures[1].img} alt="Product" />
                        }
                    </Link>
                    {/* <span className="badges">
                        <span className={(['hot','new','sale'][Math.round(Math.random()*2)])}>{props.data.labels}</span>
                    </span> */}
                    <div className="actions">
                        <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(props.data)}><AiOutlineHeart /></a>
                        {/* <a href="#!" className="action quickview" title="Quick view" onClick={() => setModalShow(true)}><AiOutlineExpand /></a> */}
                        {/* <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(props.data.id)}><FaExchangeAlt /></a> */}
                    </div>
                    {/* <button type="button" className="add-to-cart offcanvas-toggle" onClick={() => addToCart(props.data)}>Ավելացնել Զամբյուղ</button> */}
                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data.id}`}>{props.data.title}</Link>
                    </h5>
                    <span className="price">
                        <span className="new"><span className={props.data.sale_price ? 'saled_price' : '' }>{(props.data.sale_price || props.data.price)}</span> Դ․ {props.data.sale_price ? <del>{parseInt(props.data.price)} Դ․</del> : <></>}</span>
                    </span>
                </div>
            </div>

            <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default ProductCard