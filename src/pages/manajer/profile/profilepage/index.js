import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import TextInput from '../../../components/textinput';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalResult from '../../../components/modal/modalResult'; // Ensure correct import
import { GetUserDetails, PutEditUserDetails } from '../../../service/usermanagement/endpoint';
import PrimaryButton from '../../../components/button/primarybutton';

const UserProfilePage = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultType, setResultType] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    try {
      const data = await GetUserDetails(userId);
      setUserDetails(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { username, email, role } = userDetails;
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    try {
      const response = await PutEditUserDetails(userId, username, email, role);
      if (response != null) {
        console.log("Profile updated");
        localStorage.setItem('userInfo', JSON.stringify({ ...response }));
        setResultType('success');
        setResultMessage('Profile updated successfully!');
        setIsResultOpen(true);
        setIsEditMode(false);
        setTimeout(() => {
          setIsResultOpen(false);
        }, 3000); // Close the modal after 3 seconds
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setResultType('failed');
      setResultMessage('Failed to update profile. Please try again.');
      setIsResultOpen(true);
    }
  };

  const handleChange = (e, field) => {
    setUserDetails(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={6.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title={isEditMode ? 'Edit Profile' : 'Profile'}/>
        <div className='flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Your Profile' : 'Your Profile'}</h2>
          {isEditMode ? (
            <form onSubmit={handleUpdate}>
              <TextInput title="Username" placeholder="Enter username" value={userDetails.username} onChange={(e) => handleChange(e, 'username')} />
              <TextInput title="Email" type="email" placeholder="Enter email" value={userDetails.email} onChange={(e) => handleChange(e, 'email')} />
              <DropdownText title="Role" options={props.roles} optionsValue={props.roles} value={userDetails.role} onSelect={(value) => setUserDetails(prev => ({ ...prev, role: value }))} placeholder="Select Role" />
              <div className="mt-4 flex justify-between">
                <PrimaryButton title="Update Profile" type="submit" size="large" />
                <button type="button" onClick={() => setIsEditMode(false)} className="ml-4 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <p><strong>Username:</strong> {userDetails.username}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Role:</strong> {userDetails.role}</p>
              <div className="mt-4">
                <PrimaryButton title="Edit Profile" onClick={() => setIsEditMode(true)} size="large" />
              </div>
            </>
          )}
          <ModalResult isOpen={isResultOpen} type={resultType} subtitle={resultMessage} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // Your state to props mapping here
});

const mapDispatchToProps = (dispatch) => ({
  // Your dispatch to props mapping here
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
