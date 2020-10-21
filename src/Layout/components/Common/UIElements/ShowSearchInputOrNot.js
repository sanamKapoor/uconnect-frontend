import React from 'react';

import InputElement from './InputElement';

function ShowSearchInputOrNot({ users, userId, searchUser, setSearchUser, setUserFound, showSearchUserHandler }) {
    
    if(users.length === 1 && users[0]._id === userId)  
        return <div className="text-center"><span>No User Found</span></div> 
    else {
        return ( 
                <InputElement 
                    inputType="text" 
                    inputName="search" 
                    inputValue={searchUser} 
                    onChangeHandler={e => {
                        setSearchUser(e.target.value)
                        setUserFound(true)
                    }} 
                    checkText={false}
                    onKeyPressHandler={e => showSearchUserHandler(e)} 
                    classes="border-top-0 border-left-0 border-right-0  w-100 my-2 custom-input"    
                    inputText="Search Users... " 
                />
        )
    }
}

export default ShowSearchInputOrNot;