import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BillingsInfo from './BillingsInfo';
import axios from 'axios';
import Payment from './Payment';
import YourOrders from './YourOrders';
import Swal from 'sweetalert2';
import { Redirect, useHistory } from 'react-router-dom';


const Checkout = () => {
    let dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef(null);
    let billingInfo = useSelector((state) => state.checkout.billingInfo);
    let paymentMethod = useSelector((state) => state.checkout.paymentMethod);
    let carts = useSelector((state) => state.products.carts);
    let userId = useSelector((state) => state.user.user.id);
    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        email: false,
        number: false,
        address: false,
    });
    const [clicked, setClicked] = useState(false);

    const cartTotalFn = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * (item.sale_price || item.price))
        }, 0)
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validatePhone = (phone) => {
        const careers = ['091', '096', '099', '043', '077', '093', '094', '098', '097', '077', '055', '095', '041', '049', '033'];
        return careers.includes(phone?.substring(0, 3)) && phone.length === 9;
    };

    
    useEffect(() => {
        setErrors({
            name: billingInfo.name ? false : true,
            surname: billingInfo.surname ? false : true,
            email: !billingInfo.email || !validateEmail(billingInfo.email) ? true : false,
            number: !billingInfo.number || !validatePhone(billingInfo.number) ? true : false,
            address: billingInfo.address ? false : true,
        })
    }, [billingInfo])

    const handleOrderClick = () => {
        setClicked(true);
        let cartTotal = cartTotalFn();
        let productIds = carts.map(i => ({productId: i.id, quantity: i.quantity, size: i.size}));
        let cartIds = carts.map(i => i.cartId);
        if(!errors.name && !errors.surname && !errors.email && !errors.number && !errors.address) {
            const data = {
                userId,
                billingInfo,
                paymentMethod,
                cartTotal,
                productIds,
                cartIds,
            };

            // axios.post(process.env.REACT_APP_BACKEND_URL + "/order", {data})
            // .then(res => {
            //     if(res.data.paymentMethod === 'cash') {
            //         Swal.fire({
            //             title: 'Շնորհակալություն!',
            //             text: 'Ձեր պատվերը հաջողությամբ գրանցվեց',
            //             icon: 'success',
            //             showConfirmButton: false,
            //         })
            //         dispatch({ type: "products/clearCart" });
            //         history.push('/my-account/customer-order');
            //     }
            // })
            // .catch(err => {
            //     console.log('errrrrrr', err)
            // });

            if(paymentMethod === 'idram') {
                ref.current.click();
            } else {
                axios.post(process.env.REACT_APP_BACKEND_URL + "/order", {data})
                .then(res => {
                    if(res.data.paymentMethod === 'cash') {
                        Swal.fire({
                            title: 'Շնորհակալություն!',
                            text: 'Ձեր պատվերը հաջողությամբ գրանցվեց',
                            icon: 'success',
                            showConfirmButton: false,
                        })
                        dispatch({ type: "products/clearCart" });
                        history.push('/my-account/customer-order');
                    }
                })
                .catch(err => {
                    console.log('errrrrrr', err)
                });
            }

           

        }
        
    }

    return carts.length ? (
        <section id="checkout_one" className="ptb-100">
            <div className="container">
                <div className="row">
                    <BillingsInfo billingInfo={billingInfo} errors={errors} clicked={clicked} />
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <YourOrders />
                        <Payment />
                        <button className="theme-btn-one btn-black-overlay btn_sm" onClick={handleOrderClick}>Պատվիրել</button>
                    </div>
                    <form action="https://banking.idram.am/Payment/GetPayment" method="POST" style={{opacity: 0}}>
                        <input type="hidden" name="EDP_LANGUAGE" value="AM" />
                        <input type="hidden" name="EDP_REC_ACCOUNT" value="125781058" />
                        <input type="hidden" name="EDP_DESCRIPTION" value="Order description" />
                        <input type="hidden" name="EDP_AMOUNT"value="100" />
                        <input type="hidden" name="EDP_BILL_NO" value="1806" /> 
                        <input type="hidden" name="SUCCESS_URL" value="https://telianshoes.am/checkout" /> 
                        <input type="hidden" name="FAIL_URL" value="https://telianshoes.am/checkout" /> 
                        <input type="hidden" name="RESULT_URL" value="https://telianshoes.am/checkout" /> 
                        <input type="hidden" name="EDP_EMAIL" value="torosyanashot025@gmail.com" /> 
                        <input ref={ref} type="submit" value="submit" />
                     </form>
                </div>
            </div>
        </section>
    ) : <Redirect to="/shop" />
}

export default Checkout