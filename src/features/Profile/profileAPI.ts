import axios from 'axios'
import { MY_SERVER_PROFILE } from '../../env'
import { Profile2 } from '../../models/Profile2';



// export async function  getProfile () {
//     return await axios.get(MY_SERVER_PROFILE).then(res => res.data );
// }


export async function getProfile(id?: number) {
    const url = id ? `${MY_SERVER_PROFILE}${id}/` : MY_SERVER_PROFILE;
    return await axios.get(url).then(res => res.data);
  }

// export async function  addProfile (formData: FormData) {
//     return await axios.post(MY_SERVER_PROFILE,formData);
//   }

export async function addProfile(profile: Profile2) {
  const formData = new FormData();
  formData.append("username", profile.username);
  formData.append("password", profile.password);
  formData.append("email", profile.email);
  formData.append("first_name", profile.first_name);
  formData.append("last_name", profile.last_name);
  formData.append("is_staff", String(profile.is_staff));
  profile.items222.forEach(item222 => formData.append("items222", String(item222)));

  return await axios.post(MY_SERVER_PROFILE, formData);
}


export async function  delProfile (id:number) {
    return await axios.delete(MY_SERVER_PROFILE + id + '/').then(res => id );
}


export function updProfile(pro: Profile2) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_PROFILE + pro.id + "/", pro)
      .then((res) => resolve({ data: res.data }))
  );
}


// export async function updProfile (formData:FormData,id:number) {
//   return await axios.put(MY_SERVER_PROFILE + id + '/',formData )
//     .then(res => res.data )
//     .catch(error => console.log(error));
// }


// export async function updProfile(formData: FormData, id: number): Promise<Profile2> {
//   const response = await axios.put(`${MY_SERVER_PROFILE}${id}/`, formData);
//   return response.data;
// }









// export async function getProfile(): Promise<Profile[]> {
//   const url = `${MY_SERVER_PROFILE}`;
//   const response = await axios.get(url);
//   return response.data;
// }

// export async function addProfile(formData: FormData): Promise<User> {
//   const response = await axios.post(MY_SERVER_REGISTER, formData);
//   return response.data;
// }

// export async function delProfile(id: number): Promise<number> {
//   await axios.delete(`${MY_SERVER_PROFILE}${id}/`);
//   return id;
// }

// export async function updProfile(formData: FormData, id: number): Promise<Profile> {
//   const url = `${MY_SERVER_PROFILE}${id}/`;
//   const response = await axios.put(url, formData);
//   return response.data;
// }





