import React from "react"
import BackGround from "@/components/BackGround";
import MainContent from "@/components/MainContent";

export default async function Home() {


  return (

    <div className="flex w-full h-full">
      <BackGround mainContent={<MainContent/>}/>
    </div>
  
  );
}
