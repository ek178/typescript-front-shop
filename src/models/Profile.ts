export interface Profile {
  id?: number;
  username: string
  password: string
  profile: {
    name: string
    items: number[]
    email: string
    is_staff: boolean
  };
  }

export interface ProfileGet {
    id?: number;
    name: string
    items: number[]
    email: string
    is_staff: boolean
    }

  // export class User {
  //   id?: number;
  //   username: string = "";
  //   password: string = "";
  //   profile: Profile = new Profile();items: any[];
  // }