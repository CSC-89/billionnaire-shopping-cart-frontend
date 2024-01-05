'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR from 'swr';

const url= "https://billionnaire-shopping-cart-backend-e3uzzxqbva-uc.a.run.app/api/"
type Billionnaire = {
name: string;
netWorth: number;
imagePath: string
}

export default function Home() {
  const billionnairesFetcher =(args: string) => fetch(args).then(response =>response.json())
  const productsFetcher =(args: string) => fetch(args).then(response =>response.json())

  const { data } = useSWR(`${url}Billionnaires`, billionnairesFetcher );
  // const { products } = useSWR(`${url}Products`, productsFetcher );
  
  console.log(data)
  // console.log(products)
  if(data) return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Home</h1>
        {data.map((elm: Billionnaire, i: number) => {
          return(
            <div key={i}>
              <h2>{elm.name}</h2>
              <h2>{elm.netWorth}</h2>
            </div>
          )
        })}
        {/* <h1>{products[0].Name}</h1> */}
      </div>
    </main>
  )
}
