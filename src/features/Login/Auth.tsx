
import axios from 'axios';
import { MY_SERVER_REFRESH } from '../../env';





async function handleAuth() {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        console.log('Access token found in session storage.');
      } else {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          console.log('Found refresh token, requesting new access token...');
          const response = await axios.post(MY_SERVER_REFRESH, { refresh: refreshToken });
          // const tl = response.data
          // console.log (tl)
          const accessToken = response.data.access;
          const refToken = response.data.refresh;
          console.log (accessToken)
          sessionStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refToken);
          console.log('New access token received and stored in session storage.');
        } else {
          console.log('No tokens found in session storage. Please login or register.');
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }
  
export default handleAuth;





