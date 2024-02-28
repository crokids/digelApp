import React from "react"
import Table from "@/components/Table";
import GetCLienteData from "@/utils/GetClienteData";
import BackGround from "@/components/BackGround";

export default async function Home() {

  const data = await GetCLienteData()
  const jsonData = JSON.stringify(data)


  return (
  <div className="flex w-full h-full">
      <BackGround content={<Table data={jsonData} />}/>  
  </div>
  );
}
