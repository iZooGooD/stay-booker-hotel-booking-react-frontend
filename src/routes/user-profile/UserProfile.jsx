import React, { useState, useEffect } from 'react';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import Tabs from '../../components/sb-tabs/tabs/Tabs';
import TabPanel from '../../components/sb-tabs/tab-panel/TabPanel';
import {
  faAddressCard,
  faHotel,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
/**
 * User profile page
 */
const UserProfile = () => {
  return (
    <div>
      <GlobalNavbar />
      <div className="container mx-auto">
        <Tabs>
          <TabPanel label="Personal details" icon={faAddressCard}>
            {/* Profile content goes here */}
            Profile Content
          </TabPanel>
          <TabPanel label="Bookings" icon={faHotel}>
            {/* Dashboard content goes here */}
            Dashboard Content
          </TabPanel>
          <TabPanel label="Payment details" icon={faCreditCard}>
            {/* Settings content goes here */}
            Settings Content
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
