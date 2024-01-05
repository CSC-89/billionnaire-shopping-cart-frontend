export type Billionnaire = {
    name: string;
    netWorth: number;
    imagePath: string;
  };
  
export type Product = {
    name: string;
    price: number;
    imagePath: string;
  };

export type CartItem = {
  id: number;
  item: Product;
  qty: number
}