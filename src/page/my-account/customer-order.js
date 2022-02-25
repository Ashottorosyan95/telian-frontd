import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Banner from '../../component/Common/Banner';
import Layout from '../../component/MyAccountDashboard/Layout';
import Order from '../../component/MyAccountDashboard/Order';
import Footer from '../../component/Common/Footer';

const CustomerOrder = () => {
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    if(status && user.role === 'customer') {
        return (
            <>
                <Header />
                <Banner title="Անձնական էջ" />
                <Layout>
                    <Order />
                </Layout>
                <Footer />
            </>
        )
    } else if(status && user.role === 'admin') {
        return <Redirect to="/vendor/all-products" />
    } else {
        return <Redirect to="/login" />
    }
}

export default CustomerOrder
