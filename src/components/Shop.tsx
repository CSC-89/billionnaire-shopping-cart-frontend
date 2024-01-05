import { ShopType } from "@/types/componentTypes";
import { CartItem, Product } from "@/types/dataTypes";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import useSWR from "swr";

const url =
  "https://billionnaire-shopping-cart-backend-e3uzzxqbva-uc.a.run.app/api/";

const Shop: FC<ShopType> = ({ billionnaire }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [sumCost, setSumCost] = useState<number>(0);
    
  const productsFetcher = (args: string) =>
    fetch(args).then((response) => response.json());
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`${url}Products`, productsFetcher);

  const addItemHandler = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLButtonElement;
    const id = parseInt(target.id.slice(-1));
    const item = cart.find(x => x.id === id)

    if(item === undefined) {
        setCart([...cart, {id: id, item: products[id], qty: 1}])
        return
    }

    const index = cart.indexOf(item)
    const newArray = [...cart];
    newArray.splice(index, 2, {id: id, item: products[id], qty: ++item.qty} )

    setCart(newArray);
  };

  const subtractItemHandler = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLButtonElement;
    const id = parseInt(target.id.slice(-1));
    const item = cart.find(x => x.id === id)

    if(item === undefined) {
        return
    }

    const index = cart.indexOf(item)

    if(item.qty === 1) {
        const newArray = cart.splice(index,2 )

    setCart(newArray);
    return
    }
    const newArray = [...cart];
    cart.splice(index, 2, {id: id, item: products[id], qty: item.qty--} )

    setCart(newArray);
  };

  
  useEffect(() => {
    if(cart.length){
        const prices = cart.map(item => {
            return item.item.price * item.qty
        })
        setSumCost(prices.reduce((a,b) => a + b));
    }
  },[cart]) 

  if (error) return <p>Oh no Something went wrong!</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="flex">
        <img
          className="w-20"
          src={billionnaire.imagePath}
          alt={billionnaire.name}
        />
        <div className="bg-red-100">
          <h3 className="text-xs">Name:</h3>
          <h4>{billionnaire.name}</h4>
          <h3 className="text-xs">NetWorth:</h3>
          <h4>{billionnaire.netWorth} SEK</h4>
        </div>
      </div>

      <h2 className="my-5">Products</h2>
      <div className="product-grid grid grid-cols-2">
        {products.map((product: Product, i: number) => {
          return (
            <div className="my-2 bg-green-100 p-2 m-2 text-center" key={i}>
              <img
                className="w-20"
                src={product.imagePath}
                alt={product.name}
              />

              <h2>{product.name}</h2>
              <h2>{product.price} SEK</h2>
              <div className="flex">
                <button
                  id={`add-${i}`}
                  onClick={addItemHandler}
                  className="add-item m-2 p-2 bg-black text-white"
                >
                  +
                </button>
                <button
                  id={`subtract-${i}`}
                  onClick={subtractItemHandler}
                  className="subtract-item p-2 m-2 bg-black text-white"
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="my-16">Shopping Cart</h2>
      <h2 className="py-2">Remaining Balance: {billionnaire.netWorth - sumCost} SEK</h2>
      {cart.map((cartItem: CartItem, i: number) => {
        return (
          <div className="my-2 bg-green-100 p-2 m-2 text-center" key={i}>
            <h2>{cartItem.qty}x {cartItem.item.name} = {cartItem.item.price * cartItem.qty} SEK</h2>
          </div>
        );
      })}
    </>
  );
};

export default Shop;
