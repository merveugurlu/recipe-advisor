import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import '../styles/Navbar.css'
import { UserAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const { logout } = UserAuth();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            alert('Logged Out')
            navigate('/login')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <header className='header'>
            <div className="row">
                <div className="main-menu">
                    <FiHome className='home-icon' />
                    <NavLink to='/' className='nav-link' style={{ color: 'black', border: '1px solid #1F6650', fontWeight: '500' }}>Home</NavLink>
                    <nav className="nav">
                        {user !== null ? (
                            <ul className="nav-items">
                                <li className="menu-item">
                                    <NavLink to='/account' className='nav-link button'>Account</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to='/favorites' className='nav-link button'>Favorites</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to='/addrecipe' className='nav-link button'>Add Recipe</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to='/myrecipes' className='nav-link button'>My Recipes</NavLink>
                                </li>
                                <li className="menu-item">
                                    <button style={{ backgroundColor: 'white', color: '#1F6650', border: '2px solid', fontWeight: '500' }} className='nav-link button' onClick={handleLogout}>Log Out</button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav-items">
                                <li className="menu-item">
                                    <NavLink to='/login' className='nav-link button'>Login</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to='/register' className='nav-link button'>Register</NavLink>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar