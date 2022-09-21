import React from 'react';
import '../css/welcome.css'
import {useSelector} from 'react-redux';



const  Welcome = ()=>  {
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    var user = useSelector(state => state.auth.user)
        return (
            <div>
                {isAuthenticated ? <div className="home container-fluid">
                <div className="home-slogan">
                    <div>
                    <h1>Welcome, {user.name}</h1>
                    </div>
                    <div>
                    <h2>We support all kinds of businesses, we just can't afford to sell them ourselves</h2>
                    </div>
                </div>
                <img src="/img/adfs.png" alt="ad" className="ad-img" />
                
                </div> : <div className="container-fluid col-md-12 welcome-container">
                    <div className="welcome-header-box">
                        <h1 className="welcome-header">Please Login to view our site or register if this is your first visit</h1>
                    </div>
                    <div className="welcome-ad col-md-12">

                    </div>
                </div> }

                
                                              
            </div>

        )
    
}

export default Welcome;
