import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Payment = () => {
    let paymentMethod = useSelector((state) => state.checkout.paymentMethod);
    let dispatch = useDispatch();

    const paymentInfoChange = (val) => {
        dispatch({ type: "checkout/paymentTypeChange", payload: {val} })
    }

    return (
        <div className="order_review bg-white">
            <div className="check-heading">
                <h3>Վճարում</h3>
            </div>
            <div className="payment_method">
                <form>
                    <div className="accordion" id="accordionExample">
                        <div className="payment_area_wrappers">
                            <div className="heading_payment" id="headingOne">
                                <div className="" data-toggle="collapse" data-target="#collapseOne" >
                                    <input type="radio" name="payment" id="cash" checked={paymentMethod === 'cash'} 
                                            value="cash" onChange={(e) => paymentInfoChange(e.target.value)}
                                    />
                                    <label htmlFor="cash">Կանխիկ</label>
                                </div>
                            </div>
                        </div>
                        <div className="payment_area_wrappers">
                            <div className="heading_payment" id="headingTwo">
                                <div className="collapsed" data-toggle="collapse" data-target="#collapseTwo">
                                    <input type="radio" name="payment" id="idram" checked={paymentMethod === 'idram'}
                                            value="idram" onChange={(e) => paymentInfoChange(e.target.value)}
                                    />
                                    <label htmlFor="idram">idram</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment