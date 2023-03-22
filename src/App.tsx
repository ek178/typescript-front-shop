import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Single1 } from './features/Single/Single';
import { selectSingle } from './features/Single/singleSlice';


function App() {

  const profile1 = useAppSelector(selectSingle);

  return (
    <div className="App">
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <Link to="/departments">Departments</Link> |  <Link to="/profiles">Profiles</Link> | |
        <Link to="/products">Products</Link> |
        <Link to="/deliveries">Deliveries</Link>| <Link to="/orders">Orders</Link> | |
        <Link to="/reviews">Reviews</Link> | <Link to="/login-register">Login/Register</Link> | 
        <Link to="/home">Home</Link> || "welcome" {profile1?.name} |
        <br></br>
        {/* <Single1></Single1> */}


      </nav>
      <Outlet></Outlet>



    </div>
  );
}

export default App;
