import { ShopType } from "@/types/componentTypes";
import { Billionnaire, Product } from "@/types/dataTypes";
import React, { FC } from "react";
import useSWR from "swr";

const Shop: FC<ShopType> = ({ billionnaire }) => {
  const url =
    "https://billionnaire-shopping-cart-backend-e3uzzxqbva-uc.a.run.app/api/";
  const productsFetcher = (args: string) =>
    fetch(args).then((response) => response.json());
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(`${url}Products`, productsFetcher);

  if (error) return <p>Oh no Something wet wrong!</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="flex">
        <img className="w-20" src={billionnaire.imagePath} alt={billionnaire.name} />
        <div className="bg-red-100">
          <h3 className="text-xs">Name:</h3>
          <h4>{billionnaire.name}</h4>
          <h3 className="text-xs">NetWorth:</h3>
          <h4>{billionnaire.netWorth}</h4>
        </div>
      </div>
      {products.map((product: Product, i: number) => {
        return (
          <div key={i}>
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Shop;
