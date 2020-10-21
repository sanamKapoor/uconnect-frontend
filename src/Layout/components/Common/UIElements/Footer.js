import React from 'react';

import { useSelector } from 'react-redux';

function Footer() {

    const { posts, postError, postLoading } = useSelector(state => state.post);

    if(!postError && !postLoading && posts.length > 0){
        return (
            <footer className="container-fluid container-sm border-top py-2 mb-5 mb-lg-0 mt-2">
                <p className="float-right mb-5 mb-lg-2">Made with <span role="img" aria-label="heart">❤️</span> By Sanam Kapoor</p>
            </footer>
        )
    } else {
        return ''
    }
}

export default Footer
