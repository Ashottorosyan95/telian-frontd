import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
const AllProductSize = () => {
    const [sizes, setProductSizes] = useState([]);
    const [page, setPage] = useState(1);
    let allData = [...useSelector((state) => state.products.products)];

    useEffect(() => {
      axios.get(process.env.REACT_APP_BACKEND_URL + '/product-size').then(res => {
        if(res.status === 200) {
          setProductSizes(res.data.sizes)
        }
      })
      .catch(err => {
        console.log('err', err)
      });
      }, []);

      const deleteProductSizes = (id) => {
        axios.post(process.env.REACT_APP_BACKEND_URL + '/delete-product-sizes', {id: id}).then(res => {
          if(res.status === 200) {
            setProductSizes(res.data.sizes)
          }
        })
        .catch(err => {
          console.log('err', err)
        });
      }


    // const randCategory = (page) => {
    //     if(page){
    //         let data = allData.sort((a, b) => 0.5 - Math.random())
    //         data = data.slice(0,6);
    //         setProductSizes(data);
    //         setPage(page);
    //     }
    // }

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="vendor_order_boxed">
                       <div className="mb-2">
                       <h4>Բոլոր կատեգորիաները</h4>
                       {/* <Link to="/vendor/add-products" data-toggle="tab" className="theme-btn-one bg-black btn_sm add_prod_button">Ավելացնել նոր ապրանք</Link> */}
                       </div>
                        <div className="table-responsive">
                            <table className="table pending_table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Կատեգորիայի անունը</th>
                                        <th scope="col">Ջնջել</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizes.slice(0,100).map((data, index)=>(
                                        <tr key={index}>
                                            <td>{data.name}</td>
                                            <td><button style={{background:"Transparent"}} onClick={() => deleteProductSizes(data.id)} ><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        {/* <div className="col-lg-12">
                        <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randCategory(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item "+ (page === 1?"active":null)} onClick={(e) => { randCategory(1) }}><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item "+ (page === 2?"active":null)}  onClick={(e) => { randCategory(2) }}><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item "+ (page === 3?"active":null)}  onClick={(e) => { randCategory(3) }}><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" onClick={(e) => { randCategory(page <3?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProductSize
