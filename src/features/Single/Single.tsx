import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from 'axios';
import { getSingleAsync1, selectSingle } from './singleSlice';


export const Single1 = () => {
    const profile1 = useAppSelector(selectSingle);
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
        dispatch(getSingleAsync1());
    }, [dispatch]);

    return (
        <div style={{ display: 'flex' }}>
            <div>
            <h1>Profile Details</h1>
                <p>Name: {profile1?.name}</p>
                <p>Email: {profile1?.email}</p>
                <p>Is Staff: {profile1?.is_staff ? 'Yes' : 'No'}</p>
                <p>Items: </p>
                <ul>
                    {profile1?.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                {/* <button onClick={() => dispatch("delDepartmentAsync"(profile1?.id || -1))}>
                            Del
                        </button> */}

            </div>

        </div>
    )

}