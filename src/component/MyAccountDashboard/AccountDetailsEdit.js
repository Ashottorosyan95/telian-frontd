import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import defaultAvatar from '../../assets/img/team/team1.png'

const AccountDetailsEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [username, setUsername] = useState(user.name);
    const [avatar, setAvatar] = useState(user.avatar || null);
    
    const routeChange = () => { 
        history.goBack()
    };

    const handleAvatarChange = (e) => {
        if(e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_email', user.email);
        formData.append('avatar', avatar);
        formData.append('username', username);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/updateUserDetails', formData)
        .then(res => {
            if(res.data.success) {
                dispatch({ type: "user/login", user: res.data.result });
                history.goBack();
            }
        })
        .catch(err => {
            console.log('errrrrrr', err)
        });
    }

    return (
        <section id="account_edit" className="pt-100 pb-100">
            <div className="container">
                <div className="row">
                <div className="col-lg-6">
                        <div className="back_btn">
                        <   Link to="/" onClick={routeChange}><i className="fa fa-arrow-left"></i>Գնալ հետ</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="account_thumd">
                            <div className="account_thumb_img">
                                {!avatar ? 
                                    <img src={defaultAvatar} alt="img" /> :
                                    <img src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)} alt="img" />
                                    
                                }
                                <div className="fixed_icon"><input type="file" onChange={handleAvatarChange} /><i className="fa fa-camera"></i></div>
                                {avatar &&
                                    <div className="remove_icon" onClick={() => setAvatar(null)}><i className="fa fa-remove"></i></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="account_setting">
                            <div className="account_setting_heading">
                                <h2>Տվյալների կառավարում</h2>
                            </div>
                            <form id="account_info_form" onSubmit={handleSubmit}>
                                {/* <div className="input-radio">
                                    <span className="custom-radio"><input type="radio" value="1" name="id_gender" defaultChecked/> Mr.</span>
                                    <span className="custom-radio"><input type="radio" value="1" name="id_gender"/> Mrs.</span>
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="f_name">Մուտքանուն</label>
                                    <input type="text" className="form-control" id="f_name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label  htmlFor="email_address">Էլ․ հասցե</label>
                                    <input type="email" className="form-control" id="email_address" defaultValue={user.email} disabled />
                                </div>
                                {/* <div className="form-group">
                                    <label  htmlFor="current_password">Current Password</label>
                                    <input type="password" className="form-control" id="current_password"
                                        placeholder="Enter your current password" />
                                    <input type="password" className="form-control" id="new_password"
                                        placeholder="Enter your new password" />
                                </div> */}
                                <button type="submit" className="theme-btn-one bg-black btn_sm">Թարմացնել</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountDetailsEdit
