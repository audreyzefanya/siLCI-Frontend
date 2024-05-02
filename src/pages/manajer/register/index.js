import { GetPerusahaan } from '../../../service/perusahaanimpor/endpoint';


import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import TextInput from '../../../components/textinput';
import DropdownText from '../../../components/dropdown/dropdownText';
import ModalConfirm from '../../../components/modal/modalConfirm';
import ModalResult from '../../../components/modal/modalResult';
import PrimaryButton from '../../../components/button/primarybutton';
import { PostRegisterUser} from '../../../service/usermanagement/endpoint';

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
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companyData = await GetPerusahaan();
        if (companyData) {
          console.log("Fetched companies:", companyData);
          setCompanies(companyData.map(company => ({
            name: company.nama,  // Assuming 'nama' is the correct field for the company name
            id: company.id       // Assuming 'id' is the correct field for the company ID
          })));
        } else {
          setCompanies([]); // Ensure companies is at least an empty array if no data is fetched
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]); // Set companies to an empty array on error
      }
    }
    fetchCompanies();
  }, []);

  const handleCompanySelection = (value) => {
    console.log("Company selected:", value);
    const selectedCompanyName = companies.find(company => company.id === value)?.name;
    setSelectedCompany(selectedCompanyName);
};


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

    // Check for company selection if role requires it
    if (role === "Admin Perusahaan Import" && !selectedCompany) {
      setResultType('failed');
      setResultMessage('Please select a company.');
      setIsResultOpen(true);
      setTimeout(() => {
        setIsResultOpen(false);
      }, 2000);
      return;
    }

    try {
      const userData = { username, password, email, role, company: selectedCompany };
      console.log(userData)
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
    setSelectedCompany('');
  };



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
          {role === "Admin Perusahaan Import" && companies && companies.length > 0 && (
            <DropdownText
              title="Company"
              options={companies.map(company => company.name)}  // Map for name
              optionsValue={companies.map(company => company.id)}  // Map for ID
              onSelect={handleCompanySelection}
              placeholder="Select Company"
              currentOption={selectedCompany}
            />
          )}
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
