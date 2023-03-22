import axios from 'axios'
import { MY_SERVER_DELIVERY } from '../../env';



export async function  getDelivery () {
    return await axios.get(MY_SERVER_DELIVERY).then(res => res.data );
}



export async function addDelivery(formData: FormData) {
    try {
      const response = await axios.post(MY_SERVER_DELIVERY, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add product');
    }
  }

export async function  delDelivery (id:number) {
    return await axios.delete(MY_SERVER_DELIVERY + id + '/').then(res => id );
}



export function updDelivery(formData: FormData, id: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_DELIVERY + id + "/", formData)
      .then((res) => resolve({ data: res.data }))
  );
}
