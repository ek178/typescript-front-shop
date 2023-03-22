import axios from 'axios'
import { MY_SERVER_PRODUCT } from '../../env';
import { Product } from '../../models/Product';



export async function  getProduct () {
    return await axios.get(MY_SERVER_PRODUCT).then(res => res.data );
}


// export async function  addProduct (formData: FormData) {
//     return await axios.post(MY_SERVER_PRODUCT,formData);
//   }

export async function addProduct(formData: FormData) {
    try {
      const response = await axios.post(MY_SERVER_PRODUCT, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add product');
    }
  }

export async function  delProduct (id:number) {
    return await axios.delete(MY_SERVER_PRODUCT + id + '/').then(res => id );
}


// export async function updProduct (formData:FormData,id:number) {
//     return await axios.put(MY_SERVER_PRODUCT + id + '/',formData ).then(res => res.data );
// }

export function updProduct(formData: FormData, id: number) {
  return new Promise<{ data: any }>((resolve) =>
    axios.put(MY_SERVER_PRODUCT + id + "/", formData)
      .then((res) => resolve({ data: res.data }))
  );
}


// export function updProduct(pro: Product) {
//     return new Promise<{ data: any }>((resolve) =>
//       axios.put(MY_SERVER_PRODUCT + pro.id + "/", pro)
//         .then((res) => resolve({ data: res.data }))
//     );
//   }
