import React from 'react';
import {useSelector} from 'react-redux';
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard'
import StoreItems from './components/StoreItems';
import CompanyMission from './components/CompanyMission';
import CompanyContact from './components/CompanyContact';






const App = () => {
    
    var location = useSelector(state => state.location.location)
        return (
          
                
                <div id="App" className="App">
                    <NavBar />
                    
                    {location === "WELCOME" ? <Welcome /> : null}
                    {location === "STORE"? <StoreItems />: (null)}
                    {location === "DASHBOARD" ? <Dashboard /> : null}
                    {location === "COMPANY_CONTACT" ? <CompanyContact /> : null}
                    {location === "COMPANY_MISSION" ? <CompanyMission /> : null}
                               
                              
                </div>
          
        )
    

}

export default App;