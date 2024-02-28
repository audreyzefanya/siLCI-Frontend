import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigateTo = useNavigate()
    
    useEffect(() => {
        handleNavigateToLogin()
    }, [])

    function handleNavigateToLogin() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token')
        navigateTo("/login")
    }
}

export default Logout