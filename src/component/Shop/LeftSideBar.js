import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import ProductCard from '../Common/Product/ProductCard';
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from 'react-paginate';
import img from '../../assets/img/common/empty-cart.png';


const LeftSideBar = () => {
    let productState = useSelector((state) => state.products.products)
    const [products, setProducts] = useState(productState);
    const itemsPerPage = 8;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.filter(i => i.count > 0).slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
      }, [itemOffset, itemsPerPage, products, searchValue]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const handleSearchChange = (e) => {
        setProducts(productState.filter(i => i.title.toLowerCase().includes(e.target.value.toLowerCase())))
        setSearchValue(e.target.value);
        setItemOffset(0)
    }


    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar searchValue={searchValue} handleSearchChange={handleSearchChange} />
                        {currentItems?.length ?
                            <div className="col-lg-12">
                                <div className="row">
                                    {currentItems && currentItems.map((data, index) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                            <ProductCard data={data} />
                                        </div>
                                    ))}
                                    {products.length > 8 ?
                                        <div className="col-lg-12">
                                            <div className='pagination__container'>
                                                <ReactPaginate
                                                    breakLabel="..."
                                                    nextLabel=">"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={5}
                                                    pageCount={pageCount}
                                                    previousLabel="<"
                                                    renderOnZeroPageCount={null}
                                                />
                                            </div>
                                        </div> : <></>
                                    }
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
        </>
    )
}

export default LeftSideBar
