import React, { useState , useEffect} from 'react';
import { connect } from 'react-redux';
import PrimaryButton from '../../../components/button/primarybutton';
import DropdownText from '../../../components/dropdown/dropdownText';
import Header from '../../../components/header';
import ModalConfirm from '../../../components/modal/modalConfirm';
import ModalResult from '../../../components/modal/modalResult';
import Sidebar from '../../../components/sidebar/manajer';
import TextInput from '../../../components/textinput';
import { PostRegisterUser } from '../../../service/usermanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { GetAllUsers, DeleteUserById } from '../../../service/usermanagement/endpoint';
import ModalLoading from '../../../components/modal/modalLoading';

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
  const [emails, setEmails] = useState([]);
  const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

  const handleRegister = async () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!username.trim()) {
      setResultType('failed');
      setResultMessage('Please enter a username.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }

    // Password validation: Check if the password meets complexity requirements
    if (!passwordRegex.test(password)) {
      setResultType('failed');
      setResultMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }

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

    // Check if the email already exists
    if (emails.includes(email)) {
      setResultType('failed');
      setResultMessage('Email already exists. Please use a different email.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }

    try {
      const userData = { username, password, email, role };
      console.log(userData)
      setIsModalOpenLoading(true);
      const response = await PostRegisterUser(userData);
      console.log(response)
      setResultType('success');
      setResultMessage(`User ${username} has been successfully registered.`);
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 3000);
      setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 3000);

      
    } catch (error) {
      console.error(error);
      setResultType('failed');
      setResultMessage('Registration failed. Please try again.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 3000);
    }
    finally {
      setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
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
    setRole('Select Role');
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await GetAllUsers(); // Assuming this fetches the user data
        const emails = response.map(user => user.email);
        setEmails(emails);
      } catch (error) {
        console.error('Failed to fetch emails:', error);
      }
    };

    fetchEmails();
  }, []);



  const emailRegex = /\S+@\S+\.\S+/;

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={4.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
      <div className='w-full h-screen flex flex-col'>
        <Header title='Register Member'/>
        <div className='flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
          <h2 className="text-xl font-bold mb-4">Register New Member</h2>
          <TextInput title="Username" placeholder="Enter username" value={username} onChange={setUsername} />
          <TextInput title="Password" type="password" placeholder="Enter password" value={password} onChange={setPassword} />
          <TextInput title="Email" type="email" placeholder="Enter email" value={email} onChange={setEmail} />
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
      <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
