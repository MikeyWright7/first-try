import React from 'react';
import '../css/contact.css';
import { useSelector } from 'react-redux';
import Welcome from './Welcome';

const CompanyContact = () => {
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return (
            <div className="contact_container">
                <div className="contact-info-box ">
                    <h1 className="contact-text">Please feel free to contact me at my headquarters:</h1>
                    <h2 className="contact-text">Michael Wright</h2>
                    <h2 className="contact-text">#210760</h2>
                    <h2 className="contact-text">ASPC-Tucson</h2>
                    <h2 className="contact-text">Whetstone Unit</h2>
                    <h2 className="contact-text">P.O Box 24402</h2>
                    <h2 className="contact-text">Tucson, AZ 85734</h2>
                    <i className="fas fa-envelope fa-5x"></i>
                </div>
                <div className="social-media">
                    <div className="col-md-12 about-logo">
                        <h1 className="contact-text">Try to find me here in 2 years</h1>
                    </div>
                    <span className="col-md-4"><i className="fab fa-twitter fa-5x"></i></span>
                    <span className="col-md-4"><i className="fab fa-facebook fa-5x"></i></span>
                    <span className="col-md-4"><i className="fab fa-youtube fa-5x"></i></span>
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
export default CompanyContact;