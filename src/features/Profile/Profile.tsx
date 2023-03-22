
import React, { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { Profile2 } from '../../models/Profile2';
// import { getProfileAsync, selectProfiles, addProfileAsync, delProfileAsync, updProfileAsync } from './profileSlice';
// import axios from 'axios';
// import { MY_SERVER_LOGIN } from '../../env';


// export const Profile = () => {
//     const profiles = useAppSelector(selectProfiles);
//     const dispatch = useAppDispatch();

//     const [first_name, setName1] = useState("");
//     const [last_name, setName2] = useState("");
//     const [username, setUserName] = useState("");
//     const [email, setEmail] = useState("");
//     const [is_staff, setStaff] = useState(false);
//     const [items222, setItems] = useState<number[]>([]);
//     const [pass, setPass] = useState("")
//     const [password, setPassword] = useState("")
//     const [errorm, setErrorMsg] = useState("");


//     useEffect(() => {
//         dispatch(getProfileAsync());
//     }, [dispatch]);

//     const handleLogin = async (username: string, password: string) => {
//         try {
//           const response = await axios.post(MY_SERVER_LOGIN, {
//             username,
//             password,});
//           const accessToken = response.data.access;
//           const refreshToken = response.data.refresh;
      
//           // Store the tokens securely on the frontend (e.g. in local storage or in an httpOnly cookie)
//           console.log('Login successful!');
//           console.log(`Access Token: ${accessToken}`);
//           console.log(`Refresh Token: ${refreshToken}`);
      
//         } catch (error) {
//           console.error('Login error:', error);
//         }
//       };//roti - 123


//     const handleName1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setName1(e.target.value);
//     };

//     const handleName2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setName2(e.target.value);
//     };

//     const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     };

//     const handleUnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUserName(e.target.value);
//     };


//     const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         const numbers = value.split(',').map(Number);
//         setItems([...numbers]);
//         console.log(Array.isArray(items222))
//         console.log(items222)
//     };


//     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     };

//     const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPass(e.target.value);
//         if (e.target.value === "123") {
//             setStaff(true);
//         }
//     };

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const profileData: Profile2 = {
//             first_name,
//             last_name,
//             username,
//             password,
//             email,
//             is_staff,
//             items222
//         };
//         dispatch(addProfileAsync(profileData));
//     };





//     return (
//         <div style={{ display: 'flex' }}>
//             <div>
//                 <h1>Profiles in my class: {profiles && profiles.length}</h1>

//                 {profiles && profiles.map((pro, i) => (
//                     <div key={i}>
//                         Name: {pro?.username}
//                         Email: {pro?.email}
//                         <button onClick={() => dispatch(delProfileAsync(pro.id || -1))}>
//                             Del
//                         </button>
//                         <br></br>
//                         <button
//                             onClick={() =>
//                                 dispatch(updProfileAsync({
//                                     first_name: first_name || pro.first_name,
//                                     last_name: last_name || pro.last_name,
//                                     id: pro.id,
//                                     username: pro.username,
//                                     password: password || pro.password,
//                                     email: email || pro.email,
//                                     is_staff: is_staff || pro.is_staff,
//                                     items222: items222 || pro.items222
//                                 }))
//                             }
//                         >
//                             Upd
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>
//                         First Name:
//                         <input type="text" value={first_name} onChange={handleName1Change} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Last Name:
//                         <input type="text" value={last_name} onChange={handleName2Change} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Username:
//                         <input type="text" value={username} onChange={handleUnameChange} required />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Password:
//                         <input type="password" value={password} onChange={handlePassChange} required />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Email:
//                         <input type="text" value={email} onChange={handleEmailChange} required />

//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Items:
//                         <input type="text" value={items222.join(',')} onChange={handleItemChange} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Staff:
//                         <input type="password" value={pass} onChange={handleStaffChange} />
//                     </label>
//                 </div>

//                 <br></br>
//                 <br></br>

//                 <button type="submit">Submit</button>
//                 <br></br>
//                 <br></br>
//                 <button onClick={() => handleLogin(username, password)}>Login</button>
//             </form>

//         </div>

//     )
// }


