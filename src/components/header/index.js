import React, {useState, useEffect, useRef} from 'react'
import Profile from '../../assets/images/profile.png';
import Notification from '../notification';
import { PiDoorOpenDuotone, PiUserCircleDuotone, PiWalletDuotone, PiBellDuotone } from 'react-icons/pi';

const Header = ({
    title = "Label",
    isActive = false,
    isVisibleBalance = false,
}) => {
    
    const [isProfileContentVisible, setProfileContentVisible] = useState(false);
    const modalRef = useRef(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setProfileContentVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileContentVisible]);

    function toggleProfileContent() {
        setProfileContentVisible(!isProfileContentVisible)
    }
    
  return (
    <div className='w-full h-16 flex items-center bg-white border-b border-neutral40 px-8'>
        <div className='flex w-full justify-between items-center'>
            <p className='text-2xl font-semibold'>{title}</p>
            <div className='flex'>
                {isVisibleBalance && (
                    <div className='flex items-center justify-center'>
                        <div className='h-10 w-10 rounded-full border border-neutral40 flex items-center justify-center'>
                            <PiWalletDuotone className='h-6 w-6'/>
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm text-neutral300 font-normal whitespace-nowrap'>Balance:</p>
                            <p className='text-xs text-black font-bold whitespace-nowrap'>Rp {balance}</p>
                        </div>
                    </div>
                )}
                <div className="w-px bg-neutral40 h-16 mx-6"></div>
                <div className='flex items-center justify-center mr-6'>
                    <div className='h-10 w-10 rounded-full border border-neutral40 flex items-center justify-center'>
                        <PiBellDuotone className='h-6 w-6'/>
                    </div>
                </div>
                <div className='flex items-center cursor-pointer' onClick={toggleProfileContent} ref={modalRef}>
                    <img src={Profile} className='w-10 h-10 mr-2' />
                    {isProfileContentVisible && (
                        <div
                            className='absolute right-4 top-16 z-50'
                        >
                            {isProfileContentVisible && (
                            <div className='w-52 bg-white border border-neutral40 rounded-md shadow-md mt-2'>
                                <Notification
                                    dataNotification={[
                                        { title: "Logout", navigate: "/logout", logo: PiDoorOpenDuotone},
                                    ]}
                                />
                            </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header