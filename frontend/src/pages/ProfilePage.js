import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import UserProfileForm from "../components/UserProfileForm";
import MyOrders from '../components/Myorders/MyOrders';


const ProfilePage = () => {
    return (
        <div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Profile">
                   <UserProfileForm/>
                </Tab>
                <Tab eventKey="profile" title="Orders">
                  <MyOrders />
                </Tab>

            </Tabs>
        </div>
    );
};

export default ProfilePage;