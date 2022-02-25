import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

const BillingsInfo = ({billingInfo, errors, clicked}) => {
    let dispatch = useDispatch();
    // const [validated, setValidated] = useState(true);
    
    const billingInfoChange = (val, type) => {
        dispatch({ type: "checkout/billingInfoChange", payload: { val, type } });
    }

    return (
        <>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="checkout-area-bg bg-white">
                    <div className="check-heading">
                        <h3>Վճարումների մասին տեղեկատվություն</h3>
                    </div>
                    <div className="check-out-form">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fname">Անուն<span className="text-danger">*</span> </label>
                                        <input type="text" value={billingInfo.name} onChange={(e) => billingInfoChange(e.target.value, 'name')} required="" className="form-control" id="fname"
                                            placeholder="Անուն" style={{border: clicked && errors.name ? '1px solid red' : '1px solid'}} />
                                            {clicked && errors.name ? <span style={{color: 'red'}}>Անուն դաշտը պարտադիր է</span> : <></>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lname">Ազգանուն<span className="text-danger">*</span></label>
                                        <input type="text" value={billingInfo.surname} onChange={(e) => billingInfoChange(e.target.value, 'surname')} required="" className="form-control" id="lname"
                                            placeholder="Ազգանուն" style={{border: clicked && errors.surname ? '1px solid red' : '1px solid'}} />
                                            {clicked && errors.surname ? <span style={{color: 'red'}}>Ազգանուն դաշտը պարտադիր է</span> : <></>}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Էլ․ հասցե<span className="text-danger">*</span></label>
                                        <input className="form-control" value={billingInfo.email} onChange={(e) => billingInfoChange(e.target.value, 'email')} required="" type="text" id="email"
                                            placeholder="info@gmail.com" style={{border: clicked && errors.email ? '1px solid red' : '1px solid'}} />
                                            {clicked && errors.email ? <span style={{color: 'red'}}>Էլ․ հասցե դաշտը պարտադիր է</span> : <></>}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Հեռախոսահամար<span className="text-danger">*</span></label>
                                        <input className="form-control" required="" value={billingInfo.number} onChange={(e) => billingInfoChange(e.target.value, 'number')} type="number" id="email"
                                            placeholder="Օրինակ՝ 098123456" style={{border: clicked && errors.number ? '1px solid red' : '1px solid'}}  />
                                            {clicked && errors.number ? <span style={{color: 'red'}}>Հեռախոսահամար դաշտը պարտադիր է</span> : <></>}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="faddress">Բնակության հասցե<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control"  value={billingInfo.address} onChange={(e) => billingInfoChange(e.target.value, 'address')} 
                                            id="faddress" required=""
                                            placeholder="Մուտքագրեք ձեր հասցեն այստեղ.." style={{border: clicked && errors.address ? '1px solid red' : '1px solid'}} />
                                            {clicked && errors.address ? <span style={{color: 'red'}}>Բնակության հասցե դաշտը պարտադիր է</span> : <></>}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="messages">Լրացուցիչ նշումներ</label>
                                        <textarea rows="5" className="form-control" id="Additionalnotes"
                                            value={billingInfo.Additionalnotes} onChange={(e) => billingInfoChange(e.target.value, 'Additionalnotes')} 
                                            placeholder="Լրացուցիչ նշումներ"></textarea>
                                    </div>
                                </div>
                                 {/* <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cname">Company Name<span className="text-danger">*</span></label>
                                        <input className="form-control" required="" type="text" id="cname"
                                            placeholder="Company Name" />
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="country">Քաղաքը<span className="text-danger">*</span></label>
                                        <select className="form-control first_null" id="country">
                                            <option defaultValue="">Ընտրեք տարբերակ...</option>
                                            <option defaultValue="AX">usa</option>
                                            <option defaultValue="AF">Afghanistan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="city">State/City<span className="text-danger">*</span></label>
                                        <select className="form-control first_null" id="city">
                                            <option defaultValue="">Select an option...</option>
                                            <option defaultValue="AX">Aland Islands</option>
                                            <option defaultValue="AF">Afghanistan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="zip">State/City<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="zip" required=""
                                            placeholder="Enter Your zipcode" />
                                    </div>
                                </div> */}
                                {/* <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="materialUnchecked" />
                                        <label className="form-check-label" htmlFor="materialUnchecked">Պահպանել տվյալները</label>
                                    </div>
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillingsInfo