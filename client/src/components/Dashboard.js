import React from 'react';
import { useSelector } from 'react-redux';
import Admin from './Admin';
import '../css/dashboard.css'
import Welcome from './Welcome';
import UpdateProfile from './UpdateProfile';

const Dashboard = (props) => {

    const { user, isAuthenticated } = useSelector(state => state.auth);

    return (
        <div>
            {isAuthenticated ? <div className="dashboard_container col-md-12 container-fluid">
                <span>{isAuthenticated && user.admin ? <Admin /> : null}</span>
                <h1 className="profile-header">Hello, {user.name}</h1>
                <div className="profile_container col-md-12">
                    <div className="profile-info-box col-md-6">
                        <h2 className="profile-header">Here as some things that might interest you:</h2>
                        <ul>
                            <li className="profile-text">Your vote will be for a loser this election</li>
                            <li className="profile-text">You can avoid Black Friday here!</li>
                            <li className="profile-text">The world will bounce back, don't worry</li>
                        </ul>
                        <div className="profile-stats">
                            <h2 className="profile-text">Your current account has to be established further as we have just opened</h2>
                            <p className="profile-text">{user.name}</p>
                            <p className="profile-text">{user.email}</p>
                            <p className="profile-text">{user.age}</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="update-profile-box">
                            <h2 className="profile-header">
                                Click below in order to update profile:
                            <p className="profile-text">{user.name}</p>
                                <p className="profile-text">{user.email}</p>
                            </h2>
                            <UpdateProfile />
                        </div>
                    </div>
                </div>

            </div> : <Welcome />}
        </div>
    )

}



export default Dashboard;