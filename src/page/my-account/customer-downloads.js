import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Banner from '../../component/Common/Banner';
import Layout from '../../component/MyAccountDashboard/Layout';
import Download from '../../component/MyAccountDashboard/Download';
import Footer from '../../component/Common/Footer';

const CustomerDownloads = () => {
    let status = useSelector((state) => state.user.status);

    return status ? (
        <>
            <Header />
            <Banner title="Անձնական էջ" />
            <Layout>
                <Download />
            </Layout>
            <Footer />
        </>
    ) : (
        <Redirect to="/login" />
    )
}

export default CustomerDownloads
