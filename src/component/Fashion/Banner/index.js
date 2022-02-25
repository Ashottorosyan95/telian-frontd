import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      };

    return (
        <>
        <div className='slider-container'>
            <Slider {...settings}>
                    <div className='slider-item'>
                         <section id="banner_one">
                            <div></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="banner_text_one">
                                            <h1 className="wow flipInX" data-wow-duration="3.0s" data-wow-delay=".3s" style={{color:'#fff'}}>Teliani <span className="wow flipInX" data-wow-duration="2.0s" data-wow-delay=".5s">Collection</span></h1>
                                            <Link to="/shop" className="theme-btn-one bg-black btn_md">Տեսնել ավելին</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='slider-item'>
                        <section id="banner_two">
                            <div></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="banner_text_one">
                                            <h1 className="wow flipInX" data-wow-duration="3.0s" data-wow-delay=".3s" style={{color:'#fff'}}>Teliani <span className="wow flipInX" data-wow-duration="2.0s" data-wow-delay=".5s">Collection</span></h1>
                                            <Link to="/shop" className="theme-btn-one bg-black btn_md">Տեսնել ավելին</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='slider-item'>
                        <section id="banner_three">
                            <div></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="banner_text_one">
                                            <h1 className="wow flipInX" data-wow-duration="3.0s" data-wow-delay=".3s" style={{color:'#fff'}}>Teliani <span className="wow flipInX" data-wow-duration="2.0s" data-wow-delay=".5s">Collection</span></h1>
                                            <Link to="/shop" className="theme-btn-one bg-black btn_md">Տեսնել ավելին</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            </Slider>
        </div>
            
        </>
   
    )
}

export default Banner
