import React, { useState } from 'react'
import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
// import { RatingStar } from "rating-star";

const ProductDetailsOne = () => {
    let product = useSelector((state) => state.products.single);
    let user = useSelector((state) => state.user.user);
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);
    let dispatch = useDispatch();
    let { id } = useParams();
    const [count, setCount] = useState(1);
    const [selectedImgIndex, setSelectedImgIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    
    
    const handleProductSizeChange = (selected) => {
        setSelectedSize(+selected);
    };
    dispatch({ type: "products/getProductById", payload: { id } });

    // Add to cart
    const addToCart = async (product) => {
        if(selectedSize || product.rate === "bags") {
            let id = product.id;
            dispatch({ type: "products/addToCart", payload: { id, count, selectedSize } })
            if (user.role && user.role === "customer") {
                let item = carts.find(i => i.id === parseInt(id));
                if (item === undefined) {
                    let data = { 
                        img: product.pictures[0].img,
                        title: product.title,
                        price: product.sale_price || product.price,
                        size: selectedSize,
                        quantity: count,
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
                        .catch(e => {
                            console.log(e)
                        })
                }
            }
            Swal.fire({
                title: 'Հաջողվեց!',
                text: 'Հաջողությամբ ավելացվել է ձեր զամբյուղում',
                icon: 'success',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            if(product.rate !== "bags") {
                Swal.fire({
                    title: 'Ձախողվեց!',
                    text: 'Խնդրում ենք ընտրել չափսը',
                    icon: 'warning',
                    showConfirmButton: false,
                })
            } 
        }
    }

    // Add to Favorite
    const addToFav = async (product) => {
        let id = product.id;
        dispatch({ type: "products/addToFav", payload: { id } })
        if (user.role && user.role === "customer") {
            let item = favorites.find(i => i.id === parseInt(id))
            if (item === undefined) {
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
                    .catch(e => {
                        console.log(e)
                    })
            }
        }
    }
    // Add to Compare
    // const addToComp = async (id) => {
    //     dispatch({ type: "products/addToComp", payload: { id } })
    // }

    

    // const colorSwatch = (i) => {
    //     let data = product.color.find(item => item.color === i)
    //     setImg(data.img)
    // }

    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        setCount(count - 1)
    }
    return (
        <>{product
            ?
            <section id="product_single_one" className="ptb-100">
                <div className="container">
                    <div className="row area_boxed">
                        <div className="col-lg-4">
                            <div className="product_single_one_img">
                                <img src={product.pictures[selectedImgIndex].img} alt="img" />
                            </div>
                            <div className='other-product-images'>
                                {product.pictures.length > 1 && product.pictures.map((picture, index) => {
                                    return (
                                        <img className={index === selectedImgIndex ? 'active' : ''} onClick={() => setSelectedImgIndex(index)} src={picture.img} alt="img" />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.title}</h3>
                                    {/* <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={product.rating.rate} id="rating-star-common" />
                                        <span>{product.rating.count}</span>
                                    </div> */}
                                    <h4>{(product.sale_price || product.price)} Դ․ {product.sale_price ? <del>{parseInt(product.price)} Դ․</del> : <></>}</h4>
                                    <p>{product.description}</p>
                                    {product.rate !== 'bags' ?
                                        <div className="variable-single-item">
                                            <span>Առկա Չափսերը</span>
                                            <form>
                                            <label >
                                                {
                                                    product.sizes.map((elem, i) => {
                                                        return (
                                                            <>
                                                                <input 
                                                                    type="radio"
                                                                    name='size'
                                                                    onChange={() => handleProductSizeChange(elem.name)}
                                                                />
                                                                <span> {elem.name} </span>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </label>
                                            </form>
                                        </div> : <></>
                                    }
                                    <p>Քանակը պահեստում` {product.count}</p>
                                    <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                {count > 1 ?
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={decNum}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div> : <></>
                                                }
                                                <input className="form-control" type="number" value={count} readOnly />
                                                {product.count >= count + 1 ?
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={incNum}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div> : <></>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                    <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product)}>
                                                    <i className="fa fa-heart"></i>Ավելացնել հավանածների ցանկում</a>
                                                {/* <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product)}><AiOutlineHeart />Ավելացնել հավանածների ցանկում</a> */}
                                            </li>
                                            {/* <li>
                                                <a href="#!" className="action compare" onClick={() => addToComp(product.id)} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li> */}
                                        </ul>
                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product)}>Ավելացնել Զամբյուղ</a>
                                    </div>
                                    {/* <div className="variable-single-item">
                                        <span>Գույնը</span>
                                        <div className="product-variable-color">
                                            <label htmlFor="modal-product-color-red1">
                                                <input name="modal-product-color" id="modal-product-color-red1"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('red') }} defaultChecked />
                                                <span className="product-color-red"></span>
                                            </label>
                                            <label htmlFor="modal-product-color-green3">
                                                <input name="modal-product-color" id="modal-product-color-green3"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('green') }} />
                                                <span className="product-color-green"></span>
                                            </label>
                                            <label htmlFor="modal-product-color-blue5">
                                                <input name="modal-product-color" id="modal-product-color-blue5"
                                                    className="color-select" type="radio" onChange={() => { colorSwatch('blue') }} />
                                                <span className="product-color-blue"></span>
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductInfo />
                </div>
            </section>
            :
            <div className="container ptb-100">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            {/* <img src={img} alt="img" /> */}
                            <h2>PRODUCT NOT FOUND</h2>
                            <h3>Sorry Mate... No Item Found according to Your query!</h3>
                            <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        
            <RelatedProduct id={product?.id} type={product?.rate} />
        </>
    )
}

export default ProductDetailsOne