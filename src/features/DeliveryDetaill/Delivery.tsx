
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { DeliveryDetail } from '../../models/DeliveryDetail';

import { addDeliveryAsync, delDeliveryAsync, getDeliveryAsync, selectDeliveries, updDeliveryAsync } from './deliverySlice';


export const Delivery1 = () => {
    const deliveries = useAppSelector(selectDeliveries);
    const dispatch = useAppDispatch();

    const [name, setName] = useState("");
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("");
    const [house, setHouse] = useState("");
    const [special_notes, setNotes] = useState("");
    const [phone, setPhone] = useState(0);
    const [zip, setZip] = useState(0);
    const [errorm, setErrorMsg] = useState("");



    useEffect(() => {
        dispatch(getDeliveryAsync());
    }, [dispatch]);



    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHouse(e.target.value);
    };

    const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(e.target.value);
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = parseInt(e.target.value);
        setPhone(newPhone);
    };

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newZip = parseInt(e.target.value);
        setZip(newZip);
    };




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("city", city);
        formData.append("street", street);
        formData.append("house", house);

        formData.append("special_notes", special_notes);
        formData.append("phone", String(phone));
        formData.append("zip", String(zip));

        dispatch(addDeliveryAsync(formData));
    };


    const handleUp = (delivery: DeliveryDetail | null) => (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!delivery || !delivery.id) {
            setErrorMsg("Cannot update product: ID is missing");
            return;
        }
        const formData = new FormData();
        formData.append("id", String(delivery.id));
        formData.append("name", name || delivery.name);
        formData.append("city", city || delivery.city);
        formData.append("street", street || delivery.street);
        formData.append("house", house || delivery.house);
        formData.append("special_notes", special_notes || delivery.special_notes);
        formData.append("zip", String(zip || delivery.zip));
        formData.append("phone", String(phone || delivery.phone));


        dispatch(updDeliveryAsync({ formData, id: delivery.id }));
    };


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Deliveries in my class: {deliveries.length}</h1>
                {deliveries && deliveries.map((del, i) => (
                    <div key={i}>
                        ID: {del?.id},
                        <br></br>
                        Name: {del?.name}
                        <br></br>
                        <button onClick={() => dispatch(delDeliveryAsync(del.id || -1))}>
                            Del
                        </button>
                        <form onSubmit={handleUp(del)}>
                            <button type='submit'>Update
                            </button>
                        </form>
                    </div>
                ))}
            </div>
            <br></br>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        city:
                        <input type="text" value={city} onChange={handleCityChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Street:
                        <input type="text" value={street} onChange={handleStreetChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        House:
                        <input type="text" value={house} onChange={handleHouseChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Phone:
                        <input type="number" value={phone} onChange={handlePhoneChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Zip Code:
                        <input type="number" value={zip} onChange={handleZipChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Special Notes:
                        <textarea value={special_notes} onChange={handleNotesChange} />
                    </label>
                </div>
                <br></br>
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>

    );
};
