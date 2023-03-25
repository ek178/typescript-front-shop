import axios from 'axios'
import { MY_SERVER_PROFILE1 } from '../../env';
import { ProfileGet } from '../../models/Profile';


// export async function getProfile1(id?: number): Promise<ProfileGet[]> {
//     const url = id ? `${MY_SERVER_PROFILE1}${id}/` : MY_SERVER_PROFILE1;
//     const options = {
//         headers: {
//             Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
//         },
//     };
//     return await axios.get(url, options).then(res => res.data);
//   }

export async function getProfile11(): Promise<ProfileGet> {
    const url = `${MY_SERVER_PROFILE1}`;
    const options = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    };
    const response = await axios.get(url, options);
    return response.data as ProfileGet;
  }


