import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/stafpengadaan';
import Header from '../../../components/header';
import TextInput from '../../../components/textinput';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalResult from '../../../components/modal/modalResult';
import ModalConfirm from '../../../components/modal/modalConfirm';
import PrimaryButton from '../../../components/button/primarybutton';
import { GetUserDetails, PutEditUserDetails } from '../../../service/usermanagement/endpoint';

const roles = [
  "Admin Karyawan",
  "Admin Perusahaan Import",
  "Staf Pengadaan",
  "Staf Gudang",
  "Staf Pabrik",
  "Manager Operasional"
];

const ProfilePage = (props) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: ''
  });
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultType, setResultType] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRoleEditable, setIsRoleEditable] = useState(false);
  const [mode, setMode] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo.id : null;

    const fetchUserDetails = async () => {
      if (!userId) {
        setResultType('failed');
        setResultMessage('No user ID found. Please log in again.');
        setIsResultOpen(true);
        setTimeout(() => {
          setIsResultOpen(false);
        }, 3000);
        return;
      }

      try {
        const data = await GetUserDetails(userId);
        setUserDetails({
          username: data.username,
          email: data.email,
          role: data.role
        });
        setIsRoleEditable(data.role === "Manager Operasional");
      } catch (error) {
        console.error(error);
        setResultType('failed');
        setResultMessage('Failed to fetch user details. Please try again.');
        setIsResultOpen(true);
        setTimeout(() => {
          setIsResultOpen(false);
        }, 3000);
      }
    };

    fetchUserDetails();
  }, []);

  const confirmUpdate = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo ? userInfo.id : null;

    if (!userId) {
      setResultType('failed');
      setResultMessage('No user ID found. Please log in again.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 3000);
      return;
    }

    try {
      const { username, email, role } = userDetails;
      const updateResponse = await PutEditUserDetails(userId, username, email, role);
      
      // Assuming updateResponse contains the updated user details
      localStorage.setItem('userInfo', JSON.stringify({
        id: userId, // Keep the same ID
        username: updateResponse.username,
        email: updateResponse.email,
        role: updateResponse.role
      }));
      
      setResultType('success');
      setResultMessage('Your profile has been updated successfully.');
    } catch (error) {
      console.error(error);
      setResultType('failed');
      setResultMessage('Failed to update profile. Please try again.');
    } finally {
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 3000);
    }
  };

  const handleUpdate = () => {
    setIsConfirmOpen(true);
  };

  const handleChange = (field, value) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title='Profile'/>
            <div className='flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <TextInput
                  title="Username"
                  placeholder="Enter username"
                  value={userDetails.username}
                  onChange={(value) => handleChange('username', value)}
                />
                <TextInput
                  title="Email"
                  type="email"
                  placeholder="Enter email"
                  value={userDetails.email}
                  onChange={(value) => handleChange('email', value)}
                />
                {isRoleEditable ? (
                  <DropdownText
                    title="Role"
                    options={roles}
                    selectedValue={userDetails.role}
                    onSelect={(value) => handleChange('role', value)}
                    placeholder={userDetails.role}
                  />
                ) : (
                  <TextInput
                    title="Role"
                    value={userDetails.role}
                    disabled={true}
                  />
                )}
                <div className="mt-4 flex justify-end">
                  <PrimaryButton
                    title="Update Profile"
                    onClick={handleUpdate}
                    size="large"
                  />
                </div>
                <ModalConfirm
                  isOpen={isConfirmOpen}
                  onClose={() => setIsConfirmOpen(false)}
                  title="Confirm Profile Update"
                  message="Are you sure you want to update your profile?"
                  onConfirm={() => {
                    confirmUpdate();
                    setIsConfirmOpen(false);
                  }}
                />
                <ModalResult
                  isOpen={isResultOpen}
                  type={resultType}
                  subtitle={resultMessage}
                />
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
