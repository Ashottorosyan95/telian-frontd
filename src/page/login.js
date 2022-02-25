import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../component/Common/Header';
import Banner from '../component/Common/Banner';
import LoginArea from '../component/Login';
import Footer from '../component/Common/Footer';

const Login = () => {
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
                <Banner title="Մուտք" />
                <LoginArea />
                <Footer />
            </>
        )
    }
}

export default Login