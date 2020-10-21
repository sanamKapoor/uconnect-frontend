import React from 'react';
import { useSelector } from 'react-redux';

import MainHeader from '../components/Common/MainHeader'
import Footer from '../components/Common/UIElements/Footer';
import HomeLayout from '../components/Common/HomeLayout'
import ShowToast from '../components/Common/UIElements/ShowToast';

const HomePage = () => {

  const { modalSuccessMsg, modalErrorMsg, showSuccessToast, showErrorToast } = useSelector(state => state.modal);

    return (
        <>
          { (modalSuccessMsg && showSuccessToast) && <ShowToast msg={modalSuccessMsg} /> }
          { (modalErrorMsg && showErrorToast) && <ShowToast msg={modalErrorMsg} /> }
          <MainHeader />
          <HomeLayout />
          <Footer />  
        </>
    )
}

export default HomePage
