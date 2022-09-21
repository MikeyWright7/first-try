import React from 'react';
import '../css/about.css';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';

const CompanyMission = () => {
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return (
            <div className="about_container col-md-12">
                <div className="mission-box col-md-12">
                    <h1 className="mission-text">My goal is to provide a safe and fun space for you to shop for stuff and avoid the annoying crowds or "Wal-Mart" types you must encounter in your journey to the brick and mortar box stores. I am also all about promoting others in their business ventures, adding to the ever growing small business ventures that has established our great nation!</h1>
                </div>
                <div className="col-md-12 mission-ads">
                <div className="col-md-2 mission-img"></div>
                <div>
                    <h2>We pride ourselves on service and care in being economically sound and environmentally safe</h2>
                </div>
                </div>
                

            </div>
        )
    }
    else {
        return (
            <div>
                <Welcome />
            </div>
        )
    }
}
export default CompanyMission;