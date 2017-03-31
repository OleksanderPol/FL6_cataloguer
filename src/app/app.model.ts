export interface User{
    username: string;
    email: string;
    city: string;
    telephone: string;
    info: string;
    photoUrl: string;  
}

export interface Item {
  name: string;
  created: Date;
  fotoUrl: string;
  info: string;
  rating: number;
  borrowedTo: string;
}

export interface Category {
  name: string;
  amountOfItems: number;
}
