import { Navbar } from "../../components/Navbar";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  
    <div className="home">

      <Navbar/>

       <h2 className="text-xl text-amber-200 font-extrabold">
    Hello World
  </h2>

    </div>
 
  )
}
