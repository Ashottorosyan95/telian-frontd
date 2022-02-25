import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../assets/img/team/team1.png'
import { useSelector } from "react-redux";

const AccountDetails = () => {
    let user = useSelector((state) => state.user.user);
    
    return (
        <div className="myaccount-content">
            <div className="save_button mt-3 d-flex align-items-center justify-content-between">
                <h4 className="title">Տվյալների կառավարում</h4>
                <Link to="/account-edit" className="theme-btn-one bg-black btn_sm">Թարմացնել հաշիվը</Link>
            </div>
            <div className="login_form_container">
                <div className="account_details_form">
                    <form action="#">
                        <div className="img_profiles mb-3">
                            {user.avatar ? 
                                <img src={user.avatar} alt="img" /> :
                                <img src={img1} alt="img" />
                            }
                        </div>
                        <div className="default-form-box mb-20">
                            <label>Մուտքանուն</label>
                            <input type="text" name="first-name" className="form-control" defaultValue={user.name} disabled />
                        </div>
                        <div className="default-form-box mb-20">
                            <label>Էլ․ հասցե</label>
                            <input type="text" name="email-name" defaultValue={user.email} className="form-control" disabled />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountDetails
