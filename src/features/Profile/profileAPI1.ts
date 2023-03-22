import axios from 'axios'
import { MY_SERVER_PROFILE1, MY_SERVER_REGISTER } from '../../env';
import { Profile,ProfileGet } from '../../models/Profile';


export async function getProfile1(id?: number): Promise<ProfileGet[]> {
    const url = id ? `${MY_SERVER_PROFILE1}${id}/` : MY_SERVER_PROFILE1;
    return await axios.get(url).then(res => res.data);
  }


export async function addProfile1(profile: Profile) {
    const data = {
      username: profile.username,
      password: profile.password,
      profile: {
        name: profile.profile.name,
        items: profile.profile.items,
        email: profile.profile.email,
        is_staff: profile.profile.is_staff,
      }
    };
  
    return await axios.post(MY_SERVER_REGISTER, data);
  }
  
  
export async function  delProfile1 (id:number) {
      return await axios.delete(MY_SERVER_PROFILE1 + id + '/').then(res => id );
  }
  
  
export function updProfile1(pro: ProfileGet) {
    return new Promise<{ data: any }>((resolve) =>
      axios.put(MY_SERVER_PROFILE1 + pro.id + "/", pro)
        .then((res) => resolve({ data: res.data }))
    );
  }
