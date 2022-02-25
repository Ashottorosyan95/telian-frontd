import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Layout from '../../component/VendorDashboard/Layout';
import Banner from '../../component/Common/Banner';
import AddCategory from '../../component/VendorDashboard/AddCategory';
import Footer from '../../component/Common/Footer';
import TopHeader from '../../component/Common/Header/TopHeader';

const AddCategorys = () => {
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    if(status && user.role === 'admin') {
        return (
            <>
                <TopHeader />
                {/* <Header /> */}
                {/* <Banner title="Վաճառող" /> */}
                <Layout>
                    <AddCategory/>
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

export default AddCategorys
