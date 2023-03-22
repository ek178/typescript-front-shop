import axios from 'axios'
import { MY_SERVER_ORDER } from '../../env';



export async function  getOrder () {
    return await axios.get(MY_SERVER_ORDER).then(res => res.data );
}



export async function addOrder(formData: FormData) {
    try {
      const response = await axios.post(MY_SERVER_ORDER, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add product');
    }
  }

export async function  delOrder (id:number) {
    return await axios.delete(MY_SERVER_ORDER + id + '/').then(res => id );
}



export function updOrder(formData: FormData, id: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_ORDER + id + "/", formData)
      .then((res) => resolve({ data: res.data }))
  );
}
