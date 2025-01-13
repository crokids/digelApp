import React from "react";
import BackGround from "@/components/BackGround";
import MainContent from "@/components/MainContent";
import { getXataClient } from "@/lib/xata";

const xata = getXataClient();

export default async function Home() {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const startDate = `${year}-${month}-01`;
  const endDate = `${year}-${month}-31`;

  // Fetch data for vendedor1 and vendedor2 separately
  const [vendedor1, vendedor2] = await Promise.all([
    xata.db.Pedidos.filter({
      cod_vendedor: 9,
      Data: { $ge: new Date(startDate), $lt: new Date(endDate) },
    }).getAll(),
    
    xata.db.Pedidos.filter({
      cod_vendedor: 8,
      Data: { $ge: new Date(startDate), $lt: new Date(endDate) },
    }).getAll(),
  ]);

  const data = {
    vendedor1Count: vendedor1.length,
    vendedor2Count: vendedor2.length,
  };

  //console.log(data);

  return (
    <div className="flex w-full h-full">
      <BackGround mainContent={<MainContent data={data} />} />
    </div>
  );
}
