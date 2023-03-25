import React, { useContext, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { StatusContext } from '../Login/Status';
import { getSingleAsync1, selectSingle } from '../Single/singleSlice';
import { get1OrderAsync, selectMyOrder } from './orderSlice';


const UserOrder = () => {
    const accessToken = sessionStorage.getItem('accessToken')

    const order = useAppSelector((state) => selectMyOrder(state));
    const profile1 = useAppSelector(selectSingle);
    const dispatch = useAppDispatch();

    // const [buyer_id, setBuyer] = useState(0);
    // const [delivery_details_id, setDetails] = useState(0);
    // const [total_product_amount, setTotalA] = useState(0);
    // const [product_ids, setProducts] = useState<number[]>([]);
    // const [total_price, setTotalP] = useState(0);
    const { status, setStatus } = useContext(StatusContext);

    const [errorm, setErrorMsg] = useState("");
    
    useEffect(() => {
        dispatch(get1OrderAsync(accessToken as string)).then((result) => {
            console.log("get1OrderAsync.fulfilled: ", result.payload);
        }).catch((error) => {
            console.log("get1OrderAsync.rejected: ", error);
        });
    }, [dispatch, accessToken]);

    useEffect(() => {
        if (status !== null) {
            dispatch(getSingleAsync1());
        }
        else {
            dispatch(getSingleAsync1());
        }
    }, [dispatch, status]);

    return (
        <div>
            <h2>{order?.length}</h2>
            <div>
                <h1>Orders in my class: {order.length}</h1>
                {order && order.map((ord, i) => (
                    <div key={i}>
                        ID: {ord?.id},
                        <br></br>
                        Products: {ord?.product_ids.map((id) => id).join(", ")}
                        <br></br>
                        Buyer: {ord?.buyer_id}
                        <br></br>
                        Delivery: {ord?.delivery_details_id}
                        {/* <button onClick={() => dispatch(delOrderAsync(ord.id || -1))}>
                            Del
                        </button> */}
                        {/* <form onSubmit={handleUp(ord)}>
                            <button type='submit'>Update
                            </button>
                        </form> */}
                    </div>
                ))}
            </div>

        </div>
    )

}


export default UserOrder;
