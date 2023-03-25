import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { MY_SERVER } from '../../env';
import defaultImage from '../../app/static/lion-fish.jpg';
import { Product } from '../../models/Product';
import { StatusContext } from '../Login/Status';
import { getSingleAsync1, selectSingle } from '../Single/singleSlice';
import { get1ProductAsync, selectProductById, selectProducts } from './prodSlice';




const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id as string);

  const product = useAppSelector((state) => selectProductById(state, productId));


  const profile1 = useAppSelector(selectSingle);
  const dispatch = useAppDispatch();


  // const [p_name, setName] = useState("");
  // const [p_desc, setDesc] = useState("");
  // const [p_image, setImage] = useState<File | null>(null);
  // const [p_price, setPrice] = useState(0.0);
  // const [p_type, setType] = useState(1);
  // const [p_amount, setAmount] = useState(0);
  const { status, setStatus } = useContext(StatusContext);


  const [errorm, setErrorMsg] = useState("");


  useEffect(() => {
    dispatch(get1ProductAsync((productId)));
  }, [dispatch, productId]);

  useEffect(() => {
    if (status !== null) {
      dispatch(getSingleAsync1());
    }
    else {
      dispatch(getSingleAsync1());
    }
  }, [dispatch, status]);


  const getImageUrl = (p_image: string | File | null | undefined) => {
    if (!p_image) {
      return "";
    } else if (typeof p_image === "string") {
      return `${MY_SERVER}${p_image}`;
    } else {
      return URL.createObjectURL(p_image);
    }
  };


  return (
    <div>
      <h2>{product?.p_name}</h2>
      <p>Description: {product?.p_desc}</p>
      <p>Price: {product?.p_price}</p>
      <p>Amount: {product?.p_amount}</p>

      image: <img src={getImageUrl(product?.p_image)} alt={product?.p_name} width="200" height="200" />


    </div>
  )

}

export default SingleProduct;
