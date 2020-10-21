import React from 'react';

import SuggestedUser from '../../User/SuggestedUser';

function ShowSearchResults({ users, userId, userFound, searchResults, searchUser, showOption }){

    return (
    <>
        {
            (users.length > 0 && !searchUser) ? 
            users.map(user => {
                if(user._id !== userId){
                    return <SuggestedUser key={user._id} usr={user} showOption={showOption} />
                }
                return false;
            })
            : 
            (searchResults.length > 0) &&
            searchResults.map(user => {
                if(user._id !== userId){
                    return <SuggestedUser key={user._id} usr={user} showOption={showOption} />
                }
                return false;
            })
        }
        {
            (!userFound) ? <div className="text-center"><span>No User Found</span></div> : ''
        }
    </>
    )
}

export default ShowSearchResults
