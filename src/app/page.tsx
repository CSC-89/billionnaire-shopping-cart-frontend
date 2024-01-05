"use client";
import Shop from "@/components/Shop";
import { Billionnaire, Product } from "@/types/dataTypes";
import Image from "next/image";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import useSWR from "swr";

const url =
  "https://billionnaire-shopping-cart-backend-e3uzzxqbva-uc.a.run.app/api/";

export default function Home() {
  const itemWithIdRef = useRef<HTMLDivElement>(null);
  const billionnairesFetcher = (args: string) =>
    fetch(args).then((response) => response.json());

  const [billionnaire, setBillionnaire] = useState<Billionnaire | null>(null);
  const { data: billionnaires } = useSWR(
    `${url}Billionnaires`,
    billionnairesFetcher
  );
  const chooseBillionnaire = (evt: SyntheticEvent) => {
    if (itemWithIdRef.current == null) {
      return;
    }

    const element = itemWithIdRef.current.id;
    setBillionnaire(billionnaires[0]);
  };

  // console.log(products)
  if (billionnaires)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-16">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Billionnaire Shopping List</h1>
          <h2 className="my-10">Choose Your Billionnaire</h2>

          {!billionnaire &&
            billionnaires.map((elm: Billionnaire, i: string) => {
              return (
                <div
                  id={i}
                  className="flex"
                  ref={itemWithIdRef}
                  key={i}
                  onClick={chooseBillionnaire}
                >
                  <img className="w-20" src={elm.imagePath} alt={elm.name} />
                  <div className="bg-red-100">
                    <h3 className="text-xs">Name:</h3>
                    <h4>{elm.name}</h4>
                    <h3 className="text-xs">NetWorth:</h3>
                    <h4>{elm.netWorth}</h4>
                  </div>
                </div>
              );
            })}

          {billionnaire && <Shop billionnaire={billionnaire} />}
        </div>
      </main>
    );
}
