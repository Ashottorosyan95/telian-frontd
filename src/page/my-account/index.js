import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Banner from '../../component/Common/Banner';
import Layout from '../../component/MyAccountDashboard/Layout';
import Dashboard from '../../component/MyAccountDashboard/DashBoard';
import Footer from '../../component/Common/Footer';
const MyAccounts = () => {
    let status = useSelector((state) => state.user.status);

    return status ? (
        <>
            <Header />
            <Banner title="Անձնական էջ" />
            <Layout>
                <Dashboard />
            </Layout>
            <Footer />
        </>
    ) : (
        <Redirect to="/login" />
    )
}

export default MyAccounts