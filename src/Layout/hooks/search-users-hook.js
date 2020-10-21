import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserData } from '../../redux/actions/userActions';

function useSearchUserHook() {
    
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);

    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userFound, setUserFound] = useState(true);

    useEffect(() => {
        dispatch(fetchUserData('/user'))
    }, [dispatch])

    const showSearchUserHandler = (e) => {
        setSearchResults([]);
        if(e.key === 'Enter'){
            setUserFound(false)
            users.filter(u => {
                if(u.username === searchUser){
                    setSearchResults(prev => [...prev, u]);
                    setUserFound(true);
                } 
                return false;
            })
        }
    }

    return [ userFound, searchResults, searchUser, setSearchUser, setUserFound, showSearchUserHandler ]
}

export default useSearchUserHook;
