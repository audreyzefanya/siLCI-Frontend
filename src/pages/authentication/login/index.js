import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../components/button/primarybutton';
import TextInput from '../../../components/textinput';
import ModalLoading from '../../../components/modal/modalLoading';
import ModalResult from '../../../components/modal/modalResult';
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
                        "username": response.data.username, 
                        "email": response.data.email,
                        "role": response.data.role
                    }));
                    setIsModalOpenLoading(false);
                    console.log("VERO")
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
    <div className='h-screen flex flex-col justify-center items-center relative overflow-hidden bg-neutral20'>
        <div className="bg-primary50 h-1/2 w-full absolute bottom-0 transform -skew-y-6"></div>
        <div className="bg-primary50 h-1/4 w-full absolute bottom-0"></div>

        <div className="bg-white rounded-md drop-shadow-md z-10">
            <div className='mt-8 mx-6 flex justify-center'>
                <img src="" alt="Logo" />
            </div>
            <div className='mt-6 mx-6'>
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
            {/* <div className='my-4 mx-6 flex justify-end'>
                <p className='text-primary500 font-medium cursor-pointer' onClick={handleNavigateToForgotPassword}>Forgot Password?</p>
            </div> */}
            <div className='mx-6'>
                <PrimaryButton type='full' title='Sign in' size='large' onClick={handlePostLogin}/>
            </div>
            <div className='flex justify-center mx-6 mt-8 mb-10'>
                <p className='text-black font-normal'>Don't have an account? </p>
                <p className='text-primary500 font-medium cursor-pointer ml-1'>Sign Up</p>
            </div>
        </div>

        <div className='absolute bottom-0 z-20 w-full text-center py-2'>
            <div className='flex justify-center'>
                <p className='text-neutral300'>© </p>
                <p className='mx-1'>|</p>
                <a className='text-primary500 font-medium cursor-pointer' href=''>Help Center</a>
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