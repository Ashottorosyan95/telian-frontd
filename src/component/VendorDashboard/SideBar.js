import React, {useEffect, useState} from 'react'
import { Link , useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


const SideBar = () => {
    let dispatch = useDispatch();
    let orders = useSelector((state) => state.user.allOrders);

    const location = useLocation();
    const history = useHistory();

    const [newOrdersCount, setNewOrdersCount] = useState([]);

    useEffect(() => {
        let filteredOrders = orders.filter(o => o.status === 'pending');
        setNewOrdersCount(filteredOrders.length);
    }, [orders]);

    const logout = () => {
        dispatch({ type: "user/logout" })
        history.push("/login");
    }

    return (
        <div className="col-sm-12 col-md-12 col-lg-3">
             <div className="dashboard_tab_button">
                 <ul role="tablist" className="nav flex-column dashboard-list">
                     <li> <Link to="/vendor/all-products" className={location.pathname === '/vendor/all-products'?'active':null}><i className="fa fa-shopping-cart"></i>Ապրանքներ</Link></li>
                     <li><Link to="/vendor/all-order" className={location.pathname === '/vendor/all-order'?'active':null}><i className="fa fa-shopping-bag"></i>Պատվերներ {newOrdersCount > 0 ? <span className='badge badge-success'>{newOrdersCount}</span> : <></>}</Link></li>
                     <li><Link to="/vendor/all-size" className={location.pathname === '/vendor/all-size'?'active':null}><i className="fa fa-shopping-bag"></i>Կոշիկի չափսերը</Link></li>
                     <li><Link to="/vendor/add-products" className={location.pathname === '/vendor/add-products'?'active':null}><i className="fa fa-shopping-bag"></i>Ավելացնել նոր ապրանք</Link></li>
                     <li><Link to="/vendor/add-size" className={location.pathname === '/vendor/add-size'?'active':null}><i className="fa fa-shopping-bag"></i>Ավելացնել նոր չափս</Link></li>
                     {/* <li><Link to="/vendor/all-category" className={location.pathname === '/vendor/all-category'?'active':null}><i className="fa fa-shopping-bag"></i>Կատեգորիաներ</Link></li> */}
                     {/* <li><Link to="/vendor/add-category" className={location.pathname === '/vendor/add-category'?'active':null}><i className="fa fa-shopping-bag"></i>Ավելացնել նոր կատեգորիա</Link></li> */}
                     {/* <li><Link to="/vendor-dashboard" className={location.pathname === '/vendor-dashboard'?'active':null}><i className="fa fa-tachometer"></i>  Dashboard</Link></li> */}
                     {/* <li><Link to="/vendor/vendor-profile" className={location.pathname === '/vendor/vendor-profile'?'active':null}><i className="fa fa-id-badge"></i>Profile</Link></li> */}
                     {/* <li><Link to="/vendor/vendor-setting" className={location.pathname === '/vendor/vendor-setting'?'active':null}><i className="fa fa-user"></i>Settings</Link></li> */}
                     {/* <li><Link to="/#!" onClick={(e) => {e.preventDefault(); logout()}}><i className="fa fa-sign-out"></i>Ելք</Link></li> */}
                 </ul>
             </div>
         </div>
    )
}

export default SideBar
