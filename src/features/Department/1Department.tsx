import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { MY_SERVER } from '../../env';
import defaultImage from '../../app/static/lion-fish.jpg';
import { StatusContext } from '../Login/Status';
import { getSingleAsync1, selectSingle } from '../Single/singleSlice';
import { get1DepartmentAsync, selectDepartmentById } from './depSlice';




const SingleDepartment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const departmentId = parseInt(id as string);

    const department = useAppSelector((state) => selectDepartmentById(state, departmentId));


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
        dispatch(get1DepartmentAsync((departmentId)));
    }, [dispatch, departmentId]);

    useEffect(() => {
        if (status !== null) {
            dispatch(getSingleAsync1());
        }
        else {
            dispatch(getSingleAsync1());
        }
    }, [dispatch, status]);


    const getImageUrl = (d_image: string | File | null | undefined) => {
        if (!d_image) {
          return "";
        } else if (typeof d_image === "string") {
          return `${MY_SERVER}${d_image}`;
        } else {
          return URL.createObjectURL(d_image);
        }
      };


    return (
        <div>
            <h2>{department?.d_name}</h2>
            <p>Description: {department?.d_desc}</p>


            image: <img src={getImageUrl(department?.d_image)} alt={department?.d_name} width="200" height="200" />


        </div>
    )

}

export default SingleDepartment;