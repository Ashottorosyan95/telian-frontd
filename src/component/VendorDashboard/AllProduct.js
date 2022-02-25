import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const AllProduct = () => {
    let dispatch = useDispatch();
    let products = useSelector((state) => state.products.products);
    const itemsPerPage = 6;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
      
      }, [products, itemOffset, itemsPerPage]);

      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
      };

      const delete_product = (id) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + '/deleteProduct', {id: id}).then(res => {
            if(res.status === 200) {
                dispatch({ type: "products/getProducts", products: res.data.products });
            }
        })
        .catch(err => {
          console.log('err', err)
        });
      }

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed">
                       <div className="mb-2">
                       <h4>Բոլոր ապրանքները ({products.length})</h4>
                       <Link to="/vendor/add-products" data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button">Ավելացնել նոր ապրանք</Link>
                       </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Նկար</th>
                                        <th scope="col">Ապրանքի անունը</th>
                                        <th scope="col">Տարբերակ</th>
                                        <th scope="col">Չափսը</th>
                                        <th scope="col">Գինը</th>
                                        <th scope="col">Զեղչված գին</th>
                                        <th scope="col">Քանակը պահեստում</th>
                                        <th scope="col">Ջնջել</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems && currentItems.map((data, index)=>(
                                        <tr key={index}>
                                            <td><img width="70px" src={data.pictures[0].img} alt="img" /></td>
                                            <td>{data.title}</td>
                                            <td>{data.rate}</td>
                                            <td>{data.sizes.map(siz => {
                                                return (
                                                    <div key={siz.id}>{siz.name}</div>
                                                )
                                            })}</td>
                                            <td>{data.price}Դ․</td>
                                            <td>{data.sale_price}Դ․</td>
                                            <td>{parseInt(data.count)}</td>
                                            <td><button style={{background:"Transparent"}} onClick={() => delete_product(data.id)}><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        {products.length > 6 ?
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
                </div>
            </div>
        </>
    )
}

export default AllProduct