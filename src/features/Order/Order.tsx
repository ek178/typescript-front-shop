
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Order } from '../../models/Order';
import { getOrderAsync, selectOrders, addOrderAsync, delOrderAsync, updOrderAsync } from './orderSlice';



export const Order1 = () => {
    const orders = useAppSelector(selectOrders);
    const dispatch = useAppDispatch();

    const [buyer_id, setBuyer] = useState(0);
    const [delivery_details_id, setDetails] = useState(0);
    const [total_product_amount, setTotalA] = useState(0);
    const [product_ids, setProducts] = useState<number[]>([]);
    const [total_price, setTotalP] = useState(0);
    const [errorm, setErrorMsg] = useState("");



    useEffect(() => {
        dispatch(getOrderAsync());
    }, [dispatch]);




    const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBuyer = parseInt(e.target.value);
        setBuyer(newBuyer);
    };

    const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputProducts = event.target.value.split(/\s+/).map(Number);
        setProducts(inputProducts);
        console.log(Array.isArray(product_ids))
        console.log(product_ids)
    };


    // const handleProductChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     const numbers = value.split(',').map(Number);
    //     setProducts([...numbers]);
    //     console.log(Array.isArray(product_ids))
    //     console.log(product_ids)
    // };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = parseInt(e.target.value);
        setTotalP(newPrice);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseInt(e.target.value);
        setTotalA(newAmount);
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDetail = parseInt(e.target.value);
        setDetails(newDetail);
    };




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("buyer_id", String(buyer_id));
        formData.append("delivery_details_id", String(delivery_details_id));
        formData.append("total_price", String(total_price));
        formData.append("total_product_amount", String(total_product_amount));
        for (let i = 0; i < product_ids.length; i++) {
            formData.append("product_ids", String(product_ids[i]));
        }

        dispatch(addOrderAsync(formData));
    };


    const handleUp = (order: Order | null) => (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!order || !order.id) {
            setErrorMsg("Cannot update product: ID is missing");
            return;
        }
        const formData = new FormData();
        formData.append("id", String(order.id));
        formData.append("buyer_id", String(buyer_id || order.buyer_id));
        formData.append("delivery_details_id", String(delivery_details_id || order.delivery_details_id));
        formData.append("total_price", String(total_price || order.total_price));
        formData.append("total_product_amount", String(total_product_amount || order.total_product_amount));
        for (let i = 0; i < product_ids.length; i++) {
            formData.append("product_ids", String(product_ids[i]));
        }
        console.log("Form Data:");
        console.log(formData.keys, formData.values);

        dispatch(updOrderAsync({ formData, id: order.id }));
    };


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Orders in my class: {orders.length}</h1>
                {orders && orders.map((ord, i) => (
                    <div key={i}>
                        ID: {ord?.id},
                        <br></br>
                        Products: {ord?.product_ids.map((id) => id).join(", ")}
                        <br></br>
                        Buyer: {ord?.buyer_id}
                        <br></br>
                        Delivery: {ord?.delivery_details_id}
                        <button onClick={() => dispatch(delOrderAsync(ord.id || -1))}>
                            Del
                        </button>
                        <form onSubmit={handleUp(ord)}>
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
                        Buyer:
                        <input type="number" value={buyer_id} onChange={handleBuyerChange} required />
                    </label>
                </div>
                <div>
                    {/* <label>
                        Products:
                        <input type="text" value={product_ids.join(',')} onChange={handleProductChange} required />
                    </label> */}
                </div>
                <div>
                    <label>
                        Products:
                        <input type="text" value={product_ids.join(' ')} onChange={handleProductChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Delivery Details:
                        <input type="number" value={delivery_details_id} onChange={handleDetailChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Total Product Amount:
                        <input type="number" value={total_product_amount} onChange={handleAmountChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Total Price:
                        <input type="number" value={total_price} onChange={handlePriceChange} required />
                    </label>
                </div>
                <br></br>
                <br></br>

                <button type="submit">Submit</button>
            </form>
        </div>

    );
};
