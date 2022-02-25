import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import logoWhite from '../../../assets/img/logo-white.png';
import { MenuData } from './MenuData';
import NaveItems from './NaveItems';
import TopHeader from './TopHeader';
import { useHistory } from "react-router-dom";
import svg from '../../../assets/img/svg/cancel.svg';
import svgsearch from '../../../assets/img/svg/search.svg';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

const Header = () => {
    
    const [click, setClick] = useState(false);
    const [show, setShow] = useState();
    const history = useHistory();
    let user = useSelector((state) => state.user.user);
    let carts = useSelector((state) => state.products.carts);
    let favorites = useSelector((state) => state.products.favorites);
    let dispatch = useDispatch();

    const rmCartProduct = (cart) => {
        let id = cart.id;
        let cartId = cart.cartId;
        let userId = user.id;
        dispatch({ type: "products/removeCart", payload: { id } });
        axios.post(process.env.REACT_APP_BACKEND_URL + '/delete-cart', {id: cartId, userId: userId}).then(res => {
            Swal.fire('Հաջողություն', "Հաջողությամբ ապրանքը ջնջված է", 'success')
        })
        .catch(err => {
            console.log('err', err)
        });
    }

    const rmFavProduct = (favorites) => {
        let id = favorites.id;
        let wishlistId = favorites.wishlistId;
        let userId = user.id;
        dispatch({ type: "products/removeFav", payload: { id } });
        axios.post(process.env.REACT_APP_BACKEND_URL + '/delete-wishlist', {id: wishlistId, userId: userId}).then(res => {
            Swal.fire('Հաջողություն', "Հաջողությամբ ապրանքը հեռացվել է հավանածների ցանկից", 'success')
        })
        .catch(err => {
            console.log('err', err)
        });
    }

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * (item.sale_price || item.price))
        }, 0)
    }

    const handleClick = () => {
        if (click) {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handleWish = () => {
        if (click) {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-wishlish").style = ("transform: translateX(0);")
        }
        setClick(!click);
    }

    const handleSearch = () => {
        if (click) {
            document.querySelector("#search").style = ("transform: translate(-100%, 0); opacity: 0")
        } else {
            document.querySelector("#search").style = ("transform: translate(0px, 0px); opacity: 1")
        }
        setClick(!click);
    }
    const handleabout = () => {
        if (click) {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#offcanvas-about").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }
    const handlemenu = () => {
        if (click) {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(100%);")
        } else {
            document.querySelector("#mobile-menu-offcanvas").style = ("transform: translateX(0%);")
        }
        setClick(!click);
    }

    const handleShow = (value) => {
        value === show ? setShow("") : setShow(value)
    }

    // Sticky Menu Area
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('is-sticky') : header?.classList.remove('is-sticky');
    };

    return (
        <>
            <TopHeader />
            <header className="header-section d-none d-xl-block">
                <div className="header-wrapper">
                    <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between">
                                    <div className="header-logo">
                                        <div className="logo">
                                            <Link to="/"><img src={logo} alt="logo" /></Link>
                                        </div>
                                    </div>
                                    <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                                        <nav>
                                            <ul>
                                                {MenuData.map((item, index) => (
                                                    <NaveItems item={item} key={index} />
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>

                                    <ul className="header-action-link action-color--black action-hover-color--golden">
                                        <li>
                                            {favorites.length
                                                ? <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                                : <a href="#offcanvas-wishlish" className="offcanvas-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                            }
                                        </li>
                                        <li>
                                            {carts.length
                                                ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                                : <a href="#!" className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                            }
                                        </li>
                                        {/* <li>
                                            <a href="#search" className="search_width" onClick={handleSearch} >
                                                <img src={svgsearch} alt="img" />
                                            </a>
                                        </li> */}
                                        <li>
                                            <a href="#offcanvas-about" className="offacnvas offside-about offcanvas-toggle" onClick={handleabout}>
                                                <i className="fa fa-bars"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mobile-header sticky-header sticky-color--golden mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">

                            <div className="mobile-header-left">
                                <ul className="mobile-menu-logo">
                                    <li>
                                        <a href="/">
                                            <div className="logo">
                                                <img src={logo} alt="logo" />
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mobile-right-side">
                                <ul className="header-action-link action-color--black action-hover-color--golden">
                                    {/* <li>
                                        <a href="#!" className="search_width" onClick={handleSearch}>
                                            <img src={svgsearch} alt="img" />
                                        </a>
                                    </li> */}
                                    <li>
                                        {favorites.length
                                            ? <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                            : <a href="#offcanvas-wishlish" className="offcanvas-toggle"><i className="fa fa-heart"></i><span className="item-count">{favorites.length}</span></a>
                                        }
                                    </li>
                                    <li>
                                        {carts.length
                                            ? <a href="#!" className="offcanvas-toggle" onClick={handleClick}><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                            : <a href="#!" className="offcanvas-toggle"><i className="fa fa-shopping-bag"></i><span className="item-count">{carts.length}</span></a>
                                        }
                                    </li>
                                    <li>
                                        <a href="#!" className="offcanvas-toggle offside-menu" onClick={handlemenu}>
                                            <i className="fa fa-bars"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="mobile-menu-offcanvas" className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">

                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handlemenu}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-mobile-menu-wrapper">
                    <div className="mobile-menu-bottom">
                        <div className="offcanvas-menu">
                            <ul>
                                <li>
                                    <a href="/" onClick={() => handleShow("home")}><span>Գլխավոր</span></a>
                                    {/* {
                                        show === "home" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/">Fashion</Link></li>
                                                <li><Link to="/furniture">Furniture</Link></li>
                                                <li><Link to="/electronics">Electronics</Link></li>
                                            </ul> : null
                                    } */}

                                </li>
                                <li>
                                    <a href="/about" onClick={() => handleShow("about")}><span>Մեր մասին</span></a>
                                </li>
                                <li>
                                    <a href="/bags" onClick={() => handleShow("shop")}><span>Պայուսակներ</span></a>
                                    {/* {
                                        show === "shop" ? <>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Layout</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/shop-left-bar">Shop Left Sidebar</Link></li>
                                                        <li><Link to="/shop">Shop Four Grid</Link></li>
                                                        <li><Link to="/shopTwo">Shop Three Grid</Link></li>
                                                        <li><Link to="/shoplist">Shop List View</Link></li>
                                                        <li><Link to="/shop-right-bar">Shop Right Sidebar</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Shop Pages</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/cart">Cart View One</Link></li>
                                                        <li><Link to="/cartTwo">Cart View Two </Link></li>
                                                        <li><Link to="/empty-cart">Empty Cart</Link></li>
                                                        <li><Link to="/checkout-one">Checkout View One</Link></li>
                                                        <li><Link to="/checkout-two">Checkout View Two</Link></li>
                                                        <li><Link to="/wishlist">Wishlist</Link></li>
                                                        <li><Link to="/compare">Compare</Link></li>
                                                        <li><Link to="/order-tracking">Order Tracking</Link></li>
                                                        <li><Link to="/order-complete">Order Complete</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="mobile-sub-menu">
                                                <li>
                                                    <a href="#!">Product Single</a>
                                                    <ul className="mobile-sub-menu">
                                                        <li><Link to="/product-details-one/1">Product Single</Link></li>
                                                        <li><Link to="/product-details-two/1">Product Single Two</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </> : null
                                    } */}

                                </li>
                                <li>
                                    <a href="/accessories" onClick={() => handleShow("shop")}><span>Աքսեսուարներ</span></a>
                                </li>
                                <li>
                                    <a href="/women" onClick={() => handleShow("feature")}><span>Կանացի</span></a>
                                    <ul className="mobile-sub-menu">
                                        {/* <li><Link to="/women-belts">Գոտիներ</Link></li> */}
                                        {/* <li><Link to="/women-bootss">Բոթասներ</Link></li> */}
                                        <li><Link to="/women-shoes">Կոշիկներ</Link></li>
                                    </ul>
                                    {/* {
                                        show === "feature" ?

                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/product-hover">Product Hover</Link></li>
                                                <li><Link to="/order-success">Order Success</Link></li>
                                                <li><Link to="/email-template-one">Email Template 1</Link></li>
                                                <li><Link to="/email-template-two">Email Template 2</Link></li>
                                                <li><Link to="/email-template-three">Email Template 3</Link></li>.
                                                <li><Link to="/lookbooks">LookBook</Link></li>
                                                <li><Link to="/invoice-one">Invoice 1</Link></li>
                                                <li><Link to="/invoice-two">Invoice 2</Link></li>
                                            </ul>

                                            : null
                                    } */}
                                </li>
                                <li>
                                    <a href="/men" onClick={() => handleShow("blogs")}><span>Տղամարդու</span></a>
                                    <ul className="mobile-sub-menu">
                                        {/* <li><Link to="/men-belts">Գոտիներ</Link></li> */}
                                        {/* <li><Link to="/men-bootss">Բոթասներ</Link></li> */}
                                        <li><Link to="/men-shoes">Կոշիկներ</Link></li>
                                    </ul>
                                    {/* {
                                        show === "blogs" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/blog-grid-three">Blog Grid View One</Link></li>
                                                <li><Link to="/blog-grid-two">Blog Grid View Two</Link></li>
                                                <li><Link to="/blog-list-view">Blog List View</Link></li>
                                                <li><Link to="/blog-single-one">Blog Single View One </Link></li>
                                                <li><Link to="/blog-single-two">Blog Single View TWo</Link></li>
                                            </ul>
                                            : null
                                    } */}

                                </li>
                                <li>
                                    <a href="/contact" onClick={() => handleShow("pages")}><span>Կապ</span></a>

                                    {/* {
                                        show === "pages" ?
                                            <ul className="mobile-sub-menu">
                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/vendor-dashboard">Vendor</Link></li>
                                                <li><Link to="/my-account">My Account</Link></li>
                                                <li><Link to="/contact-one">Contact Us One</Link></li>
                                                <li><Link to="/contact-two">Contact Us Two</Link></li>
                                                <li><Link to="/coming-soon">Coming Soon</Link></li>
                                                <li><Link to="/faqs">Frequently Questions</Link></li>
                                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                                <li><Link to="/error">404 Page</Link></li>
                                                <li><Link to="/login">Login</Link></li>
                                            </ul>
                                            : null
                                    } */}
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="mobile-contact-info">
                        <div className="logo">
                            <Link to="/"><img src={logo} alt="img" /></Link>
                        </div>
                        <address className="address">
                            <span>Հասցե: Կ. Ուլնեցի 59/5, կրպակ 14</span>
                            <span>Հեռ․: +374 96 96 38 07</span>
                            <span>info@telianicollection.am</span>
                        </address>
                        <ul className="social-link">
                            {/* <li>
                                <a href="#!"><i className="fa fa-facebook"></i></a>
                            </li> */}
                            <li>
                                <a href="https://instagram.com/teliani_collection?utm_medium=copy_link" target="_blank"><i className="fa fa-instagram"></i></a>
                            </li>
                            {/* <li>
                                <a href="#!"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#!"><i className="fa fa-linkedin"></i></a>
                            </li> */}
                        </ul>

                        <ul className="user-link">
                            <li><Link to="/wishlist">Իմ հավանածները</Link></li>
                            <li><Link to="/cart">Քարտ</Link></li>
                            <li><Link to="/checkout">Պատվերի ձևակերպում</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
            <div id="offcanvas-about" className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleabout}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="mobile-contact-info">
                    <address className="address">
                        <img src={logo} alt="logo" />
                        <span>Հասցե: Կ. Ուլնեցի 59/5, կրպակ 14</span>
                        <span>Հեռ․: +374 96 96 38 07</span>
                        <span>Էլ․ հասցե: info@telianicollection.am</span>
                    </address>
                    <ul className="social-link">
                        {/* <li>
                            <a href="#!"><i className="fa fa-facebook"></i></a>
                        </li> */}
                        <li>
                            <a href="https://instagram.com/teliani_collection?utm_medium=copy_link" target="_blank"><i className="fa fa-instagram"></i></a>
                        </li>
                        {/* <li>
                            <a href="#!"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="#!"><i className="fa fa-linkedin"></i></a>
                        </li> */}
                    </ul>
                    <ul className="user-link">
                        <li><Link to="/wishlist">Իմ հավանածները</Link></li>
                        <li><Link to="/cart">Քարտ</Link></li>
                        <li><Link to="/checkout">Պատվերի ձևակերպում</Link></li>
                    </ul>
                </div>
            </div>

            <div id="offcanvas-add-cart" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleClick}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-add-cart-wrapper">
                    <h4 className="offcanvas-title">Քարտ</h4>
                    <ul className="offcanvas-cart">
                        {carts.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.pictures[0].img} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            <span className="offcanvas-wishlist-item-details-quantity">{data.quantity || 1} x
                                            </span>
                                            <span className="offcanvas-wishlist-item-details-price"> {(data.sale_price || data.price)} Դ․</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete" onClick={() => rmCartProduct(data)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="offcanvas-cart-total-price">
                        <span className="offcanvas-cart-total-price-text">Ընդ․ գինը:</span>
                        <span className="offcanvas-cart-total-price-value">{cartTotal()} Դ․</span>
                    </div>
                    <ul className="offcanvas-cart-action-button">
                        <li>
                            <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md">Դիտել Զամբյուղը</Link>
                        </li>
                        <li>
                            <Link to="/checkout" className="theme-btn-one btn-black-overlay btn_md">Պատվերի ձևակերպում</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
                <div className="offcanvas-header text-right">
                    <button className="offcanvas-close" onClick={handleWish}>
                        <img src={svg} alt="icon" />
                    </button>
                </div>
                <div className="offcanvas-wishlist-wrapper">
                    <h4 className="offcanvas-title">Իմ հավանածները</h4>

                    <ul className="offcanvas-wishlist">
                        {favorites.map((data, index) => (
                            <li className="offcanvas-wishlist-item-single" key={index}>
                                <div className="offcanvas-wishlist-item-block">
                                    <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-image-link" >
                                        <img src={data.pictures[0].img} alt="img"
                                            className="offcanvas-wishlist-image" />
                                    </Link>
                                    <div className="offcanvas-wishlist-item-content">
                                        <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-link">{data.title}</Link>
                                        <div className="offcanvas-wishlist-item-details">
                                            {/* <span className="offcanvas-wishlist-item-details-quantity">1 x
                                            </span> */}
                                            <span className="offcanvas-wishlist-item-details-price">{data.price} Դ․</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas-wishlist-item-delete text-right">
                                    <a href="#!" className="offcanvas-wishlist-item-delete" onClick={() => rmFavProduct(data)}><i className="fa fa-trash"></i></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul className="offcanvas-wishlist-action-button">
                        <li>
                            <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">Դիտել հավանածները</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="search" className="search-modal">
                <button type="button" className="close" onClick={handleSearch}><img src={svg} alt="icon" /></button>
                <form onSubmit={(e)=> {e.preventDefault(); handleSearch(); Swal.fire('Success', 'Check out the Results', 'success'); history.push('/shop')}}>
                    <input type="search" placeholder="Ապրանքների որոնում"  required />
                    <button type="submit" className="btn btn-lg btn-main-search">Փնտրել</button>
                </form>
            </div>
        </>
    )
}

export default Header