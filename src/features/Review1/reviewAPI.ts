import axios from 'axios'
import {  MY_SERVER_REVIEW } from '../../env';



export async function  getReview () {
    return await axios.get(MY_SERVER_REVIEW).then(res => res.data );
}



export async function addReview(formData: FormData) {
    try {
      const response = await axios.post(MY_SERVER_REVIEW, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add product');
    }
  }

export async function  delReview (id:number) {
    return await axios.delete(MY_SERVER_REVIEW + id + '/').then(res => id );
}



export function updReview(formData: FormData, id: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_REVIEW + id + "/", formData)
      .then((res) => resolve({ data: res.data }))
  );
}
