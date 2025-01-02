import React from "react"
import BackGround from "@/components/BackGround";
import MainContent from "@/components/MainContent";
import { getXataClient } from "@/lib/xata";

const xata = getXataClient()

export default async function Home() {

  const currentDate = new Date();

  const month = currentDate.getMonth() + 1

  const startDate = `2025-${month}-01`
  const endDate = `2025-${month}-31`

  const data = await xata.db.Pedidos.aggregate({
    vendedor1: {
      count: {
        filter: {
          $all: [
            {
              Data: { $ge: new Date(startDate) },
            },
            {
              Data: { $lt: new Date(endDate) },
            },
          ],
          cod_vendedor: 9,
        },
      },
    },
    vendedor2: {
      count: {
        filter: {
          $all: [
            {
              Data: { $ge: new Date(startDate) },
            },
            {
              Data: { $lt: new Date(endDate) },
            },
          ],
          cod_vendedor: 8,
        },
      },
    },
  });

  return (

    <div className="flex w-full h-full">
      <BackGround mainContent={<MainContent data={data} />}/>
    </div>
  
  );
}
