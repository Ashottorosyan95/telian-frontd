import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import img1 from '../../assets/img/invoice/invoice.svg'
import logo from '../../assets/img/logo.png'
import sign from '../../assets/img/invoice/sign.png'
import axios from 'axios';
import Cookies from 'js-cookie';

const InvoiceOnes = (props) => {
  const history = useHistory();
  const location = useLocation();
  const order = location.query.data;
  const routeChange = () => {
    history.goBack()
  };

    return (
        <>
      <section className="theme-invoice-1 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 m-auto">
            <div className="back_btn_emial">
                            <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                                <i className="fa fa-arrow-left mr-2"></i>Հետ գնալ
                            </button>
                        </div>
              <div className="invoice-wrapper">
                <div className="invoice-header">
                  <div className="upper-icon">
                    <img src={img1} className="img-fluid" alt="svg"/>
                  </div>
                  <div className="row header-content">
                    <div className="col-md-6">
                        <img src={logo} className="img-fluid" alt="logo"/>
                        <div className="mt-md-4 mt-3">
                        <h4 className="mb-2">
                          Կ. Ուլնեցի 59/5, կրպակ 14
                        </h4>
                        <h4 className="mb-0">info@telianicollection.am</h4>
                      </div>
                    </div>
                    <div className="col-md-6 text-md-right mt-md-0 mt-4">
                      <h2>Ապրանքագիր</h2>
                      <div className="mt-md-4 mt-3">
                      </div>
                    </div>
                  </div>
                  <div className="detail-bottom">
                      <div>
                        <p><span>Անուն :</span><span style={{color: "#000", marginLeft: "15px"}}>{order.name}</span ></p>
                        <p><span>Ազգանուն :</span><span style={{color: "#000", marginLeft: "15px"}}>{order.surname}</span ></p>
                        <p><span>Հեռ․ :</span><span style={{color: "#000", marginLeft: "15px"}}>0{order.number}</span ></p>
                        <p><span>Էլ․ հասցե :</span><span style={{color: "#000", marginLeft: "15px"}}>{order.email}</span ></p>
                        <p><span>Բնակության հասցե :</span><span style={{color: "#000", marginLeft: "15px"}}>{order.address}</span ></p>
                      </div>  
                  </div>
                </div>
                <div className="invoice-body table-responsive-md">
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th scope="col">ԻԴ</th>
                        <th scope="col">Ապրանքի անունը</th>
                        <th scope="col">Գինը</th>
                        <th scope="col">Զեղչված գինը</th>
                        <th scope="col">Չափսը</th>
                        <th scope="col">Քանակը</th>
                      </tr>
                    </thead>
                    <tbody>
                    {order.products.map((data, index)=>(
                          <tr key={index}>
                              <td>{data.id}</td>
                              <td>{data.title}</td>
                              <td>{data.price}</td>
                              <td>{data.sale_price}</td>
                              <td>{data.size}</td>
                              <td>{data.quantity}</td>
                            </tr>
                    ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2"></td>
                        <td className="font-bold text-dark" colSpan="2">Ընդհանուր արժեքը</td>
                        <td className="font-bold text-theme">{order.cartTotal}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* <div className="invoice-footer text-right">
                  <div className="authorise-sign">
                    <img src={sign} className="img-fluid" alt="sing" />
                    <span className="line"></span>
                    <h6>Authorised Sign</h6>
                  </div>
                  <div className="buttons">
                    <button className="theme-btn-one btn-black-overlay btn_sm">export as PDF</button>
                    <button className="theme-btn-one btn-black-overlay btn_sm ml-2">print</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}

export default InvoiceOnes
