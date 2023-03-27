import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { Profile1 } from './features/Profile/Profile1';
import { Department1 } from './features/Department/Department';
import { Product1 } from './features/Product/Products';
import { Delivery1 } from './features/DeliveryDetaill/Delivery';
import { Order1 } from './features/Order/Order';
import { Review1 } from './features/Review1/Review';
import { Login } from './features/Login/Login';
import { Home1 } from './features/Home1/Home';
import SingleProduct from './features/Product/1Product';
import SingleDepartment from './features/Department/1Department';
import UserOrder from './features/Order/1Order';




const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>

    <Routes>
  <Route path="/" element={<App />}>
    <Route path="/home" element={<Home1 />} />
    <Route path="/profiles" element={<Profile1 />} />
    <Route path="/departments" element={<Department1 />} />
    <Route path="/departments/:id" element={<SingleDepartment />} />
    <Route path="/products/:id" element={<SingleProduct />} />
    <Route path="/products" element={<Product1 />} />
    <Route path="/deliveries" element={<Delivery1 />} />
    {/* <Route path="/orders" element={<Order1 />} /> */}
    <Route path="/orders" element={<UserOrder />} />

    <Route path="/reviews" element={<Review1 />} />
    <Route path="/login-register" element={<Login />} />
    {/* <Route path='*'
element= {
  <main style={{ padding: "1rem" }}>
    <p>There's nothing here!</p>
  </main>
} >

</Route> */}
  </Route>
</Routes>



    </BrowserRouter>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

