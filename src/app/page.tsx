"use client"
import Image from "next/image";
import Kanban from "./components/kanban.tsx"
import {IWidget} from "./components/interface.tsx"

const initialData = 
  [
    {name:"Requested", color:"red", devices:[

      { "name": "door lock", "type": "LOCK", "codes": [ "1233", "2345", "3456", "4567" ], "locked": true},
      { "name": "hallway dimmer", "type": "DIMMER", "level": -1.85 },
      { "name": "light switch 3", "type": "SWITCH", "state": "off" }
    ]},
    {name:"Purchased", color:"orange", devices:[

      { "name": "hallway dimmer", "type": "DIMMER", "level": -1.85 },
      { "name": "light switch 2", "type": "SWITCH", "state": "on" }
    ]},
    {name:"Shipped", color:"yellow", devices: [

      { "name": "thermostat", "type": "THERMO", "temp": 71.0, "mode": "AUTO" },
      { "name": "light switch 1", "type": "SWITCH", "state": "off" }
    ]},
    {name:"Installed", color:"green", devices: [

      { "name": "light switch 0", "type": "SWITCH", "state": "off" }
    ]}


  ]
console.log(initialData)
export default function Home() {

  return (
  <div className="min-h-screen h-screen max-h-screen w-full flex justify-center">
      <main className="flex w-full flex-col p-5 justify-start max-w-[1024px] items-center">
          <h1 className="text-white text-2xl pl-8 pb-2 w-full"> Blaine's Kanban</h1>
          <Kanban initialData={initialData}/>
      </main>
    </div>
  );
}
