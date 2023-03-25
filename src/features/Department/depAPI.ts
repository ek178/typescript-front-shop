import axios from 'axios'
import { MY_SERVER_DEPARTMENT } from '../../env';
import handleAuth from '../Login/Auth';



export async function  getDepartment () {
    return await axios.get(MY_SERVER_DEPARTMENT).then(res => res.data );
}

export async function get1Department(id: number) {
  const url = `${MY_SERVER_DEPARTMENT}${id}/`;
  return await axios.get(url).then(res => res.data);
}

// export async function addDepartment(formData: FormData) {
//   return handleAuth(async () => {
//     const response = await axios.post(MY_SERVER_DEPARTMENT, formData, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
//       },
//     });
//     return response.data;
//   });
// }

export async function addDepartment(formData: FormData) {
  const response = await axios.post(MY_SERVER_DEPARTMENT, formData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
}



export async function  delDepartment (id:number) {
    return await axios.delete(MY_SERVER_DEPARTMENT + id + '/').then(res => id );
}




export function updDepartment(formData: FormData, id: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_DEPARTMENT + id + "/", formData)
      .then((res) => resolve({ data: res.data }))
  );
}

// export function updDepartment(dep: Department) {
//     return new Promise<{ data: any }>((resolve) =>
//       axios.put(MY_SERVER_DEPARTMENT + dep.id + "/", dep)
//         .then((res) => resolve({ data: res.data }))
//     );
//   }

