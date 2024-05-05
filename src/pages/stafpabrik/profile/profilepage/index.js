import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../../state/redux';
import Sidebar from '../../../../components/sidebar/manajer';
import Header from '../../../../components/header';
import PrimaryButton from '../../../../components/button/primarybutton';
import { GetUserDetails } from '../../../../service/usermanagement/endpoint';
import { Link } from 'react-router-dom';
import '../../../../assets/css/linkButton.css';




const ProfileViewPage = (props) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo.id : null;

    const fetchUserDetails = async () => {
      if (!userId) {
        alert('No user ID found. Please log in again.');
        return;
      }

      try {
        const data = await GetUserDetails(userId);
        setUserDetails({
          username: data.username,
          email: data.email,
          role: data.role
        });
      } catch (error) {
        console.error(error);
        alert('Failed to fetch user details. Please try again.');
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title='Profile'/>
            <div className='flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                <h2 className="text-xl font-bold mb-4">Profile</h2>
                <p style={{ marginBottom: '16px' }}><strong>Username:</strong> {userDetails.username}</p>
                <p style={{ marginBottom: '16px' }}><strong>Email:</strong> {userDetails.email}</p>
                <p style={{ marginBottom: '16px' }}><strong>Role:</strong> {userDetails.role}</p>
                <div className="mt-4 flex justify-end">
                <Link to="/staf-pabrik/profile" className="button-link-style">
                    Edit Profile
                  </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps)(ProfileViewPage);
