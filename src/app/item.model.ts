export interface ItemCell {
  category: string;
  owner: string;
  items: Item[];
}

export interface Item {
  name: string;
  created: Date;
  fotoUrl: string;
  info: string;
  rating: number;
  borrowedTo: string;
}
