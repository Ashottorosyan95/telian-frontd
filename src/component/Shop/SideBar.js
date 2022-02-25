import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorData } from '../../app/data/colorData';
// Import Img
import search from '../../assets/img/svg/search.svg';


const SideBar = (props) => {
    const {searchValue, handleSearchChange} = props;
    // const [price, setPrice] = useState(100);
    // let productPrice = useSelector((state) => state.products.price)
    // let products = useSelector((state) => state.products.products);
    // let productCategories = useSelector((state) => state.products.productCategories);
    // let productSizes = useSelector((state) => state.products.productSizes);
    // let dispatch = useDispatch();
   
    // useEffect(()=>{
    //     document.querySelectorAll("input[type='radio']").forEach((input) => {
    //         input.addEventListener('change', function(){
    //             // dispatch({ type: "product/categories"})
    //             props.filterEvent(3)
    //         });
    //     });
        
    //     document.querySelector("#formControlRange").addEventListener('change', function(e){
    //         setPrice(e.target.value) ;
    //         props.filterEvent();
    //         });

    // },[props])
    
    return (
        <>
           <div className="col-lg-12">
                    <div className="shop_sidebar_wrapper">
                        <div className="shop_Search">
                            <form>
                                <input type="text" className="form-control" placeholder="Search..." value={searchValue} onChange={handleSearchChange}  />
                                <button><img src={search} alt="img" /></button>
                            </form>
                        </div>
                        {/* <div className="shop_sidebar_boxed">
                            <h4>Ապրանքի տեսակները</h4>
                            <form>
                                <label className="custom_boxed">Բոլորը
                                    <input type="radio" name="radio" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                {productCategories && productCategories.map(cat => {
                                    return (
                                        <label key={cat.id} className="custom_boxed">{cat.name}
                                            <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                    )
                                })}
                            </form>
                        </div> */}
                        {/* <div className="shop_sidebar_boxed">
                            <h4>Գինը</h4>
                            <div className="price_filter">
                               <input type="range" min="50" max="100000" defaultValue={price} className="form-control-range" id="formControlRange" />
                                <div className="price_slider_amount mt-2">
                                    <span>Գինը : {price} դ</span>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="shop_sidebar_boxed">
                            <h4>Չափսը</h4>
                            <form>
                                {productSizes && productSizes.map(siz => {
                                    return (
                                        <label key={siz.id} className="custom_boxed">{siz.name}
                                            <input type="radio" name="radio" />
                                            <span className="checkmark"></span>
                                        </label>
                                    )
                                })}
                            </form>
                        </div> */}
                        {/* <div className="shop_sidebar_boxed">
                            <h4>Գույնը</h4>
                            <div className="product-variable-color">
                                <label htmlFor="modal-product-color-red6">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-red6" 
                                        className="color-select"
                                        type="radio" 
                                    />
                                    <span className="product-color-black"></span>
                                </label>
                                <label htmlFor="modal-product-color-red6">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-red6" 
                                        className="color-select"
                                        type="radio" 
                                    />
                                    <span className="product-color-red"></span>
                                </label>
                                <label htmlFor="modal-product-color-tomato1">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-tomato1"
                                        className="color-select" 
                                        type="radio" 
                                    />
                                    <span className="product-color-tomato"></span>
                                </label>
                                <label htmlFor="modal-product-color-green2">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-green2"
                                        className="color-select" 
                                        type="radio" defaultChecked 
                                    />
                                    <span className="product-color-green"></span>
                                </label>
                                <label htmlFor="modal-product-color-light-green3">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-light-green3"
                                        className="color-select" 
                                        type="radio" 
                                    />
                                    <span className="product-color-light-green"></span>
                                </label>
                                <label htmlFor="modal-product-color-blue4">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-blue4" 
                                        className="color-select"
                                        type="radio" 
                                    />
                                    <span className="product-color-blue"></span>
                                </label>
                                <label htmlFor="modal-product-color-light-blue5">
                                    <input 
                                        name="modal-product-color" 
                                        id="modal-product-color-light-blue5"
                                        className="color-select" 
                                        type="radio" 
                                    />
                                    <span className="product-color-light-blue"></span>
                                </label>
                            </div>
                        </div> */}
                        <div className="shop_sidebar_boxed">
                            {/* <h4>Brand</h4> */}
                            <form>
                                {/* <label className="custom_boxed">Next
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="custom_boxed">Adidas
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="custom_boxed">Calvin Klein
                                    <input type="radio" name="radio" defaultChecked/>
                                    <span className="checkmark"></span>
                                </label>
                                <label className="custom_boxed">Nike
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="custom_boxed">Geox
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="custom_boxed">River Island
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                </label> */}
                                {/* <div className="clear_button">
                                    <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={() => {props.filterEvent()}}>Հանել ֆիլտրացիան</button>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div> 
        </>
    )
}

export default SideBar
