import React, { useState, useEffect } from 'react';
import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import Tabs from '../../components/sb-tabs/tabs/Tabs';
import TabPanel from '../../components/sb-tabs/tab-panel/TabPanel';
/**
 * User profile page
 */
const UserProfile = () => {
  return (
    <div>
      <GlobalNavbar />
      <div className="container mx-auto">
        <Tabs>
          <TabPanel label="Personal details">
            {/* Profile content goes here */}
            Profile Content
          </TabPanel>
          <TabPanel label="Bookings">
            {/* Dashboard content goes here */}
            Dashboard Content
          </TabPanel>
          <TabPanel label="Payment details">
            {/* Settings content goes here */}
            Settings Content
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
