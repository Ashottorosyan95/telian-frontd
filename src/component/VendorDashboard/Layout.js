import React from 'react';
import SideBar from './SideBar';
import { useSelector } from "react-redux";

const Layout = (props) => {
    let user = useSelector((state) => state.user.user);
    
    return (
        <section id="vendor_area" className={`${user.role === 'admin' ? 'add_bg' : 'ptb-100'}`}>
            <div className="container">
                <div className="row">
                    <SideBar/>
                    <div className="col-sm-12 col-md-12 col-lg-9">
                        <div className="tab-content dashboard_content">
                            <div className="tab-pane fade show active" >
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Layout
