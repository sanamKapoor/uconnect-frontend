import React from 'react';
import { useParams } from 'react-router-dom';
import AuthEssentials from '../components/Common/UIElements/AuthEssentials';

function ResetPassword() {

    const { token } = useParams();
    
    return (
        <AuthEssentials 
            heading="Reset Password"
            btnText="Reset Password"
            inputText={token ? 'Password' : 'Email'}
            icon="fas fa-lock"
            token={token}
            forWhat={token ? 'new-password' : 'reset-password-link' }
            url={token ? '/auth/resetPassword' : '/auth/forgetPassword'}
            showInputs={true}
            backToLogin={token ? true : false}
        />
    )
}

export default ResetPassword
