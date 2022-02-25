import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
    const location = useLocation()
    let dispatch = useDispatch();
    const history = useHistory()
    let status = useSelector((state) => state.user.status);
    const logout = () => {
        dispatch({ type: "user/logout" })
        history.push("/login");
    }
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="dashboard_tab_button">
                    <ul role="tablist" className="nav flex-column dashboard-list">
                        <li> <Link to="/my-account/customer-order" className={location.pathname === '/my-account/customer-order' ? 'active' : null}><i className="fa fa-cart-arrow-down"></i>Իմ պատվերները</Link></li>
                        <li><Link to="/my-account/customer-account-details" className={location.pathname === '/my-account/customer-account-details' ? 'active' : null}><i className="fa fa-user"></i>Իմ էջը</Link></li>
                        {/* <li><Link to="/my-account" className={location.pathname === '/my-account'?'active':null}><i className="fa fa-tachometer"></i>Կառավարման վահանակ</Link></li> */}
                        {/* <li><Link to="/my-account/customer-download" className={location.pathname === '/my-account/customer-download'?'active':null}><i className="fa fa-cloud-download"></i>Downloads</Link></li> */}
                        {/* <li><Link to="/my-account/customer-address" className={location.pathname === '/my-account/customer-address'?'active':null}><i className="fa fa-map-marker"></i>Addresses</Link></li> */}
                        {
                            status ? <li><Link to="/#!" onClick={(e) => {e.preventDefault(); logout()}}><i className="fa fa-sign-out"></i>Ելք</Link></li>:null
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
