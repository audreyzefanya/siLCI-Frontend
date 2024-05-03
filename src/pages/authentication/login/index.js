import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/Logo_LC.png';
import PrimaryButton from '../../../components/button/buttonpilih';
import ModalLoading from '../../../components/modal/modalLoading';
import ModalResult from '../../../components/modal/modalResult';
import TextInput from '../../../components/textinput';
import { PostLoginUser } from '../../../service/usermanagement/endpoint';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false)
    const [isModalOpenResult, setIsModalOpenResult] = useState(false);
    const [flagResult, setFlagResult] = useState("success")
    const [dataSubtitleModal, setDataSubtitleModal] = useState("")
    const navigateTo = useNavigate()

    useEffect(() => {
        handleGuardNavigation()
    }, [])

    function handleGuardNavigation() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const token = localStorage.getItem('token');
        if (userInfo || token) {
            if (userInfo.role == "Manajer") {
                navigateTo("/manajer/dashboard")
            }
            else if (userInfo.role == "Manager Operasional") {
                navigateTo("/manager-operasional/dashboard")
            }
            else if (userInfo.role == "Admin Karyawan") {
                navigateTo("/admin-karyawan/dashboard")
            }
            else if (userInfo.role == "Admin Perusahaan Import") {
                navigateTo("/admin-perusahaan/dashboard")
            }
            else if (userInfo.role == "Staf Pabrik") {
                navigateTo("/staf-pabrik/dashboard")
            }
            else if (userInfo.role == "Staf Gudang") {
                navigateTo("/staf-gudang/dashboard")
            }
            else if (userInfo.role == "Staf Pengadaan") {
                navigateTo("/staf-pengadaan/dashboard")
            }
            else {
                navigateTo("/logout")
            }
        }
    }

    function handleNavigateToForgotPassword() {
        navigateTo("/forgot-password")
    }

    function handleNavigateToDashboard() {
        setTimeout(() => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log(userInfo.role)
            if (userInfo.role == "Manajer") {
                navigateTo("/manajer/dashboard")
            }
            else if (userInfo.role == "Manager Operasional") {
                navigateTo("/manager-operasional/dashboard")
            }
            else if (userInfo.role == "Admin Karyawan") {
                navigateTo("/admin-karyawan/dashboard")
            }
            else if (userInfo.role == "Admin Perusahaan Import") {
                navigateTo("/admin-perusahaan/dashboard")
            }
            else if (userInfo.role == "Staf Pabrik") {
                navigateTo("/staf-pabrik/dashboard")
            }
            else if (userInfo.role == "Staf Gudang") {
                navigateTo("/staf-gudang/dashboard")
            }
            else if (userInfo.role == "Staf Pengadaan") {
                navigateTo("/staf-pengadaan/dashboard")
            }
            else {
                navigateTo("/login")
            }
        }, 500);
    }

    function handleOpenModalResult(type, subtitle) {
        setTimeout(() => {
            setFlagResult(type)
            setDataSubtitleModal(subtitle)
            setIsModalOpenResult(true)
            setTimeout(() => {
                setIsModalOpenResult(false)
            }, 1000);
        }, 250);
    }

    async function handlePostLogin() {
        if (username && password) {
            try {
                setIsModalOpenLoading(true);
                console.log("tes")
                var response = await PostLoginUser(username, password);
                console.log(response)
                if (response.data != null) {
                    console.log("tes")
                    localStorage.setItem('token', response.access_token);
                    console.log(localStorage.token)
                    localStorage.setItem('userInfo', JSON.stringify({
                        "id": response.data.id,
                        "username": response.data.username,
                        "email": response.data.email,
                        "role": response.data.role,
                        "company": response.data.company
                    }));
                    setIsModalOpenLoading(false);
                    console.log()
                    handleNavigateToDashboard();

                    // try {
                    //     var responseUser = await GetDetailUserByID(response.data.userId);
                    //     localStorage.setItem('userInfo', JSON.stringify({
                    //         "userId": response.data.userId,
                    //         "username": responseUser.username,
                    //         "roleName": responseUser.roleName
                    //     }));
                    //     setIsModalOpenLoading(false);
                    //     handleNavigateToDashboard();
                    // } catch (error) {
                    //     if (error.response && error.response.status == 401) {
                    //         setIsModalOpenLoading(false);
                    //         handleOpenModalResult("failed", "Access denied. You do not have permission to access user details.");
                    //     } else {
                    //         setIsModalOpenLoading(false);
                    //         handleOpenModalResult("failed", "Sorry, unable to retrieve user details at the moment. Please try again.");
                    //     }
                    // }

                } else if (response.code == 401) {
                    setIsModalOpenLoading(false);
                    handleOpenModalResult("failed", "Incorrect password. Double-check and try again or use 'Forgot Password' to reset.");
                } else {
                    setIsModalOpenLoading(false);
                    handleOpenModalResult("failed", "Sorry, unable to login at the moment. Please try again.");
                }
            } catch (error) {
                if (error.request && error.request.status == 404) {
                    setIsModalOpenLoading(false);
                    handleOpenModalResult("failed", "Invalid email. Verify and try again or use a different email.");
                } else {
                    setIsModalOpenLoading(false);
                    handleOpenModalResult("failed", "Sorry, unable to login at the moment. Please try again.");
                }
            }
        } else {
            handleOpenModalResult("failed", "Please fill in all fields to log in.");
        }
    }

    return (
      <div className='h-screen flex flex-col justify-center items-center relative overflow-hidden' style={{background: '#2C358C'}}>
        <div className="bg-white rounded-md drop-shadow-md z-10">
            <div className='mt-8 mx-6 flex justify-center items-center' style={{ height: '150px' }}>
                <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
            </div>
            <div className='mx-6'>
                <p className='font-semibold text-black text-2xl'>Sign In</p>
                <p className='font-normal text-neutral500 text-sm mt-2'>
                    Please enter your username and password
                </p>
            </div>
            <div className='mt-8 mx-6 w-96'>
                <div>
                    <TextInput title='Username' placeholder='Input Username' type='username' value={username} onChange={setUsername}/>
                </div>
                <div className='mt-4'>
                    <TextInput title='Password' placeholder='Input Password' type='password' value={password} onChange={setPassword}/>
                </div>
            </div>
            <div className='my-4 mx-6 flex justify-end'>
            </div>
            <div className='mx-6'>
                <PrimaryButton type='full' title='Sign in' size='large' onClick={handlePostLogin} style={{ backgroundColor: '#DA3732' }} />
            </div>

            <div className='flex justify-center mx-6 mt-8 mb-10'>
            </div>
        </div>

        <div className='absolute bottom-0 z-20 w-full text-center py-2'>
            <div className='flex justify-center'>
                <p className='text-white'>© </p>
                <p className='mx-1 text-white'>|</p>
                <a className='text-white font-medium' href=''>Propenzy</a>
            </div>
        </div>

        <ModalLoading
            title="Loading..."
            subtitle="Please wait a moment"
            isOpen={isModalOpenLoading}
        />

        <ModalResult
            subtitle={dataSubtitleModal}
            type={flagResult}
            isOpen={isModalOpenResult}
        />
    </div>
    );
  };

  export default Login;