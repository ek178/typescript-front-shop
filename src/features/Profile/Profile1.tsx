
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Profile } from '../../models/Profile';
import { getProfileAsync, selectProfiles1, addProfileAsync, delProfileAsync, updProfileAsync } from './profileSlice1';
import axios from 'axios';
import { MY_SERVER_LOGIN } from '../../env';


export const Profile1 = () => {
    const profiles = useAppSelector(selectProfiles1);
    const dispatch = useAppDispatch();

    const [name, setName1] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [is_staff, setStaff] = useState(false);
    const [items, setItems] = useState<number[]>([]);
    const [pass, setPass] = useState("")
    const [password, setPassword] = useState("")
    const [errorm, setErrorMsg] = useState("");

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [dispatch]);

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post(MY_SERVER_LOGIN, {
                username,
                password,
            });
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;

            // Store the tokens securely on the frontend (e.g. in local storage or in an httpOnly cookie)
            console.log('Login successful!');
            console.log(`Access Token: ${accessToken}`);
            console.log(`Refresh Token: ${refreshToken}`);

        } catch (error) {
            console.error('Login error:', error);
        }
    };//roti - 123


    const handleName1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName1(e.target.value);
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };


    const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numbers = value.split(',').map(Number);
        setItems([...numbers]);
        console.log(Array.isArray(items))
        console.log(items)
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
          handleLogin(username, password);
        } else {
          // If submission failed, handle the error
          console.error('Profile creation error:', action.error);
        }
      };


    // if (addProfileAsync.fulfilled.match(action)) {console.log('yes')}


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Profiles in my class: {profiles && profiles.length}</h1>

                {profiles && profiles.map((pro, i) => (
                    <div key={i}>
                        Name: {pro?.name}
                        <button onClick={() => dispatch(delProfileAsync(pro.id || -1))}>
                            Del
                        </button>
                        <br></br>
                        <button
                            onClick={() =>
                                dispatch(updProfileAsync({
                                    id: pro.id,
                                    name: name || pro.name,
                                    items: items || pro.items,
                                    email: email || pro.email,
                                    is_staff: is_staff || pro.is_staff,
                                }))
                            }
                        >
                            Upd
                        </button>
                    </div>
                ))}
            </div>
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
                        <input type="password" value={password} onChange={handlePassChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={handleEmailChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Items:
                        <input type="text" value={items.join(',')} onChange={handleItemChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Staff:
                        <input type="password" value={pass} onChange={handleStaffChange} />
                    </label>
                </div>

                <br></br>
                <br></br>

                <button type="submit">Submit</button>
                <br></br>
                <br></br>
                <button onClick={() => handleLogin(username, password)}>Login</button>
            </form>

        </div>

    )
}


