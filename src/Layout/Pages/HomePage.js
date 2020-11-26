import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainHeader from '../components/Common/MainHeader'
import Footer from '../components/Common/UIElements/Footer';
import HomeLayout from '../components/Common/HomeLayout'
import ShowToast from '../components/Common/UIElements/ShowToast';

import { postErrors } from '../../redux/actions/postActions';
import { userErrors } from '../../redux/actions/userActions';

const HomePage = () => {

  const dispatch = useDispatch();
  const { modalSuccessMsg, modalErrorMsg, showSuccessToast, showErrorToast } = useSelector(state => state.modal);

  useEffect(() => {
    dispatch(postErrors(''))
    dispatch(userErrors(''))
  }, [dispatch])

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
