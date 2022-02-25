import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Header from '../../component/Common/Header';
import Banner from '../../component/Common/Banner';
import AccountDetailsEdit from '../../component/MyAccountDashboard/AccountDetailsEdit';
import Footer from '../../component/Common/Footer';

const AccountEdit = () => {
  let status = useSelector((state) => state.user.status);
  let user = useSelector((state) => state.user.user);

    if(status && user.role === 'customer') {
        return (
            <>
              <Header />
              <Banner title="Տվյալների կառավարում" />
              <AccountDetailsEdit />
              <Footer />
            </>
        )
    } else if(status && user.role === 'admin') {
        return <Redirect to="/vendor/all-products" />
    } else {
        return <Redirect to="/login" />
    }
}

export default AccountEdit