import React from 'react';
import { useParams } from 'react-router-dom';
import AuthEssentials from '../components/Common/UIElements/AuthEssentials';

function AccountVerify() {

    const { token } = useParams();
    
    return (
        <AuthEssentials 
            heading="Account Verification"
            txt="Click on verify button to verify your Account."
            btnText="Verify"
            icon="fas fa-check-circle"
            token={token}
            forWhat="account-verify"
            url="/auth/email-active"
            showInputs={false}
            backToLogin={true}
        />
    )
}

export default AccountVerify
