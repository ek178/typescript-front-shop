
import React, { useContext, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import defaultImage from '../../app/static/lion-fish.jpg';
import { MY_SERVER } from '../../env';
import { getProductAsync, selectProducts, addProductAsync, delProductAsync, updProductAsync } from './prodSlice';
import { Product } from '../../models/Product';
import { getSingleAsync1, selectSingle } from '../Single/singleSlice';
import { StatusContext } from '../Login/Status';
import { Link } from 'react-router-dom';

// const filteredProducts = allProducts.filter(product => product.type === 'desiredType');

export const Product1 = () => {
    const products = useAppSelector(selectProducts);

    const profile1 = useAppSelector(selectSingle);
    const dispatch = useAppDispatch();

    const [p_name, setName] = useState("");
    const [p_desc, setDesc] = useState("");
    const [p_image, setImage] = useState<File | null>(null);
    const [p_price, setPrice] = useState(0.0);
    const [p_type, setType] = useState(1);
    const [p_amount, setAmount] = useState(0);
    // const [status, setStatus] = useState<string | null>(null);
    const { status, setStatus } = useContext(StatusContext);

    const [errorm, setErrorMsg] = useState("");



    useEffect(() => {
        dispatch(getProductAsync());
    }, [dispatch]);

    useEffect(() => {
        if (status !== null) {
            dispatch(getSingleAsync1());
        }
        else {
            dispatch(getSingleAsync1());

        }
    }, [dispatch, status]);




    const getImageUrl = (p_image: string | File | null) => {
        if (!p_image) {
            return defaultImage;
        } else if (typeof p_image === "string") {
            return `${MY_SERVER}${p_image}`;
        } else {
            return URL.createObjectURL(p_image);
        }
    };



    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseFloat(e.target.value);
        setPrice(newPrice);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseInt(e.target.value);
        setAmount(newAmount);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = parseInt(e.target.value);
        setType(newType);
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(files[0]);
            if (typeof p_image === 'string') {
                console.log('p_image is a string');
            } else if (p_image instanceof File) {
                console.log('p_image is a file');
            } else {
                console.log('p_image is of unknown type');
            }
        }
    };




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("p_name", p_name);
        formData.append("p_desc", p_desc);
        formData.append("p_price", String(p_price));
        formData.append("p_type", String(p_type));
        formData.append("p_amount", String(p_amount));

        if (p_image && p_image.type.startsWith("image/")) {
            formData.append("p_image", p_image);
        }

        dispatch(addProductAsync(formData));
    };


    const handleUp = (product: Product | null) => (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(d_name,d_desc)
        if (!product || !product.id) {
            setErrorMsg("Cannot update product: ID is missing");
            return;
        }
        const formData = new FormData();
        formData.append("id", String(product.id));
        formData.append("p_name", p_name || product.p_name);
        formData.append("p_desc", p_desc || product.p_desc);
        formData.append("p_price", String(p_price || product.p_price));
        formData.append("p_type", String(p_type || product.p_type));
        formData.append("p_amount", String(p_amount || product.p_amount));
        const image = p_image ? (p_image.type?.startsWith("image/") ? p_image : product.p_image) : null;
        if (image) {
            formData.append('p_image', image);
        }


        dispatch(updProductAsync({ formData, id: product.id }));
    };


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Products in my class: {products.length}</h1>
                {products && products.map((pro, i) => (
                    <div key={i}>
                        ID: {pro?.id}, 
                        <br></br>
                        Name: {pro?.p_name}
                        <br></br>
                        image: <img src={getImageUrl(pro?.p_image)} alt={pro?.p_name} width="200" height="200" />
                        <br></br>
                        <Link to={`/products/${pro?.id}`}>View details</Link>
                        <div>
                            {status !== null && profile1?.is_staff ? (
                                <button onClick={() => dispatch(delProductAsync(pro.id || -1))}>
                                    Del
                                </button>
                            ) : (status !== null &&
                                <div>
                                    Only Staff Can Delete
                                </div>
                            )}
                        </div>
                        <br></br>
                        <div>
                            {status !== null && profile1?.is_staff ? (
                                <form onSubmit={handleUp(pro)}>
                                    <button type='submit'>Update</button>
                                </form>
                            ) : (
                                status !== null && <div>Only Staff Can Update</div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
            <br></br>
            <div>
                {status !== null && profile1?.is_staff ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Name:
                                <input type="text" value={p_name} onChange={handleNameChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Description:
                                <textarea value={p_desc} onChange={handleDescChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Price:
                                <input type="number" value={p_price} onChange={handlePriceChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Type:
                                <input type="number" value={p_type} onChange={handleTypeChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Amount:
                                <input type="number" value={p_amount} onChange={handleAmountChange} required />
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
                ) : (status !== null &&
                    <div>
                        Only Staff Can Upload
                    </div>
                )}

            </div>

        </div>

    );
};
