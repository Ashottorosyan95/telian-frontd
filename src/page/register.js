import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../component/Common/Header';
import Banner from '../component/Common/Banner';
import RegisterArea from '../component/Register';
import Footer from '../component/Common/Footer';

const Register = () => {
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);

    if(status && user.role === 'customer') {
        return <Redirect to="/my-account/customer-order" />
    } else if(status && user.role === 'admin') {
        return <Redirect to="/vendor/all-products" />
    } else {
        return (
            <>
                <Header />
                <Banner title="Գրանցում" />
                <RegisterArea />
                <Footer />
            </>
        )
    }
}

export default Register