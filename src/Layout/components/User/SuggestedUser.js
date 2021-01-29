import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { backendReqModal, showSuccessToastFun } from '../../../redux/actions/modalActions';
import ShowImage from '../Common/UIElements/ShowImage';

function SuggestedUser({ usr, showOption }) {

    const { user } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        if(user.connections){
            let found = false;
            if(user.connections.length > 0){
                for(let u of user.connections){
                    if(u === usr._id){
                        found = true;
                        break;
                    } 
                }
            }

            if(found){
                setIsFollow(false);
            } else {
                setIsFollow(true);
            }
        } 
        
    }, [user.connections, usr])

    const followAndBlockHandler = () => {
        dispatch(showSuccessToastFun(false));
        
        if(isFollow){
            dispatch(backendReqModal(`/user/${usr._id}/connect/${userId}`, 'POST'))
        } else {
            dispatch(backendReqModal(`/user/${usr._id}/block/${userId}`, 'POST'))
        }
    }

    return (
        <div className="row no-gutters d-flex justify-content-between align-items-center my-3">
            <Link to={`/profile/${usr._id}`} className="post-user pointer text-dark text-decoration-none">
                <ShowImage src={usr.image} width="30" height="30" classes="rounded-circle mr-1" />
                <span>{usr.username}</span>
            </Link>
            {
                (showOption && usr._id !== userId)  &&
                <>
                    <small 
                        className="text-info mr-2 pointer" 
                        onClick={followAndBlockHandler}>
                            { isFollow ? 'Connect' : 'Block'}
                    </small>
                </>
            }
        </div>
    )
}

export default SuggestedUser
