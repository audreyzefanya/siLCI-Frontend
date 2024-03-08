import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import TextInput from '../../../components/textinput';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalConfirm from '../../../components/modal/modalConfirm';
import ModalResult from '../../../components/modal/modalResult'; // Ensure this is imported correctly
import { PostRegisterUser } from '../../../service/usermanagement/endpoint';
import PrimaryButton from '../../../components/button/primarybutton';

const roles = [
  "Admin Karyawan",
  "Admin Perusahaan Import",
  "Staf Pengadaan",
  "Staf Gudang",
  "Staf Pabrik",
  "Manager Operasional"
];

const RegisterPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultType, setResultType] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const emailRegex = /\S+@\S+\.\S+/;

  const handleRegister = async () => {
    if (!emailRegex.test(email)) {
      setResultType('failed');
      setResultMessage('Please enter a valid email address.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }
    if (!role) {
      setResultType('failed');
      setResultMessage('Please select a role.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }

    try {
      const response = await PostRegisterUser(username, password, email, role);
      console.log(response); // Assume successful response structure
      setResultType('success');
      setResultMessage(`You have registered the member with username: ${username}`);
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 3000); // Close the modal after 3 seconds
      resetForm();
    } catch (error) {
      console.error(error);
      setResultType('failed');
      setResultMessage('Registration failed. Please try again.');
      setIsResultOpen(true);
    }
  };

  const confirmRegistration = () => {
    setIsOpen(false); // Close the confirmation modal
    handleRegister(); // Attempt registration
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('');
  };

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={4.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title='Register Member'/>
            <div className='flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                <h2 className="text-xl font-bold mb-4">Register New Member</h2>
                <TextInput
                  title="Username"
                  placeholder="Enter username"
                  value={username}
                  onChange={setUsername}
                />
                <TextInput
                  title="Password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={setPassword}
                />
                <TextInput
                  title="Email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={setEmail}
                />
                <DropdownText
                  title="Role"
                  options={roles}
                  optionsValue={roles} // Assuming roles are both the display and value
                  onSelect={(value) => setRole(value)}
                  placeholder="Select Role"
                />
                <div className="mt-4 flex justify-end">
                  <PrimaryButton
                    title="Register"
                    onClick={() => setIsOpen(true)}
                    size="large"
                  />
                </div>
                <ModalConfirm
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  title="Confirm Registration"
                  message="Are you sure you want to register this member?"
                  onConfirm={confirmRegistration}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
