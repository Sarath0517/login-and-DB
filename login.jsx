import React, { useEffect, useState } from 'react';
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');

        const handleRegisterClick = () => {
            wrapper.classList.add('active');
        }

        const handleLoginClick = () => {
            wrapper.classList.remove('active');
        }

        registerLink.addEventListener('click', handleRegisterClick);
        loginLink.addEventListener('click', handleLoginClick);

        // Cleanup function to remove event listener on unmount
        return () => {
            registerLink.removeEventListener('click', handleRegisterClick);
            loginLink.removeEventListener('click', handleLoginClick);
        };
    }, []); // Empty dependency array ensures that this effect runs only once after the initial render

    // Rest of your component code...

    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        const userData = {
            username: username,
            dob: dob,
            email: email,
            password: password
        }
        e.preventDefault();
        axios.post("http://localhost:8081/register", userData, { headers: { "Content-Type": "application/json" } }).then((response) => {
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                setRegisterStatus("Account created successfully");
            }
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/login", {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].email);
            }
        })
    }


    return (
        <div className='logining'>
            <header>
                <nav className="navigation">
                    {/* Navigation content */}
                </nav>
            </header>
            <div className="wrapper">``
                <span className="icon-close">
                    <ion-icon name="close"></ion-icon>
                </span>
                <div className="form-box login">
                    <h2>Login</h2>
                    <form>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail-unread"></ion-icon></span>
                            <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
                            <label>Password</label>
                        </div>
                        <div className="forgot-password">
                            <label><input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot Password</a>
                        </div>
                        <button type="submit" onClick={login} className="btn">Login</button>
                        <div className="login-register">
                            <p>Don't have an account?
                                <a href="#" className="register-link">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
                <div id="registrationform" className="form-box Register">
                    <h2>Registration</h2>
                    <form>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="person"></ion-icon></span>
                            <input type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} required />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="calendar"></ion-icon></span>
                            <input type="date" name="dob" onChange={(e) => { setDob(e.target.value) }} required placeholder="yyyy/mm/dd" />
                            <label>DOB</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail-unread"></ion-icon></span>
                            <input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
                            <label>Password</label>
                        </div>
                        <div className="forgot-password">
                            <label><input type="checkbox" />
                                I agree to the terms & conditions
                            </label>
                        </div>
                        <button type="submit" onClick={register} className="btn" >Register</button>
                        <div className="login-register">
                            <p>Already have an account?
                                <a href="#" className="login-link">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <script src="login.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </div>
    );
}

export default Login;
