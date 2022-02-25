import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';

const AllOrder = () => {
    let dispatch = useDispatch();
    let orders = useSelector((state) => state.user.allOrders);
    const itemsPerPage = 2;
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [orders, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
      };

    const handleClick = (id, status, userId) => {
        if(status !== 'done') {
            const newStatus = status === 'pending' ? 'approved' : 'done';
            axios.post(process.env.REACT_APP_BACKEND_URL + `/update-status`, {id, newStatus, userId}).then(res => {
                if(res.status === 200) {
                    let orders = res.data.orders;
                    let products = res.data.products;
                    for(let i = 0; i < orders.length; i++) {
                        orders[i].products = [];
                        for(let j = 0; j < products.length; j++) {
                            if(products[j].orderId === orders[i].id) {
                                orders[i].products.push(products[j]);
                            }
                        }
                    }
                    dispatch({ type: "user/getAllOrders", payload: {orders} });
                }
            })
            .catch(err => {
              console.log('err', err)
            });
        } else {
            axios.post(process.env.REACT_APP_BACKEND_URL + `/delete-order`, {id, userId}).then(res => {
                if(res.status === 200) {
                    let orders = res.data.orders;
                    let products = res.data.products;
                    for(let i = 0; i < orders.length; i++) {
                        orders[i].products = [];
                        for(let j = 0; j < products.length; j++) {
                            if(products[j].orderId === orders[i].id) {
                                orders[i].products.push(products[j]);
                            }
                        }
                    }
                    dispatch({ type: "user/getAllOrders", payload: {orders} });
                }
            })
            .catch(err => {
              console.log('err', err)
            });
        }
    }


    return (
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed">
                        <h4>Բոլոր պատվերները ({orders.length})</h4>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Պատվեր #</th>
                                        <th scope="col">Ապրանքի անունը</th>
                                        <th>Ընդհանուր արժեքը</th>
                                        <th scope="col">Կարգավիճակը</th>
                                        <th scope="col">Ապրանքագիր</th>
                                        <th scope="col">Գործողություն</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems && currentItems.map((data, index) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>
                                                {data.products.map((p, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <span>{p.title}</span>
                                                            <br/>
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td>{data.cartTotal}</td>
                                            <td>
                                                <span className={`badge ${data.status === 'pending' ? 'badge-warning' : data.status === 'approved' ? 'badge-info' : 'badge-success'}`}>
                                                    {data.status === 'pending' ? 'Ընթացքի մեջ' : data.status === 'approved' ? 'Հաստատված' : 'Ստացած'}
                                                </span>
                                            </td>
                                            <td><Link to={{pathname: `/invoice-one`, query: {data}}} className="text-primary">Տեսնել ավելին</Link></td>
                                            <td><button onClick={() => handleClick(data.id, data.status, data.userId)} className={`btn ${data.status === 'pending' ? 'btn-warning' : data.status === 'approved' ? 'btn-success' : 'btn-danger'}`}>{data.status === 'pending' ? 'Հաստատել' : data.status === 'approved' ? 'Ավարտել' : 'Ջնջել'}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                        </div>
                        {/* <div className="col-lg-12">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a href="#!" className="page-link">
                                        <span aria-hidden="true">«</span>
                                    </a>
                                </li>
                                <li className="page-item active"><a href="#!" className="page-link">1</a></li>
                                <li className="page-item"><a href="#!" className="page-link">2</a></li>
                                <li className="page-item"><a href="#!" className="page-link">3</a></li>
                                <li className="page-item">
                                    <a href="#!" className="page-link">
                                        <span aria-hidden="true">»</span>
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default AllOrder
