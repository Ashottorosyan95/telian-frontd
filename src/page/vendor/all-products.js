import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Layout from '../../component/VendorDashboard/Layout';
import AllProduct from '../../component/VendorDashboard/AllProduct';
import Banner from '../../component/Common/Banner';
import Footer from '../../component/Common/Footer';
import TopHeader from '../../component/Common/Header/TopHeader';

const AllProducts = () => {
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    if(status && user.role === 'admin') {
        return (
            <>
                <TopHeader />
                {/* <Header /> */}
                {/* <Banner title="Վաճառող" /> */}
                <Layout>
                    <AllProduct/>
                </Layout>
                {/* <Footer /> */}
            </>
        )
    } else if(status && user.role === 'customer') {
        return <Redirect to="/my-account/customer-order" />
    } else {
        return <Redirect to="/login" />
    }
}

export default AllProducts
