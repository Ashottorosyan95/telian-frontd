import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Layout from '../../component/VendorDashboard/Layout';
import AllSizes from '../../component/VendorDashboard/AllProductSize';
import TopHeader from '../../component/Common/Header/TopHeader';

const AllProductSizes = () => {
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    if(status && user.role === 'admin') {
        return (
            <>
                <TopHeader />
                <Layout>
                    <AllSizes/>
                </Layout>
            </>
        )
    } else if(status && user.role === 'customer') {
        return <Redirect to="/my-account/customer-order" />
    } else {
        return <Redirect to="/login" />
    }
}

export default AllProductSizes
