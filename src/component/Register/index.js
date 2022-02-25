import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
import axios from 'axios'
const RegisterArea = () => {
    let dispatch = useDispatch();
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    })

    let status = useSelector((state) => state.user.status);
    let userData = useSelector((state) => state.user.user);

    const handleUsernameChange = (e) => {
        setUsername(e.currentTarget.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    const register = () => {
        axios.post(process.env.REACT_APP_BACKEND_URL + "/register", {username, email, password})
        .then(res => {
            if(res.data.error) {
                setErrors({
                    username: res.data.data.username || '',
                    email: res.data.data.email || '',
                    password: res.data.data.password || '',
                })
            } else {
                // dispatch({ type: "user/register", payload: { username: res.data.data.username, email: res.data.data.email, password: res.data.data.password} })
                Swal.fire({
                    icon: 'success',
                    title: 'Դուք բարեհաջող գրանցվեցիք'
                })
                history.push("/login");
            }
        })
        .catch( e => {
            console.log(e)
        })
        // if(status){
        //     Swal.fire({
        //         icon: 'question',
        //         title: 'Mr. ' + userData.name,
        //         html:
        //             'You are already Registered <br />' +
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
        //     dispatch({ type: "user/register", payload: { username, email, password} })
            
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Registration Sucessfull',
        //         text: 'Welcome Mr.'+username
        //     })
        //     history.push("/my-account");
        // }
        
    }
    return (
        <section id="login_area" className="ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="account_form">
                            <h3>Գրանցում</h3>
                            <form onSubmit={(e) => { e.preventDefault(); register() }}>
                                <div className="default-form-box">
                                    <label>Մուտքանուն<span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" placeholder="Լրացրեք մուտքանունը" className={`form-control ${errors.username ? 'error' : ''}`} value={username} onChange={handleUsernameChange} />
                                    {errors.username &&
                                        <p className="error">{errors.username}</p>
                                    }
                                </div>
                                <div className="default-form-box">
                                    <label>Էլ․ հասցե<span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" placeholder="Լրացրեք էլ․ հասցեն" className={`form-control ${errors.email ? 'error' : ''}`} value={email} onChange={handleEmailChange} />
                                    {errors.email &&
                                        <p className="error">{errors.email}</p>
                                    }
                                </div>
                                <div className="default-form-box">
                                    <label>Գաղտնաբառ<span className="text-danger">*</span></label>
                                    <input type="password" autoComplete="off" placeholder="Լրացրեք Գաղտնաբառը" className={`form-control ${errors.password ? 'error' : ''}`} value={password} onChange={handlePasswordChange} />
                                    {errors.password &&
                                        <p className="error">{errors.password}</p>
                                    }
                                </div>
                                <div className="login_submit">
                                    <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Գրանցվել</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterArea
