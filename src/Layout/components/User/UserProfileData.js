import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WarningModal from '../Modal/WarningModal';
import UsersModal from '../Modal/UsersModal';
import UserAboutModal from '../Modal/UserAboutModal';
import { backendReqModal  } from '../../../redux/actions/modalActions';

function UserProfileData({ usr, isAdmin }) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);

    const [warningModal, setWarningModal] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');

    const [connect, setConnect] = useState(true);
    const [userPosts, setUserPosts] = useState(0);
    const [deletedEle, setDeletedEle] = useState('');

    const warningMsgFun = (msg) => {
        setWarningModal(true);
        setWarningMsg(msg)
    }

    useEffect(() => {
        usr.posts && setUserPosts(usr.posts.length);
        if(user.connections){
            let found = false;
            if(user.connections?.length > 0){
                for(let u of user.connections){
                    if(u === usr._id){
                        found = true;
                        break;
                    } 
                }
            }
            
            if(found){
                setConnect(false);
            } else {
                setConnect(true)
            }
        }

    }, [usr, userId, user.connections])
 
    
    const followAndBlockHandler = () => {
        if(connect){
            dispatch(backendReqModal(`/user/${usr._id}/connect/${userId}`, 'POST'))
        } else {
            dispatch(backendReqModal(`/user/${usr._id}/block/${userId}`, 'POST'))
        }
    }

    if(usr){
    return (
        <>
        <div className="col-12 col-md-8 my-3">
                <div className="profile-title d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-md-start">
                <h2 className="profile-name">{usr.username}</h2>
                {
                    isAdmin &&
                    <div className="ml-sm-4 d-flex">
                        <button className="btn btn-info btn-sm mx-1 d-flex align-items-center" onClick={() => setAboutModal(true)}>Edit <i className="fas fa-edit ml-2"></i></button>
                        <button className="btn btn-danger btn-sm mx-1 d-flex align-items-center" 
                        onClick={() => {
                            warningMsgFun('Do you really want to delete your account ?')
                            setDeletedEle('account')
                        }}>
                        Delete <i className="far fa-trash-alt ml-2"></i>
                        </button>
                    </div>
                }
                </div>

                <div className="profile-data">
                    <div className="row my-3 font-weight-bold text-center text-md-left">
                    <div className="col">{userPosts} {userPosts > 1 ? 'Posts' : 'Post' }</div> 
                    {usr.connections && <div className="col"> 
                    <span className="pointer" onClick={() => setUsersModal(true)}>{usr.connections?.length} {usr.connections.length > 1 ? 'Connections' : 'Connection' }</span>
                    </div> }
                    {
                        !isAdmin &&
                        <div className="col">
                            {
                                <button className="btn btn-block btn-primary btn-sm" onClick={followAndBlockHandler}>
                                    { connect ? 'Connect' : 'Block' }
                                </button>
                            }
                        </div>

                    }
                    </div>
                </div>

                <div className="my-2 my-lg-3 text-center text-md-left text-break w-75 mx-auto mx-md-0">
                    { usr.profession && <div><i className="fas fa-user mr-2"></i>{usr.profession}</div> }
                    { usr.location && <div><i className="fas fa-map-marker-alt mr-2"></i>{usr.location}</div> }
                    { usr.bio && <div>{usr.bio}</div> }
                    { 
                    (usr.profession || usr.location || usr.bio) && isAdmin && 
                    <i className="far fa-trash-alt float-right m-1 post-icon" 
                    onClick={() => {
                        warningMsgFun('Do you really want to delete your about info ?')
                        setDeletedEle('about')
                    }}></i>
                    }
                </div>
        </div>

        <WarningModal 
            show={warningModal}
            onHide={() => setWarningModal(false)}
            msg={warningMsg}
            element={deletedEle}
        />

        <UsersModal 
            show={usersModal}
            onHide={() => setUsersModal(false)}
            propsUsers={usr.connections}
            isAdmin={isAdmin}
            errorText="Didn't found any connection."
        />

        <UserAboutModal 
            show={aboutModal}
            onHide={() => setAboutModal(false)}
            user={usr}
        />

        </>
    )
    } else {
        return ''
    }
}

export default UserProfileData
