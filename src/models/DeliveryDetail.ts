export class DeliveryDetail {
    id?: number;
    name: string = "";
    city: string = "";
    street: string = "";
    house: string = ""; // set to string so to allow house number 2a
    zip: number = 0;
    phone: number = 0;
    special_notes: string = "";

  }