
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addDepartmentAsync, delDepartmentAsync, getDepartmentsAsync, selectDepartments, updDepartmentAsync } from './depSlice';
import defaultImage from '../../app/static/lion-fish.jpg';
import { MY_SERVER } from '../../env';
import { Department } from '../../models/Department';
import { Link } from 'react-router-dom';



export const Department1 = () => {
    const departments = useAppSelector(selectDepartments);
    const dispatch = useAppDispatch();

    const [d_name, setName] = useState("");
    const [d_desc, setDesc] = useState("");
    const [d_image, setImage] = useState<File | null>(null);
    const [is_staff, setStaff] = useState(false);

    const [errorm, setErrorMsg] = useState("");




    useEffect(() => {
        dispatch(getDepartmentsAsync());
    }, [dispatch]);

    useEffect(() => {
        const staff = sessionStorage.getItem("staff");
        if (staff === "true") {
            setStaff(true);
        } else {
            setStaff(false);
        };
    }, []);




    const getImageUrl = (d_image: string | File | null) => {
        if (!d_image) {
            return defaultImage;
        } else if (typeof d_image === "string") {
            return `${MY_SERVER}${d_image}`;
        } else {
            return URL.createObjectURL(d_image);
        }
    };



    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(files[0]);
        }
    };


    const handleUp = (depart: Department | null) => (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(d_name, d_desc)
        if (!depart || !depart.id) {
            setErrorMsg("Cannot update product: ID is missing");
            return;
        }
        const formData = new FormData();
        formData.append("id", String(depart.id));
        formData.append('d_name', d_name || depart.d_name);
        formData.append('d_desc', d_desc || depart.d_desc);
        const image = d_image ? (d_image.type?.startsWith("image/") ? d_image : depart.d_image) : null;
        if (image) {
            formData.append('d_image', image);
        }

        console.log(formData)

        dispatch(updDepartmentAsync({ formData, id: depart.id }));
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("d_name", d_name);
        formData.append("d_desc", d_desc);

        if (d_image && d_image.type.startsWith("image/")) {
            formData.append("d_image", d_image);
        }

        dispatch(addDepartmentAsync(formData));
    };





    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Divisions in my class: {departments.length}</h1>
                {departments.map((dep, i) => (
                    <div key={i}>
                        ID: {dep.id}, Name: {dep.d_name}
                        image: <img src={getImageUrl(dep.d_image)} alt={dep.d_name} width="200" height="200" />
                        <br></br>
                        <Link to={`/departments/${dep?.id}`}>View details</Link>


                        <div>
                            {is_staff ? (
                                <button onClick={() => dispatch(delDepartmentAsync(dep.id || -1))}>
                                    Del
                                </button>
                            ) : (
                                <div>
                                    Only Staff Can Delete
                                </div>
                            )}
                        </div>


                        {/* <button onClick={() => dispatch(updDepartmentAsync({
                            id: dep.id,
                            d_name: d_name || dep.d_name,
                            d_desc: d_desc || dep.d_desc,
                            d_image: d_image || dep.d_image,
                        }))}>
                            upd
                        </button> */}
                        <br></br>
                        <div>
                            {is_staff ? (
                                <form onSubmit={handleUp(dep)}>
                                    <button type='submit'>Update
                                    </button>
                                </form>
                            ) : (
                                <div>
                                    Only Staff Can Update
                                </div>
                            )}
                        </div>
                        {/* <form onSubmit={handleUp(dep)}>
                            <button type='submit'>Update
                            </button>
                        </form> */}


                    </div>
                ))}
            </div>
            <br></br>
            <div>
                {is_staff ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Name:
                                <input type="text" value={d_name} onChange={handleNameChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Description:
                                <textarea value={d_desc} onChange={handleDescChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Image:
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                {/* <img src={defaultImage} alt="department_image" width="200" height="200" /> */}
                            </label>
                        </div>
                        <br></br>
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                ) : (
                    <div>
                        Only Staff Can Upload
                    </div>
                )}
            </div>


        </div>

    );
};


