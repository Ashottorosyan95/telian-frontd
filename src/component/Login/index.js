import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import Facebook from '../../assets/img/Facebookicon.png'

const LoginArea = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    let dispatch = useDispatch();
    const history = useHistory()

    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    
    const login = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/login", {email, password})
        .then(res => {
            if(res.data.error) {
                setErrors({
                    email: res.data.data.email || '',
                    password: res.data.data.password || '',
                })
            } else {
                dispatch({ type: "user/login", user: res.data.data });
                if(res.data.data.type === 0) {
                    history.push("/my-account/customer-order");
                } else {
                    history.push("/vendor/all-products");
                }
            }
        })
        .catch( e => {
            console.log(e)
        })
        // if(status){
        //     Swal.fire({
        //         icon: 'question',
        //         title: 'Mr. '+user.name,
        //         html:
        //             'You are already loged in <br />' +
        //             'You can go to <b>' +
        //             'Dashboard</b> ' +
        //             'or our <b>Shop</b> page',
        //     }).then((result) => {
        //         if(result.isConfirmed) {
        //           history.push('/my-account')
        //         } else {
        //           // not clicked
        //         }
        //       });
        // } else {
        //     dispatch({ type: "user/login" })
        //     let name = user.name || 'Customer'
        //     console.log(typeof(user.name));
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Login Sucessfull',
        //         text: 'Welcome '+ name
        //     })
        //     history.push("/my-account");
        // }
    }

    return (
        <>
            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Մուտք</h3>
                                <form onSubmit={(e) => { e.preventDefault(); login() }}>
                                    <div className="default-form-box">
                                        <label>Էլ․ հասցե<span className="text-danger">*</span></label>
                                        <input type="text" className={`form-control ${errors.email ? 'error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {errors.email &&
                                            <p className="error">{errors.email}</p>
                                        }
                                    </div>
                                    <div className="default-form-box">
                                        <label>Գաղտնաբառ<span className="text-danger">*</span></label>
                                        <input type="password" className={`form-control ${errors.password ? 'error' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                                        {errors.password &&
                                            <p className="error">{errors.password}</p>
                                        }
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Մուտք</button>
                                    </div>
                                    {/* <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                                            <label className="form-check-label" htmlFor="materialUnchecked">Հիշել</label>
                                        </div>
                                    </div> */}
                                    <Link to="/register" className="active">Ստեղծել նոր հաշիվ</Link>
                                    {/* <div>
                                        <img src={Facebook} className='icon-facebook'/>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginArea
