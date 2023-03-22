import React, { useContext, useEffect,useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { StatusContext } from './features/Login/Status';
import { getSingleAsync1, selectSingle } from './features/Single/singleSlice';


function App() {

  const profile1 = useAppSelector(selectSingle);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string | null>(null);
  // const { status, setStatus } = useContext(StatusContext);


  useEffect(() => {
    dispatch(getSingleAsync1());
    // console.log(9)
}, [dispatch,status]);

  


  return (
    <StatusContext.Provider value={{ status, setStatus }}>
    <div className="App">
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/departments">Departments</Link> |  <Link to="/profiles">Profiles</Link> | |
        <Link to="/products">Products</Link> |
        <Link to="/deliveries">Deliveries</Link>| <Link to="/orders">Orders</Link> | |
        <Link to="/reviews">Reviews</Link> | <Link to="/login-register">Login/Register</Link> | 
        <Link to="/home">Home</Link> || Wellcome {status ? (profile1?.name || '') : ''} |
        <br></br>
        {/* <Single1></Single1> */}


      </nav>
      <Outlet></Outlet>

    </div>
    </StatusContext.Provider>

  );
}

export default App;
