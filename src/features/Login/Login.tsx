
import React, { useContext, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Profile } from '../../models/Profile';
import axios from 'axios';
import { MY_SERVER_LOGIN, MY_SERVER_PROFILE1 } from '../../env';
import { addProfileAsync } from '../Profile/profileSlice1';
import handleAuth from '../Login/Auth';
import { StatusContext } from './Status';




export const Login = () => {
    const dispatch = useAppDispatch();

    const [name, setName1] = useState("");
    const [email, setEmail] = useState("");
    const [is_staff, setStaff] = useState(false);
    const [items, setItems] = useState<number[]>([]);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [staffPass, setPass] = useState("")

    const [remember, setRemember] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const { status, setStatus } = useContext(StatusContext);


    const [errorm, setErrorMsg] = useState("");




    const handleLogin = async (username: string, password: string, remember: boolean) => {
        try {
            const response = await axios.post(MY_SERVER_LOGIN, {
                username,
                password,
            });

            console.log(response.data.user_id);
            // console.log(response.data);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            sessionStorage.setItem('accessToken', accessToken);
            if (remember) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            const userResponse = await axios.get(MY_SERVER_PROFILE1, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const profile = userResponse.data.id;
            const staff = userResponse.data.is_staff;

            sessionStorage.setItem('userId', profile);
            // console.log(profile);
            sessionStorage.setItem('staff', staff);
            console.log(staff);
            setStatus('loggedIn');
            setPassword('')
            setUserName('')
  


            console.log('Login successful!');
            console.log(`Access Token: ${accessToken}`);
            console.log(`Refresh Token: ${refreshToken}`);

        } catch (error) {
            console.error('Login error:', error);
        }
    };//roti - 123

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('Logged out successfully');
        setStatus(null)
        setPassword('')
        setUserName('')
    };


    const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handleName1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName1(e.target.value);
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
        if (e.target.value === "123") {
            setStaff(true);
        }
    };


    const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = e.target.checked;
        setRemember(isChecked);
    }

    const handleTogglePassword = (): void => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const profileData: Profile = {
            username,
            password,
            profile: {
                name,
                email,
                is_staff,
                items
            }
        };
        const action = await dispatch(addProfileAsync(profileData));
        if (addProfileAsync.fulfilled.match(action)) {
            // If submission was successful, get the profile, access token, and refresh token
            const { profile, accessToken, refreshToken } = action.payload;
            // Call handleLogin with the username and password from the new profile
            handleLogin(username, password, remember);
        } else {
            // If submission failed, handle the error
            console.error('Profile creation error:', action.error);
        }
    };



    return (
        <div style={{ display: 'flex' }}>

            <div>
                <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        First Name:
                        <input type="text" value={name} onChange={handleName1Change} />
                    </label>
                </div>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUnameChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePassChange}
                            required
                        />
                    </label>
                    <button onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</button>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={handleEmailChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Staff:
                        <input
                            type={showPassword ? "text" : "password"}
                            value={staffPass}
                            onChange={handleStaffChange}
                        />
                    </label>
                    <button onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</button>
                </div>
                <div>
                    <label>
                        Remeber Me:
                        <input type="checkbox" onChange={handleRememberChange} />
                    </label>
                    <br></br>
                <br></br>

                <button type="submit">Submit</button>

                </div>
                </form>




                <br></br>
                <br></br>
                <div>
                    <h2>Login/Logout</h2>
                    <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUnameChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePassChange}
                            required
                        />
                    </label>
                    <button onClick={handleTogglePassword}>{showPassword ? "Hide" : "Show"}</button>
                </div>
                <div>
                    <label>
                        Remeber Me:
                        <input type="checkbox" onChange={handleRememberChange} />
                    </label>
                </div>
                <br></br>
                {status === null &&<button onClick={() => handleLogin(username, password,remember)}>Login</button>}
                </div>
                <br></br>
                <br></br>
                {status !== null &&<button onClick={handleLogout}>Logout</button>}
                <br></br>
                <br></br>
                <button onClick={handleAuth}>Check</button>

            </div >

        </div >

    )
}
